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

import {useLocation} from 'react-router-dom';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

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

function getExam(id:any) {
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
        url:`https://localhost:8443/api/exam/${id}`,
    };
    // console.log(options);
    return axios(options)
}

// function submitExam() {
//     const options = {
//         method: 'POST',
//         headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
//         url:'https://localhost:8443/api/exam/',
//     };
//     // console.log(options);
//     return axios(options)
// }

const theme = createTheme();

export default function Exam(props: any) {
    // const [courseList, setCourseList] = useState([])
    const location = useLocation();
    let q = "{\"how many bytes is  char?\":[\"3\",\"2\",\"1\",\"0\"],\"what is array?\":[\"DS\",\"wall\",\"io\",\"boolean\"],\"what is 1+9?\":[\"3\",\"2\",\"1\",\"10\"],\"what is 1+1?\":[\"3\",\"2\",\"1\",\"0\"]}";
    q = JSON.parse(q);
    const [questions,setQuestions] = useState(q);
    let examId = 8;

    React.useEffect(() => {
        localStorage.getItem('courseHubtoken') != null &&
        getExam(examId).then(r => {
            
            console.log("exam is ", r.data);
            let questions = JSON.parse(r.data);
            questions = "{how many bytes is  char?=[3, 2, 1, 0], what is array?=[DS, wall, io, boolean], what is 1+9?=[3, 2, 1, 10], what is 1+1?=[3, 2, 1, 0]}";
            questions = JSON.parse(questions);
            console.log("questions - ",questions);
            setQuestions(questions);
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
                    Exam
        </Typography>
        {/* {JSON.stringify(questions)} */}
        
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">how many bytes is  char?</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="1" control={<Radio />} label="1" />
            </RadioGroup>
        </FormControl>  

        <br></br>

        
        <div>

        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">how many bytes is  int?</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel value="female" control={<Radio />} label="4" />
                <FormControlLabel value="male" control={<Radio />} label="8" />
                <FormControlLabel value="other" control={<Radio />} label="16" />
            </RadioGroup>
        </FormControl>

        </div>  

        <br></br>
        <br></br>

        <Button variant="contained">Submit</Button>

      

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
