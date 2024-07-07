import { Container, Grid, } from "@mui/material";
import Chatbox from "./Chat/chatbox";
import ChatsList from "./Chats/list";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/frb_config";

const Home = () => {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
          const userDoc = doc(db, "users", user.id);
    
          const setOnline = async () => {
            await updateDoc(userDoc, { isonline: true });
          };
    
          const setOffline = async () => {
            await updateDoc(userDoc, { isonline: false });
          };
    
          setOnline();
    
          // Handle the user closing the tab or browser
          const handleBeforeUnload = (e) => {
            setOffline();
          };
    
          window.addEventListener('beforeunload', handleBeforeUnload);
    
          // Clean up function to set offline when the component unmounts
          return () => {
            setOffline();
            window.removeEventListener('beforeunload', handleBeforeUnload);
          };
        }
      }, [user]);
    
    return ( 
        <Container sx={{}} elevation={4}>
            <Grid 
                container
                columnSpacing={2}
                columns={12}
                justifyContent="space-between"
                alignItems="stretch"
            >
                <Grid item md={4}>
                    <ChatsList />
                </Grid>
                <Grid item md={7.5} sx={{display: 'flex'}}>
                    <Chatbox />
                </Grid>
            </Grid>
        </Container>
    );
}
 
export default Home;