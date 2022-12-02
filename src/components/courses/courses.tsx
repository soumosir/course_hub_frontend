import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CourseCard from '../courseCard/courseCard';
import { AppService } from "../appService/appService";
import {useState} from "react";
import { course } from '../interfaces/interface'
import {Navigate} from "react-router-dom";


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

const theme = createTheme();
const response = [
    {
        courseCode: "ENPM613",
        courseName: "Software Design And Implementation",
        courseInstructor: "Kini",
        courseStartDate: "12/01/22",
        courseEndDate: "12/01/22",
        totalSeats: 60,
        remainingSeats: 60,
        courseDescription: "This course teaches design patterns and principles in detail",
        active: 1,
        isWishlist: false
    },
    {
        courseCode: "ENPM614",
        courseName: "Software Design And Implementation",
        courseInstructor: "Kini",
        courseStartDate: "12/01/22",
        courseEndDate: "12/01/22",
        totalSeats: 60,
        remainingSeats: 60,
        courseDescription: "This course teaches design patterns and principles in detail",
        active: 1,
        isWishlist: false
    },
    {
        courseCode: "ENPM615",
        courseName: "Software Design And Implementation",
        courseInstructor: "Kini",
        courseStartDate: "12/01/22",
        courseEndDate: "12/01/22",
        totalSeats: 60,
        remainingSeats: 60,
        courseDescription: "This course teaches design patterns and principles in detail",
        active: 1,
        isWishlist: false
    },
    {
        courseCode: "ENPM616",
        courseName: "Software Design And Implementation",
        courseInstructor: "Kini",
        courseStartDate: "12/01/22",
        courseEndDate: "12/01/22",
        totalSeats: 60,
        remainingSeats: 60,
        courseDescription: "This course teaches design patterns and principles in detail",
        active: 1,
        isWishlist: false
    },
    {
        courseCode: "ENPM617",
        courseName: "Software Design And Implementation",
        courseInstructor: "Kini",
        courseStartDate: "12/01/22",
        courseEndDate: "12/01/22",
        totalSeats: 60,
        remainingSeats: 60,
        courseDescription: "This course teaches design patterns and principles in detail",
        active: 1,
        isWishlist: false
    },
]

export default function Courses() {

    const [courseList, setCourseList] = useState([])
    const appService = new AppService()
    let isWishlist = false
    React.useEffect(() => {
        appService.getCourses().then(r => {
            console.log("OBJECT")
            console.log(r.data)
            let enrolledCourses = localStorage.getItem('enrolledCourses')
            let wishlistCourses = localStorage.getItem('wishlist')
            // let filteredCourses = r.data.filter((course: course) => {
            //     return !enrolledCourses.indexOf(course.id) === -1;
            // });
            setCourseList(r.data)
        })
      }, []);


    // @ts-ignore
    // @ts-ignore
    return (
    <ThemeProvider theme={theme}>
        {localStorage.getItem('courseHubtoken') == null && <Navigate
            to="/signin"
        />}
      <Container component="main">
      <CssBaseline />
        <Typography variant='h3' m={5} gutterBottom>
            Courses
        </Typography>

        <CourseCard data={[courseList, isWishlist, false]} />
      </Container>
    </ThemeProvider>
  );
}
