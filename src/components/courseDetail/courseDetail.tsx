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
  return (
    course.map(({courseCode, courseName, courseInstructor,  courseStartDate, courseEndDate, totalSeats, remainingSeats, courseDescription, active, isWishlist}: card) => (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Typography variant='h3' m={5} gutterBottom>
                    {courseCode} - {courseName}
        </Typography>
         <Card sx={{ minWidth: 275, m: 5 }}>
            <CardContent>
                <Typography sx={{ fontSize: 20 }} gutterBottom>
                    {courseCode} - {courseName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Instructor: {courseInstructor}
                </Typography>
                <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                    Start Date: {courseStartDate}
                </Typography>
                <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                    End Date: {courseEndDate}
                </Typography>
                <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                    Total Seats: {totalSeats}
                </Typography>
                <Typography sx={{ fontSize: 14, mb:1.5 }} color="text.secondary">
                    Remaining Seats: {remainingSeats}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {courseDescription}
                </Typography>
                </CardContent>
            <CardActions>
                <Button id = {courseCode} onClick={enrollInCourse} size="small">Enroll in Course</Button>
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
