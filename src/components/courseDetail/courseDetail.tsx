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
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {useLocation} from 'react-router-dom';
import { card } from '../interfaces/interface'
import qs from "qs";
import axios from "axios";

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

function enrollInCourse() {
    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
        data: {courseId:11},
        url:'https://localhost:8443/api/course/enrolluser',
    };
    // console.log(options);
     axios(options).then((data) =>{console.log(data)}).catch((err) => {
         console.log(err);
     });
}

export default function CourseDetail() {
    const params = useParams();
    const location = useLocation();
    // console.log(params.id)
    // console.log(location.state.courseName)
    let course = location.state.course

    function isUserEnrolled(courseCode: string | null | undefined){
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') as string);
        let filteredData = enrolledCourses.filter((course: { code: string | null; }) => {
            return course.code === courseCode;
        });
        return filteredData.length > 0;
    }
  return (
    course.map(({code, name, instructor,  startTime, endTime, totalSeats, remainingSeats, description, active, isWishlist}: card) => (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Typography variant='h3' m={5} gutterBottom>
                    {code} - {name}
        </Typography>
         <Card sx={{ minWidth: 275, m: 5 }}>
            <CardContent>
                <Typography sx={{ fontSize: 20 }} gutterBottom>
                    {code} - {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Instructor: {instructor}
                </Typography>
                <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                    Start Date: {startTime}
                </Typography>
                <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                    End Date: {endTime}
                </Typography>
                <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                    Total Seats: {totalSeats}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:1.5 }} color="text.secondary">
                    Remaining Seats: {remainingSeats}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {description}
                </Typography>
                </CardContent>
            <CardActions>
                <Button id = {code} onClick={enrollInCourse} size="small" disabled={isUserEnrolled(code)}>{!isUserEnrolled(code)? <div>Enroll in Course</div> : <div>Already Enrolled in Course</div>}</Button>
                {/*<Button id={courseCode} onClick={handleCourseClick} size="small">Go to the course </Button>*/}
                {/*{isWishlist ? */}
                {/*    <Button id={courseCode} onClick={event => handleWishlistClick(event, isWishlist)} size="small">Remove from Wishlist</Button>*/}
                {/*:*/}
                {/*    <Button id={courseCode} onClick={event => handleWishlistClick(event, isWishlist)} size="small">Add to Wishlist</Button>*/}
                {/*}*/}
            </CardActions>
        </Card>
      </Container>
    </ThemeProvider>
  ))
  );
}
