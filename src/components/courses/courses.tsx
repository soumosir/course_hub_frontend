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
import {Navigate, useNavigate} from "react-router-dom";
import Loader from '../loader/loader';


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


export default function Courses() {

    const [courseList, setCourseList] = useState([])
    const appService = new AppService()
    const navigate = useNavigate();
    let isWishlist = false
    if(localStorage.getItem('courseHubtoken') == null){
        navigate("/signin")
    }

    const [loader, setLoader] = React.useState(false);
    React.useEffect(() => {

        setLoader(true)
        appService.getCourses().then(r => {
          setLoader(false)  
          setCourseList(r.data)
        })
      }, []);


    // @ts-ignore
    // @ts-ignore
    return (
    <ThemeProvider theme={theme}>

      {loader && <Loader></Loader>}
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
