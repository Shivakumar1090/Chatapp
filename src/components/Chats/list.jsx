import { Stack, Typography } from "@mui/material";
import HomeContainer from "../_Common/home_container";
import ListCard from "./card";
import { useEffect, useState } from "react";
import { allUsers } from "../../apis/user";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/frb_config";
import Search from "./Search";

const ChatsList = () => {
    const currentUser = useSelector(state => state.user);

    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = async () => {
            if (!currentUser.id) return;

            const unsub = onSnapshot(doc(db, "userChats", currentUser.id), async (doc) => {
                const chatData = doc.data();
                const chatArray = [];

                for (let chatId in chatData) {
                    const userRef = chatData[chatId]?.userInfo;
                    if (userRef) {
                        try {
                            const userSnapshot = await getDoc(userRef);
                            const userData = userSnapshot.data();

                            const userUnsub = onSnapshot(userRef, (userDoc) => {
                                const updatedUserData = userDoc.data();
                                setChats(prevChats => prevChats.map(chat => 
                                    chat.id === chatId ? { ...chat, userInfo: { ...chat.userInfo, ...updatedUserData } } : chat
                                ));
                            });

                            chatArray.push({
                                id: chatId,
                                ...chatData[chatId],
                                userInfo: { ref: userRef, ...userData },
                                userUnsub,
                            });
                        } catch (error) {
                            console.error("Error fetching user data: ", error);
                        }
                    }
                }

                setChats(chatArray);
            });

            return () => {
                unsub();
                chats.forEach(chat => chat.userUnsub && chat.userUnsub());
            };
        };

        getChats();
    }, [currentUser.id]);
  
    // useEffect(() => {
    //     const getChats = async () => {
    //         const unsub = await onSnapshot(doc(db, "userChats", currentUser.id), async(doc) => {
    //             const chatData = doc.data();
    //             const chatArray = [];

    //             for (let chatId in chatData) {
    //                 const userRef = chatData[chatId]?.userInfo;
    //                 if (userRef) {
    //                     try {
    //                         const userSnapshot = await getDoc(userRef);
    //                         const userData = userSnapshot.data();
    //                         chatArray.push({
    //                             id: chatId,
    //                             ...chatData[chatId],
    //                             userInfo: { ref: userRef, ...userData },
    //                         });
    //                     } catch (error) {
    //                         console.error("Error fetching user data: ", error);
    //                     }
    //                 }
    //             }

    //             setChats(chatArray);
    //         });
    
    //         return () => {
    //             unsub();
    //         };
    //     };
    
    //     currentUser.id && getChats();
    // }, [currentUser.id]);

    console.log(chats);

    return ( 
        <HomeContainer>
            <Typography fontWeight={700}>Messages</Typography>
            <Search />
            <Stack spacing={2} sx={list}>
                {Object.entries(chats).sort((a,b)=>b[1].date - a[1].date).map(chat => (
                    <ListCard key={chat[0]} person={chat[1]}/>
                ))}
            </Stack>
        </HomeContainer>
     );
}
 
const list = {
    overflowY: 'scroll',
    height: '80%',
    width: '100%',
    "::-webkit-scrollbar": {
        width: '4px',
    },
    "::-webkit-scrollbar-track ": {
        background: "rgb(255,255,255,0)",
        borderRadius: '50px',
    },
    "::-webkit-scrollbar-thumb": {
        background: "rgb(48, 70, 197,0.2)",
    },
}

export default ChatsList;