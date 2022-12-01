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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CourseCard from '../courseCard/courseCard';

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
        isWishlist: true
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
        isWishlist: true
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
        isWishlist: true
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
        isWishlist: true
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
        isWishlist: true
    },
]

export default function Wishlist() {
  let wishlistCourses = JSON.parse(localStorage.getItem('wishlist') as string)
  console.log("WISHLIST")
  console.log(wishlistCourses)
  let isWishlist = true
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
      <CssBaseline />
        <Typography variant='h3' m={5} gutterBottom>
                    Wishlist
        </Typography>
        <CourseCard data={[wishlistCourses, isWishlist, false]} />
      </Container>
    </ThemeProvider>
  );
}