import React from 'react';
import { Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
const theme = createTheme();
export default function NotFoundPage() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
            >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                <Grid xs={6}>
                    <Typography variant="h1">
                    404
                    </Typography>
                    <Typography variant="h6">
                    The page you’re looking for doesn’t exist.
                    </Typography>
                    <Typography variant="h6">
                    <Link to="/">Go to Home </Link>
                    </Typography>
                    {/* <Button variant="contained">Back Home</Button> */}
                </Grid>
                <Grid xs={6}>
                    <img
                    src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                    alt=""
                    width={500} height={250}
                    />
                </Grid>
                </Grid>
            </Container>
            </Box>
        </Container>
    </ThemeProvider>       
  );
}