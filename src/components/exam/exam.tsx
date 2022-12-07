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
        url:`https://coursehubbackend.herokuapp.com/api/exam/${id}`,
    };
    // console.log(options);
    return axios(options)
}

const postToExam = (exam:any) => {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
        data : exam,
        url:'https://coursehubbackend.herokuapp.comapi/exam/submit',
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

      postToExam(dataRequest).then((r) => {
        console.log("Marks is ",r.data["marks"])
        if(r.data["marks"] || r.data["marks"]==0 ){
          alert("Exam submission Successfull :: Marks"+r.data["marks"]);
          setScore("Your score is "+r.data["marks"]+" %. Correct answers are hidden");
        }
        else{
          alert("Exam was submitted earlier");
          setScore(r.data["error_message"])
        }

      }).catch((err) => {
        alert(`Exam submission Unsuccessfull + ${err}`);
        console.log(err);
      })
    };


    React.useEffect(() => {
        localStorage.getItem('courseHubtoken') != null &&
        getExam(examId).then(r => {

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
          alert(`Exam doesnot exist`);
          setLoading("Exam doesnot exist");
          console.log(err);
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
        { loading=="Loaded"?
        <Box component="form" noValidate onSubmit={submitExam} sx={{ mt: 3 }}>
        {Object.entries(questions).map((question)=>(
          <div>
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
          </div>
        ))}


          <Button variant="contained" type="submit" disabled={score!="-1"} >Submit</Button>

        </Box>




        :loading}
        {score=="-1"?  ""
         :
         score
        }
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
