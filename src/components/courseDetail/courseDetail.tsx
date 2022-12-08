import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {card} from '../interfaces/interface'
import axios from "axios";
import ContentCard from '../contentCard/contentCard';
import ExamCard from '../examCard/examCard';
import Grid from "@mui/material/Grid";
import {Backdrop, CircularProgress, Input, LinearProgress, MenuItem} from "@mui/material";
import jwt from "jwt-decode";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { AppService } from '../appService/appService';
import { hostUrl } from '../../App';
import { sizing } from '@mui/system';
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


export default function CourseDetail() {
    const params = useParams();
    const location = useLocation();
    let navigate = useNavigate();
    const [courseList, setCourseList] = useState([])
    const [isContentAdding, setIsContentAdding] = useState(false);
    const [isExamAdding, setIsExamAdding] = useState(false);
    const [questions, setQuestions] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [enrolledCourseList, setEnrolledCourseList] = useState([])
    const [errors,setErrors] = useState({});
    if (localStorage.getItem('courseHubtoken') == null) {
        navigate("/signin")
    }
    const appService = new AppService()

    const [isInstructor, setInstructor] = React.useState(false);
    React.useEffect(() => {
        let token = localStorage.getItem('courseHubtoken')
        if (token != null) {
        const tok :string  = token || "";
        const userMap : any = jwt(tok);
        setInstructor(userMap["roles"].includes("ROLE_INSTRUCTOR"))
        }
    }, []);

    const [first, setFirst] = useState(false);
    //console.log("COURSE DETAILS")
    // getCourseDetail(params.id)
    // getCourseDetail(11);

    function isUserEnrolled(courseCode: string | null | undefined) {
        let filteredData = enrolledCourseList.filter((course: { code: string | null; }) => {
            return course.code === courseCode;
        });
        return filteredData.length > 0;
    }

    React.useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('courseHubtoken')}`
            },
            url: hostUrl + `/api/course/` + params.id,
        };
        //console.log("PARAMETER ID", params.id)
        setLoader(true)
        axios(options).then((r) => {
            // //console.log(r.data);
            setCourseList([r.data])
            //console.log("CourseList")
            //console.log(r.data)
            setFirst(true);
            setLoader(false)
            // //console.log(courseList)
        }).catch((err) => {
            setLoader(false)
            //console.log(err.response.status);
            if (err.response.status == 403) {
              navigate("/signin")
            }
        })

        setLoader(true)
        getEnrolledCourses().then(r => {
            setEnrolledCourseList(r.data)
            setLoader(false)
        }).catch((err) => {
            setLoader(false)
            //console.log(err.response.status);
            if (err.response.status == 403) {
              navigate("/signin")
            }
        })
    }, []);

    function getEnrolledCourses() {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('courseHubtoken')}`
            },
            url: hostUrl + '/api/course/enrolled',
        };
        // //console.log(options);
        return axios(options)
    }

    function unenrollFromCourse(courseId: any){
        const request = {
            courseId
        }
        setLoader(true)
        appService.unenrollCourse(request).then(r => {
            getEnrolledCourses().then(r => {
                setEnrolledCourseList(r.data)
                // localStorage.setItem('enrolledCourses', JSON.stringify(r.data));
                setLoader(false)
                window.location.reload();
            })

        }).catch((err) => {
            setLoader(false)
            //console.log(err.response.status);
            if (err.response.status == 403) {
              navigate("/signin")
            }
        })
    }

    function enrollInCourse(id: any) {
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('courseHubtoken')}`
            },
            data: {courseId: id},
            url: hostUrl + '/api/course/enrolluser',
        };
        // //console.log(options);
        setLoader(true)
        axios(options).then((data) => {
            //console.log(data)
            getEnrolledCourses().then(r => {
                setEnrolledCourseList(r.data)
                setLoader(false)
                window.location.reload();
                // localStorage.setItem('enrolledCourses', JSON.stringify(r.data));
                // window.location.reload();
            })
        }).catch((err) => {
            setLoader(false)
            //console.log(err.response.status);
            if (err.response.status == 403) {
              navigate("/signin")
            }
          })
    }

    const handleQuestionChange = (e: { target: { files: Blob[]; }; }) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            //console.log("Content", e.target.result);
            setQuestions(e.target.result);
        };
    }
    const handleAnswersChange = (e: { target: { files: Blob[]; }; }) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            // //console.log("Exam", e.target.result);
            setAnswers(e.target.result);
        };
    }
    const isOwner = () => {
        const tok :string  = localStorage.getItem('courseHubtoken') || "";
        const userMap : any = jwt(tok);
        const currentCourse = courseList[0];
        //console.log(currentCourse,userMap);
        return currentCourse['instructor'] == userMap.sub;
    }

    // function seeContent(id:any) {
    //     // @ts-ignore
    //     localStorage.setItem(`content`,JSON.stringify(courseList.contents));
    //     // @ts-ignore
    //     first && navigate(`/course/${courseList.id}/content`, {state: {id: 1, content: courseList.contents}});
    // }

    function isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    const addContent = (event: React.FormEvent<HTMLFormElement>) => {
        const currentCourse = courseList[0];
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newContent = {
            name:data.get('name') as string,
            type:data.get('type') as string,
            description : data.get('description') as string,
            url:data.get('url') as string
        };
        //console.log(newContent);
        const error = {};
        let isError = false;
        if(!isValidHttpUrl(data.get('url'))){
            // @ts-ignore
            error['url'] = "URL not valid";
            isError = true;
        }
        if(newContent.name == null || newContent.name.length == 0){
            error['name'] = "Required";
            isError = true;
        }
        if(data.get('type') == null|| newContent.type.length == 0){
            error['type'] = "Required";
            isError = true;
        }
        if(data.get('description') == null|| newContent.description.length == 0){
            error['description'] = "Required";
            isError = true;
        }
        setErrors(error);
        if(isError){
            return;
        }


        currentCourse.contents = [newContent];

        // if (newExam != null) {
        //     isChanged = true;
        //     if (currentCourse.exams === null) {
        //         currentCourse.exams = newExam;
        //     } else {
        //         currentCourse.exams.push(...newExam)
        //     }
        // }
        // //console.log(currentCourse);

        // currentCourse.exams.addAll(newExam);

        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('courseHubtoken')}`
            },
            data: currentCourse,
            url: hostUrl + '/api/course',
        };
        setIsContentAdding(false);
        setLoader(true)
        axios(options).then((r) => {
            setCourseList([r.data])
            setLoader(false)
            //console.log("successfull edit")
        })
    }
    const addExam = (event: React.FormEvent<HTMLFormElement>) => {
        const currentCourse = courseList[0];
        event.preventDefault();
        try{
        const data = new FormData(event.currentTarget);
        const newContent = {
            name:data.get('name') as string,
            type:data.get('exam_type') as string,
            duration:data.get('exam_duration'),
            questions:JSON.parse(questions as unknown as string),
            answers:JSON.parse(answers as unknown as string)
        };
        console.log(newContent);
        let isError = false;

        const error = {}
        if(data.get('exam_duration')<=0){
            // @ts-ignore
            error['exam_duration'] = "Duration should be a positive integer.";
        }
        if(data.get('name') == null|| newContent.name.length == 0){
            error['name'] = "Required";
            isError = true;
        }
        if(data.get('exam_type') == null|| newContent.type.length == 0){
            error['exam_type'] = "Required";
            isError = true;
        }
        setErrors(error);
        if(isError){
            return
        }

        currentCourse.exams =[newContent];

        // if (newExam != null) {
        //     isChanged = true;
        //     if (currentCourse.exams === null) {
        //         currentCourse.exams = newExam;
        //     } else {
        //         currentCourse.exams.push(...newExam)
        //     }
        // }
        // //console.log(currentCourse);

        // currentCourse.exams.addAll(newExam);

        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('courseHubtoken')}`
            },
            data: currentCourse,
            url: hostUrl + '/api/course',
        };
        setIsExamAdding(false);
        setLoader(true)
        axios(options).then((r) => {
            //console.log("ADD CONTENT",r.data)
            setCourseList([r.data])
            setLoader(false)
        })}
        catch (e){
            //console.log("excp = ",e);
        }
    }

    const handleGradesClick = function (event: React.MouseEvent<HTMLButtonElement>, id: number) {
        // Somewhere in your code, e.g. inside a handler:
        // ////console.log(data.courseCode, data.courseInstructor)
        ////console.log(id);
        navigate("/grades/" + id);
    };
    const handleEditContent = (value: boolean) => {
        setIsExamAdding(false);
        setIsContentAdding(value);
    }
    const handleEditExam = (value: boolean) => {
        setIsContentAdding(false);
        setIsExamAdding(value);
    }


    // const currentHeight = window.innerHeight

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore

    const [loader, setLoader] = React.useState(false);
    return (

        courseList.map(({
                            id,
                            code,
                            name,
                            instructor,
                            startTime,
                            endTime,
                            totalSeats,
                            remainingSeats,
                            description,
                            active,
                            isWishlist,
                            exams,
                            contents
                        }: card) => (

            <ThemeProvider theme={theme}>
                {loader && <Loader></Loader>}
                <Container component="main">
                    <CssBaseline/>
                    <Typography variant='h3' m={5} gutterBottom>
                        {/* {myString} */}
                        {code} - {name}
                    </Typography>
                    <Card sx={{minWidth: 275, m: 5}}>
                        <CardContent>
                            <Typography sx={{fontSize: 20}} gutterBottom>
                                {code} - {name}
                            </Typography>
                            {isInstructor
                            ?
                            ""
                            :
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                Instructor: {instructor}
                            </Typography>
                            }
                            {/* <Typography sx={{fontSize: 14, mb: 0}} color="text.secondary">
                                Start Date: {startTime.split("T")[0]}
                            </Typography>
                            <Typography sx={{fontSize: 14, mb: 0}} color="text.secondary">
                                End Date: {endTime.split("T")[0]}
                            </Typography> */}
                            <Typography sx={{fontSize: 14, mb: 0}} color="text.secondary">
                                Total Seats: {totalSeats}
                            </Typography>
                            <Typography sx={{fontSize: 14, mb: 1.5}} color="text.secondary">
                                Remaining Seats: {remainingSeats}
                            </Typography>
                            <Typography sx={{fontSize: 14}} color="text.secondary">
                                {description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {isInstructor
                            ?
                            <Box>
                            {
                                isOwner() && <Button id={code + 'edit'} onClick={() => {
                                    handleEditContent(true);
                                } } size="small">
                                    Add Content
                                </Button>}
                                {
                                isOwner() && <Button id={code + 'edit'} onClick={() => {
                                    handleEditExam(true);
                                } } size="small">
                                    Add Exam
                                </Button>
                            }
                            </Box>
                            :
                            <Box>
                            {
                                isUserEnrolled(code) ?
                                <Button id={code} onClick={() => {
                                    unenrollFromCourse(id);
                                } } size="small">
                                   Unenroll from Course</Button>

                                :
                                <Button id={code} onClick={() => {
                                    enrollInCourse(id);
                                } } size="small">
                                    Enroll in Course</Button>
                            }
                            </Box>
                            }

                            {/*<Button id={courseCode} onClick={handleCourseClick} size="small">Go to the course </Button>*/}
                            {/*{isWishlist ? */}
                            {/*    <Button id={courseCode} onClick={event => handleWishlistClick(event, isWishlist)} size="small">Remove from Wishlist</Button>*/}
                            {/*:*/}
                            {/*    <Button id={courseCode} onClick={event => handleWishlistClick(event, isWishlist)} size="small">Add to Wishlist</Button>*/}
                            {/*}*/}
                            {/* <Button id={code + 'content'} onClick={seeContent} size="small">See Course Content</Button> */}

                        </CardActions>
                    </Card>
                    {isContentAdding &&
                    <Box m = {5} component="form" noValidate onSubmit={addContent} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    error={errors['name']!=null}
                                    helperText={errors['name']!=null?"Required":""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="type"
                                    label="Type"
                                    name="type"
                                    autoComplete="family-name"
                                    select
                                    error={errors['type']!=null}
                                    helperText={errors['type']!=null?"Required":""}
                                >
                                    <MenuItem value="Video">Video</MenuItem>
                                    <MenuItem value="Pdf">PDF</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    autoComplete="family-name"
                                    error={errors['description']!=null}
                                    helperText={errors['description']!=null?"Required":""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="url"
                                    label="URL"
                                    name="url"
                                    autoComplete="url"
                                    error={errors['url']!=null}
                                    helperText={errors['url']!=null?"Please enter a valid URL":""}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Content
                        </Button>
                    </Box>}
                    {isExamAdding && <Box m = {5} component="form" noValidate onSubmit={addExam} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="exam-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="exam_name"
                                    label="Name"
                                    autoFocus
                                    error={errors['name']!=null}
                                    helperText={errors['name']!=null?"Required":""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="exam_type"
                                    label="exam_type"
                                    name="exam_type"
                                    autoComplete="exam-type"
                                    select
                                    error={errors['exam_type']!=null}
                                    helperText={errors['exam_type']!=null?"Required":""}
                                >
                                    <MenuItem value="Quiz">Quiz</MenuItem>
                                    <MenuItem value="Exam">Exam</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="exam_duration"
                                    label="Duration"
                                    name="exam_duration"
                                    autoComplete="duration"
                                    type="number"
                                    error={errors['exam_duration']!=null}
                                    helperText={errors['exam_duration']!=null?"Duration should be greater than zero":""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                Questions - <Input aria-label="Content" key="content" accept=".json" type = "file" onChange={handleQuestionChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                Answers -<Input aria-label="Exams" key="exam" accept=".json" type = "file" onChange={handleAnswersChange}/>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Exam
                        </Button>
                        Questions/Answers Format
                        <div>{JSON.stringify([
                            {"name":"Quiz name 1","type":"QUIZ","duration":120,
                                "questions":"{how many bytes is  char?=[3, 2, 1, 0], what is array?=[DS, wall, io, boolean], what is 1+9?=[3, 2, 1, 10], what is 1+1?=[3, 2, 1, 0]}",
                                "answers":"{how many bytes is  char?=1, what is array?=DS, what is 1+9?=10, what is 1+1?=2}"}
                        ], null, 2) }</div>
                    </Box>}
                    {!isContentAdding && !isExamAdding && <div>
                        <Typography variant='h4' m={5} gutterBottom>
                            Contents
                        </Typography>
                        {first && <ContentCard data={contents} id={id}/>}
                        <Typography variant='h4' m={5} gutterBottom>
                            Exams
                        </Typography>
                        {first && <ExamCard data={exams}/>}
                        {/* <ExamCard data={exams}/> */}
                        { isInstructor
                        ?
                        ""
                        :
                        <Typography variant='h4' m={5} gutterBottom>
                            <Button id="grades" onClick={event => handleGradesClick(event, id)} size="small">Checkout
                                Grades</Button>
                        </Typography>
                        }
                    </div>}
                </Container>
            </ThemeProvider>
        ))
    );
}
