import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Box } from '@mui/material';


const Title = ({ children, font, size, color }) => {



    const theme = createTheme({
        typography: {
            fontFamily: [
                font,
                'cursive',
            ].join(','),
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    fontFamily: font,
                    fontSize: size,
                    color: color ? color : 'black'
                }}
            >
                <h1>{children}</h1>
            </Box>
        </ThemeProvider>
    );
}

export default Title;