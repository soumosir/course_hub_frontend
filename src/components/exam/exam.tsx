import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import jwt from "jwt-decode";

import {useLocation} from 'react-router-dom';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { hostUrl } from '../../App';
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

function getExam(id:any) {
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
        url: hostUrl + `/api/exam/${id}`,
    };
    // console.log(options);
    return axios(options)
}

const postToExam = (exam:any) => {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
        data : exam,
        url: hostUrl + '/api/exam/submit',
    };
    // console.log(options);
    return axios(options)
}





const theme = createTheme();

export default function Exam(props: any) {
    // const [courseList, setCourseList] = useState([])
    const params = useParams();
    const navigate = useNavigate();
    const [questions,setQuestions] = useState({});
    const [loading,setLoading] = useState("Loading...");
    const [score,setScore] = useState("-1");
    let examId = params.id;

    const [loader, setLoader] = React.useState(false);
    const [isInstructor, setInstructor] = React.useState(false);
    React.useEffect(() => {
        let token = localStorage.getItem('courseHubtoken')
        if (token != null) {
        const tok :string  = token || "";
        const userMap : any = jwt(tok);
        setInstructor(userMap["roles"].includes("ROLE_INSTRUCTOR"))
        }
    }, []);

    if(localStorage.getItem('courseHubtoken') == null){
        navigate("/signin")
    }
    const [answers,setAnswers] = useState(new Map());

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.name)
      let newanswers = answers;
      newanswers.set( (event.target.name) , (event.target as HTMLInputElement).value )
      setAnswers(newanswers);
    };

    const submitExam = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log("submit Exam - ",data,answers);


      let jans = Object.fromEntries(answers);
      jans = JSON.stringify(jans);
      const dataRequest = {
        examId : params.id,
        answers : jans,
      }
      console.log(dataRequest);

      setLoader(true)
      postToExam(dataRequest).then((r) => {
        setLoader(false)
        console.log("Marks is ",r.data["marks"])
        if(r.data["marks"] || r.data["marks"]==0 ){
          alert("Exam submission Successfull :: Marks"+r.data["marks"]);
          setScore("Your score is "+r.data["marks"]+" %. Correct answers are hidden");
        }
        else{
          setLoader(false)
          alert("Exam was submitted earlier");
          setScore(r.data["error_message"])
        }

      }).catch((err) => {
        alert(`Exam submission Unsuccessfull + ${err}`);
        console.log(err);
      })
    };


    React.useEffect(() => {
        setLoader(true)
        localStorage.getItem('courseHubtoken') != null &&
        getExam(examId).then(r => {
            setLoader(false)
            console.log("exam is ", r.data);
            if(Object.hasOwn(r.data,"error_message")){
              setLoading(r.data.error_message);
            }
            else{
            let questions = JSON.parse(r.data["questions"]);
            console.log(questions);
            setQuestions(questions);
            setLoading("Loaded");
            }
        }).catch((err) => {
          setLoader(false)
          // alert(`Exam doesnot exist`);
          setLoading("Exam doesnot exist");
          if (err.response.status == 403) {
            localStorage.clear()
            navigate("/signin")
          }
          console.log(err);
        })

    }, []);

    return (
    <ThemeProvider theme={theme}>
       {loader && <Loader></Loader>}
        {localStorage.getItem('courseHubtoken') == null && <Navigate
            to="/signin"
        />}
      <Container component="main">
        <CssBaseline />
        <Typography variant='h3' m={5} gutterBottom>
                    Exam
        </Typography>
        { loading=="Loaded"?
        <Box component="form" noValidate onSubmit={submitExam} sx={{ m: 5 }}>
        {Object.entries(questions).map((question)=>(
          <Box m={5}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{question[0]}</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name={question[0]}
                onChange={handleRadioChange}
            >
                <FormControlLabel value={question[1][0]} control={<Radio />} label={question[1][0]} />
                <FormControlLabel value={question[1][1]} control={<Radio />} label={question[1][1]} />
                <FormControlLabel value={question[1][2]} control={<Radio />} label={question[1][2]} />
                <FormControlLabel value={question[1][3]} control={<Radio />} label={question[1][3]} />
            </RadioGroup>
          </FormControl>
          </Box>
        ))}

          {
            isInstructor
            ?
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
              m = {5}
            >
              <Button variant="contained" disabled={true} >Submit</Button>
                <Typography variant='h6' m={5} gutterBottom>
                        Instructors can't submit the exam.
                </Typography>
           </Stack>

            :
            <Button variant="contained" type="submit" disabled={score!="-1"} >Submit</Button>
          }
        </Box>




        : 
        <Typography m={5} sx={{ fontSize: 18 }} color={loading.length <= 10 ? "text.secondary":"red"}>
          {loading}
        </Typography>
        }
        {score=="-1"?  ""
         :
         score
        }
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
