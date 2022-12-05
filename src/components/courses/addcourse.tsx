import * as React from 'react';
import {useState} from 'react';
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
import {createTheme, ThemeProvider} from '@mui/material/styles';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Input} from "@mui/material";
import {delay} from "@reduxjs/toolkit/dist/utils";

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

function register(request: any) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('courseHubtoken')}`
        },
        data: request,
        url: 'https://localhost:8443/api/course',
    };
    return axios(options);
}

const theme = createTheme();

export default function AddCourse() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [content, setContent] = useState(null);
    const [exam, setExam] = useState(null);
    const navigate = useNavigate();

    const handleContentChange = (e: { target: { files: Blob[]; }; }) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("Content", e.target.result);
            setContent(e.target.result);
        };
    }
    const handleExamChange = (e: { target: { files: Blob[]; }; }) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("Exam", e.target.result);
            setExam(e.target.result);
        };
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // if(exam == null || content == null){
        //     delay(1000);
        // }
        register({
            name : data.get('name'),
            code : data.get('code'),
            description : data.get('description'),
            totalSeats : data.get('totalSeats'),
            startTime : startDate.getTime(),
            endTime:endDate.getTime(),
            contents : JSON.parse(content as unknown as string),
            exams : JSON.parse(exam as unknown as string)
        }).then((r) => {
            navigate("/courses")
        }).catch((err) => {
            window.alert(err.message())
        });
    };


    // @ts-ignore
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Course
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Course Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="code"
                                    label="Course Code"
                                    name="code"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    autoComplete="description"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="totalSeats"
                                    label="Total Seats"
                                    name="totalSeats"
                                    autoComplete="totalSeats"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                Start Date - <DatePicker selected={startDate} onChange={setStartDate}/>
                            </Grid>
                            <Grid item xs={12}>
                                End Date - <DatePicker selected={endDate} onChange={setEndDate}/>
                            </Grid>
                            <Grid item xs={12}>
                                Content - <Input aria-label="Content" key="content" type = "file" onChange={handleContentChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                Exam -<Input aria-label="Exams" key="exam" type = "file" onChange={handleExamChange}/>
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Add Course
                        </Button>
                        Content Format
                        <div>{JSON.stringify([
                            {"id":9,"name":"lecture 1","type":"video","url":"google.com"},
                            {"id":10,"name":"lecture pdf","type":"image","url":"google.com"}
                        ], null, 2) }</div>
                        <br/>
                        Exam Format
                        <div>{JSON.stringify([
                            {"id":7,"name":"Quiz name 1","type":"QUIZ","duration":120,
                                "questions":"{how many bytes is  char?=[3, 2, 1, 0], what is array?=[DS, wall, io, boolean], what is 1+9?=[3, 2, 1, 10], what is 1+1?=[3, 2, 1, 0]}",
                                "answers":"{how many bytes is  char?=1, what is array?=DS, what is 1+9?=10, what is 1+1?=2}"}
                        ], null, 2) }</div>

                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}
