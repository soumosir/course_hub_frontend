import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Navigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function getEnrolledCourses() {
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
        url:'https://localhost:8443/api/course/enrolled',
    };
    // console.log(options);
    return axios(options)
}

function getWishlist() {
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
        url:'https://localhost:8443/api/course/wishlist',
    };
    // console.log(options);
    return axios(options)
}

const theme = createTheme();

export default function Home(props: any) {
    // const [courseList, setCourseList] = useState([])

    React.useEffect(() => {
        localStorage.getItem('courseHubtoken') != null &&
        getEnrolledCourses().then(r => {
            // console.log("OBJECT")
            // console.log(r.data)
            // setCourseList(r.data)
            localStorage.setItem('enrolledCourses',JSON.stringify(r.data));
        })
        getWishlist().then(r => {
            localStorage.setItem('wishlist',JSON.stringify(r.data));

        })
    }, []);


    return (
    <ThemeProvider theme={theme}>
        {localStorage.getItem('courseHubtoken') == null && <Navigate
            to="/signin"
        />}
      <Container component="main">
        <CssBaseline />
        <Typography variant='h3' m={5} gutterBottom>
                    Home
        </Typography>
        {/* <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

        </Box> */}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
