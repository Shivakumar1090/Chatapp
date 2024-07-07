import { Avatar, Box, Stack, Typography } from "@mui/material";
import PIC from "../../assets/images/shiva.jpg";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/frb_config";

const Message = ({message}) => {
    const currentUser = useSelector(state => state.user);
    const  data = useSelector(state => state.chat);

    console.log(data);
    const own = currentUser.id === message.senderId

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);


    return ( 
        <Stack 
            direction={own ? "row-reverse" : "row"} 
            spacing={1}
            sx={{
                ...msg_own,
                alignSelf: own ? 'flex-end' : 'flex-start',
                mr: own ? 0 : 'auto',
                ml: own ? 'auto' : 0
            }}    
        >
            <Avatar 
                src={
                    message.senderId === currentUser.id
                    ? currentUser.avatar
                    : data.user.avatar
                } 
                sx={{width: '24px', height: '24px'}}
            />
            <Box 
                sx={{
                    background: own ? "#d2dffa": '#F9F9F9', 
                    border: '1px solid grey', 
                    p: "5px", 
                    borderTopLeftRadius: own ? '10px': '0px' ,
                    borderTopRightRadius: own ? '0px' : '10px',
                    borderBottomRightRadius: '10px',
                    borderBottomLeftRadius: '10px',
                }}
            >
                <Typography variant="caption" >
                    {message?.text}
                </Typography>
                <Box display="flex" alignItems="flex-end" justifyContent="flex-end">
                    <Typography fontSize="10px" mr={1}>11:33</Typography>
                    {own && 
                        (message?.status === 0 ? <DoneIcon fontSize="10px"/> :
                        message?.status === 1 ? <DoneAllIcon /> : 
                        <DoneAllIcon sx={{color: 'red'}} fontSize="10px"/>)
                    }
                </Box>
            </Box>
        </Stack>
    );
}

const msg_own = {
    p: 2,
    maxWidth: '40%'
}
 
export default Message;