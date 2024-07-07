import { Box, Paper } from "@mui/material";

const HomeContainer = ({props,children}) => {
    return (
        <Box sx={container} component={Paper} elevation={3} {...props}>
            {children}
        </Box>
    );
}

const container = {
    background: '#fff',
    border: '1px solid grey-100',
    borderRadius: '20px',
    p: 2,
    width: '100%',
    height: '80vh',
}
export default HomeContainer;