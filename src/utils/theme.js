import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize',
                },
            },
        },
    },
    palette: {
        primary: {
            main: "#000",
        },
        secondary: {
            main: "#3046C5",
        },
    },
    typography: {
        fontFamily: "Raleway",
    },
});

export default theme;