import { Box, IconButton, InputBase } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from "react-redux";
import { useState } from "react";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/frb_config";
import { v4 as uuid } from "uuid";

const InputMessage = () => {
    const currentUser = useSelector(state => state.user)
    const chatData = useSelector(state => state.chat);
    const [text,setText] = useState("");

    const handleSend = async() => {
        console.log(text);
        await updateDoc(doc(db, "chats", chatData.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.id,
                date: Timestamp.now(),
                status: 0,
            }),
        });
        
        await updateDoc(doc(db, "userChats", currentUser.id), {
            [chatData.chatId + ".lastMessage"]: {
                text,
                status: 0,
            },
            [chatData.chatId + ".date"]: serverTimestamp(),
          });
      
        await updateDoc(doc(db, "userChats", chatData.user.id), {
            [chatData.chatId + ".lastMessage"]: {
                text,
                status: 0,
            },
            [chatData.chatId + ".date"]: serverTimestamp(),
        });
      
        setText("");
    }

    return ( 
        <Box sx={input}>
            <InputBase 
                placeholder="Type message...." 
                sx={{width: '100%'}} 
                minRows={2}
                multiline
                maxRows={4}
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <IconButton disabled={!text} color='secondary' variant='contained' onClick={handleSend}>
                <SendIcon />
            </IconButton>
        </Box>
     );
}

const input = {
    background: '#F6F8FC',
    borderRadius: '20px', 
    p: 1, 
    display: 'flex', 
    justifyContent: 'space-between',
    bottom: 0,
}
 
export default InputMessage;