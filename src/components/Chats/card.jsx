import { Avatar, Box, Container, Divider, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeUser } from "../../redux/Slicers/chatSlice";

const ListCard = ({person}) => {
    const {lastMessage,userInfo} = person;
    console.log(userInfo)
    const dispatch = useDispatch();

    const handleSelect = () => {
        dispatch(changeUser(userInfo));
    };

    return ( 
        <Container sx={{cursor: 'pointer'}} maxWidth onClick={handleSelect}>
            <Stack direction="row" spacing={1} pb={2}>
                <Avatar src={userInfo?.avatar} />
                <Box>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="body2" fontWeight={600}>{userInfo?.name}</Typography>
                        <Typography variant="caption">11:54pm</Typography>
                        {userInfo?.isonline&&<Typography>online</Typography>}
                    </Box>

                    <Typography variant="caption">{lastMessage?.text}</Typography>
                </Box>
            </Stack>
            <Divider />
        </Container>
     );
}
 
export default ListCard;