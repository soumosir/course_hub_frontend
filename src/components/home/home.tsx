import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import CourseCard from '../courseCard/courseCard';
import jwt from 'jwt-decode'
import { AppService } from '../appService/appService';
import { Button, Stack } from '@mui/material';
import { hostUrl } from '../../App';

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
        url: hostUrl + '/api/course/enrolled',
    };
    // console.log(options);
    return axios(options)
}


const theme = createTheme();

export default function Home(props: any) {
    // const [courseList, setCourseList] = useState([])

    const [enrolledCourseList, setEnrolledCourseList] = useState([])
    const [username, setUsername] = useState("");
    const [isInstructor, setInstructor] = useState(false)
    const appService = new AppService()
    const navigate = useNavigate();
    

    React.useEffect(() => {
      console.log("HOME LOCAL STORAGE")
      let token = localStorage.getItem('courseHubtoken')
      if (token != null) {
        const tok :string  = token || "";
        const userMap : any = jwt(tok);
        let isInstuctorTrue = userMap["roles"].includes("ROLE_INSTRUCTOR")
        setInstructor(isInstuctorTrue)
        setUsername(userMap["sub"]);
        console.log(isInstuctorTrue, userMap)
        isInstuctorTrue ?
        appService.getMyCreatedCourses().then(r => {
          setEnrolledCourseList(r.data)
          console.log("Created Courses", r.data)
          localStorage.setItem('enrolledCourses',JSON.stringify(r.data));
      })
        :
        getEnrolledCourses().then(r => {
          setEnrolledCourseList(r.data)
          console.log("Enrolled Courses", r.data)
          localStorage.setItem('enrolledCourses',JSON.stringify(r.data));
      })
      }
    }, []);
    
    let isHome = true
    let isWishlist = false

    const navigateToAddCourse = function(event: React.MouseEvent<HTMLButtonElement>){
      navigate("/course/add")    
    };

    return (
    <ThemeProvider theme={theme}>
        {localStorage.getItem('courseHubtoken') == null && <Navigate
            to="/signin"
        />}
      <Container component="main">
        <CssBaseline />
        <Typography variant='h3' m={5} gutterBottom>
            Welcome to course hub, {username}!
        </Typography>
      <CssBaseline />

      <Stack
        m = {5}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}>
        <Typography variant='h4' gutterBottom>
            {isInstructor ? "My Courses" : "Enrolled Courses"}
        </Typography>
        {isInstructor 
        ?
        <Button variant="contained" onClick={event => navigateToAddCourse(event)}>Add Course</Button>
        :
        ""
        }
      </Stack>

        <CourseCard data={[enrolledCourseList, isWishlist, isHome]} />
      </Container>
    </ThemeProvider>
  );
}
