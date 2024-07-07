import React, { useState } from "react";
import { Box, Button, InputBase, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/frb_config";
import { fetchUser } from "../../apis/user";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slicers/userSlice";

const { container, input, heading, form } = require("./styles");

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const LoginHandler = async(e) => {
        e.preventDefault();
        setLoading(true)
      
        if (!email || !password)
            return toast.warn("Please enter inputs!");

        try {
            const resp = await signInWithEmailAndPassword(auth, email, password);
            const userdata = await fetchUser(resp.user.uid);
            dispatch(setUser(userdata));
    
            toast.success("Login Successful!");
            navigate("/");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }

        setLoading(false)
    }

    return (
        <Box style={container} >
            <Typography variant="h4" style={heading}>Login</Typography>
            <Box  width={{xs: '300px',md: '400px'}} style={form}>
                <InputBase
                    style={input}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputBase
                    style={input}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={(e) => LoginHandler(e)}
                    color="secondary"
                    fullWidth
                    disabled={loading}
                    sx={{mt: 1}}
                >
                    {loading ? "Loading..." : "Login"}
                </Button>
                <Typography style={{ fontSize: "17px", marginTop: '15px' }} >
                    Don't have an account yet?{" "}
                    <span> <Link to="/register" style={{ color: '#791314' }}> Signup </Link> </span>
                </Typography>
            </Box>
        </Box>
    );
}


export default Login;