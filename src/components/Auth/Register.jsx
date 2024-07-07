
import React, { useState } from "react";
import { Box, Button, FormLabel, InputBase, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/frb_config";
import { toast } from "react-toastify";
import upload from "../../firebase/uploader";
import { doc, setDoc } from "firebase/firestore";

const { container, input, heading, form } = require("./styles");

const Register = () => {
    const navigate = useNavigate()

    const intidata = {
        email: "",
        name: "",
        password: "",
        avatar: null,
    }
    
    const [loading, setLoading] = useState(false)
    const [formdata,setFormdata] = useState(intidata);

    const registerHandler = async () => {
        setLoading(true)
        if (!formdata.name || !formdata.email || !formdata.password)
            return toast.warn("Please enter inputs!");

        try{
            const res = await createUserWithEmailAndPassword(auth, formdata.email,formdata.password);
            const imageUrl = await upload(formdata.avatar);

            await setDoc(doc(db, "users", res.user.uid), {
                name: formdata.name,
                email: formdata.email,
                avatar: imageUrl,
                id: res.user.uid,
                isonline: false,
            });
        
            await setDoc(doc(db, "userChats", res.user.uid), {
                chats: [],
            });
        
            toast.success("Account created! You can login now!");
            navigate("/login");
        } catch(err){
            toast.error(err.message);
            console.log(err);
        } 
        setLoading(false);
    }

    return (
        <div>
            <Box style={container}>
                <Typography style={heading}>
                    Create account
                </Typography>
                <Box  width={{xs: '300px',md: '400px'}} style={form}>
                    <InputBase
                        style={input}
                        placeholder="Name"
                        value={formdata.name}
                        onChange={(e) => setFormdata({...formdata , name: e.target.value})}
                    />
                    <InputBase
                        style={input}
                        placeholder="Email"
                        value={formdata.email}
                        onChange={(e) => setFormdata({...formdata , email: e.target.value})}
                    />
                    <InputBase
                        style={input}
                        placeholder="Password"
                        type="password"
                        value={formdata.password}
                        onChange={(e) => setFormdata({...formdata, password: e.target.value})}
                    />
                    <FormLabel>Choose a profile picture</FormLabel>
                    <Box display="flex">
                        <InputBase 
                            type="file"
                            label="Upload a Avatar"
                            // value={formdata.avatar}
                            onChange={(e) => setFormdata({...formdata , avatar: e.target.files[0]})}
                        />
                        {formdata.avatar && 
                            <img src={URL.createObjectURL(formdata.avatar)} alt="" style={{width: '100px'}}/>
                        }
                    </Box>
                    <Button
                        variant="contained"
                        onClick={registerHandler}
                        color="secondary"
                        fullWidth
                        sx={{mt: 1}}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Create"}
                    </Button>
                    <Typography style={{ fontSize: "17px", marginTop: '15px' }} >
                        if you have account already then{" "}
                        <span><Link to="/login" style={{ color: '#791314' }}>Login Here</Link></span>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}

export default Register;
