import { Avatar, Box, Button, Container, InputBase, Paper, Stack, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase/frb_config";
import { useSelector } from "react-redux";

const Search = () => {
    const [name, setName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const currentUser = useSelector(state => state.user)

    console.log(user);
    console.log(currentUser);

    const handleSearch = async () => {
        console.log(name);
        const q = query(
            collection(db, "users"),
            where("name", "==", name)
        );
        console.log(q);
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        const combinedId =
            currentUser.id > user.id
                ? currentUser.id + user.id
                : user.id + currentUser.id;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
        
            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
        
                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.id), {
                    [combinedId + ".userInfo"]: doc(db, "users", user.id),
                    [combinedId + ".date"]: serverTimestamp(),
                });
        
                await updateDoc(doc(db, "userChats", user.id), {
                    [combinedId + ".userInfo"]: doc(db, "users", currentUser.id),
                    [combinedId + ".date"]: serverTimestamp(),
                });
                console.log("Hiii")
            }
        } catch (err) {}

        setUser(null);
        setName("")
    };

    return ( 
        <Box>
            <InputBase 
                type="text"
                sx={search}
                placeholder="search"
                startAdornment={<SearchIcon color="secondary" sx={{opacity: 0.5}}/>}
                onChange={(e) => setName(e.target.value)}
                value={name}
                onKeyDown={handleKey}
            />
            <Button variant="contained" onClick={handleSearch}>Search</Button>
            {err && <span>User not found!</span>}
            {user && (
                <Stack 
                    component={Paper} 
                    elevation={2} 
                    direction="row" 
                    spacing={1} 
                    p={2} 
                    alignItems="center"
                    onClick={handleSelect}
                >
                    <Avatar src={user?.avatar} />
                    <Typography variant="body1" fontWeight={600}>{user?.name}</Typography>
                </Stack>
            )}
        </Box>
     );
}

const search = {
    background: '#F6F8FC',
    width: '100%',
    p: "5px",
    borderRadius: 50,
    mb: 2,
    mt: 1,
}
 
export default Search;