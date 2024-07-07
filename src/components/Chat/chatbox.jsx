import { Avatar, Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import HomeContainer from "../_Common/home_container";
import PIC from "../../assets/images/shiva.jpg";
import CallIcon from '@mui/icons-material/Call';
import DuoIcon from '@mui/icons-material/Duo';
import InfoIcon from '@mui/icons-material/Info';
import InputMessage from "./input";
import Messages from "./messages";
import { useSelector } from "react-redux";

const Chatbox = () => {
    const data = useSelector(state => state.chat);
    console.log(data);

    return ( 
        <HomeContainer >
            {data.chatId !== "null" ? 
            <Box sx={chatContainer}>
                <Box>
                    <Box display="flex" justifyContent="space-between" pb={1}>
                        <Stack direction="row" spacing={1} alignItems="flex-start">
                            <Avatar src={data?.user.avatar}/>
                            <Box>
                                <Typography variant="body2" fontWeight={600}>{data?.user.name}</Typography>
                                <Typography variant="caption">{data?.user.isonline ? "online" : 11}</Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={-1}>
                            <IconButton><CallIcon /></IconButton>
                            <IconButton><DuoIcon /></IconButton>
                            <IconButton><InfoIcon /></IconButton>
                        </Stack>
                    </Box>
                    <Divider />
                </Box>

                <Messages />
                <InputMessage />
            </Box>
            :
            <Box >
                <Typography variant="h6" fontWeight={700} color='grey' m='auto'>Select a chat to start conversation</Typography>
            </Box>
        }
           
        </HomeContainer>
     );
}

const chatContainer = {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between',
    height: '100%'
}
 
export default Chatbox;