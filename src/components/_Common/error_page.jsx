import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return ( 
        <Box sx={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',height: '90vh'}}>
            <Typography variant="h2" fontWeight={500} gutterBottom>Oops! Something went wrong</Typography>
            <Button
                component={Link}
                to="/"
                size="large"
                variant="outlined"
            >
                Back to Home
            </Button>
        </Box>
    );
}
 
export default ErrorPage;