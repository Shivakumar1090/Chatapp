import { Box } from "@mui/material";
import Message from "./message";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/frb_config";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const data = useSelector(state => state.chat)
    const currentUser = useSelector(state => state.user);

    console.log(data);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    console.log(messages)
    return ( 
        <Box sx={container}>
            {messages.map(msg => (
                <Message message={msg} key={msg.id}/>
            ))}
        </Box>
    );
}

const container = {
    overflowY: 'scroll',
    "::-webkit-scrollbar": {
        width: '4px',
    },
    "::-webkit-scrollbar-track ": {
        background: "rgb(255,255,255,0)",
        borderRadius: '50px',
    },
    "::-webkit-scrollbar-thumb": {
        background: "rgb(0,0,0,0.2)",
    },
}
 
export default Messages;