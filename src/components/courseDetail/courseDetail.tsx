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
import {Input} from "@mui/material";

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
    const [isEdit, setIsEdit] = useState(false);
    const [content, setContent] = useState(null);
    const [exam, setExam] = useState(null);

    if (localStorage.getItem('courseHubtoken') == null) {
        navigate("/signin")
    }
    const [first, setFirst] = useState(false);
    console.log("COURSE DETAILS")
    // getCourseDetail(params.id)
    // getCourseDetail(11);
    function isUserEnrolled(courseCode: string | null | undefined) {
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') as string);
        let filteredData = enrolledCourses.filter((course: { code: string | null; }) => {
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
            url: `https://localhost:8443/api/course/` + params.id,
        };
        console.log("PARAMETER ID", params.id)
        axios(options).then((r) => {
            // console.log(r.data);
            setCourseList([r.data])
            console.log("CourseList")
            console.log(r.data)
            setFirst(true);
            // console.log(courseList)
        })
    }, []);

    function getEnrolledCourses() {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('courseHubtoken')}`
            },
            url: 'https://localhost:8443/api/course/enrolled',
        };
        // console.log(options);
        return axios(options)
    }

    function enrollInCourse(id: any) {
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('courseHubtoken')}`
            },
            data: {courseId: id},
            url: 'https://localhost:8443/api/course/enrolluser',
        };
        // console.log(options);
        axios(options).then((data) => {
            console.log(data)
            getEnrolledCourses().then(r => {
                localStorage.setItem('enrolledCourses', JSON.stringify(r.data));
                window.location.reload();
            })
        }).catch((err) => {
            console.log(err);
        });
    }

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
            // console.log("Exam", e.target.result);
            setExam(e.target.result);
        };
    }

    // function seeContent(id:any) {
    //     // @ts-ignore
    //     localStorage.setItem(`content`,JSON.stringify(courseList.contents));
    //     // @ts-ignore
    //     first && navigate(`/course/${courseList.id}/content`, {state: {id: 1, content: courseList.contents}});
    // }
    const addContentAndExam = (value: boolean, id: number) => {
        const currentCourse = courseList[0];
        const newContent = JSON.parse(content as unknown as string)
        const newExam = JSON.parse(exam as unknown as string)
        let isChanged = false;
        console.log(currentCourse);
        console.log(newContent);
        console.log(newExam);
        if (newContent != null) {
            isChanged = true;
            if (currentCourse.contents === null) {
                currentCourse.contents = newContent;
            } else {
                currentCourse.contents.push(...newContent);
            }
        }
        if (newExam != null) {
            isChanged = true;
            if (currentCourse.exams === null) {
                currentCourse.exams = newExam;
            } else {
                currentCourse.exams.push(...newExam)
            }
        }
        console.log(currentCourse);

        // currentCourse.exams.addAll(newExam);

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('courseHubtoken')}`
            },
            data: currentCourse,
            url: 'https://localhost:8443/api/course',
        };
        setIsEdit(value);
        axios(options).then((r) => {
            console.log("successfull edit")
        })
    }

    const handleGradesClick = function (event: React.MouseEvent<HTMLButtonElement>, id: number) {
        // Somewhere in your code, e.g. inside a handler:
        // console.log(data.courseCode, data.courseInstructor)
        console.log(id);
        navigate("/grades/" + id);
    };
    const handleEditCourse = (value: boolean) => {
        setIsEdit(value);
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
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
                <Container component="main">
                    <CssBaseline/>
                    <Typography variant='h3' m={5} gutterBottom>
                        {code} - {name}
                    </Typography>
                    <Card sx={{minWidth: 275, m: 5}}>
                        <CardContent>
                            <Typography sx={{fontSize: 20}} gutterBottom>
                                {code} - {name}
                            </Typography>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                Instructor: {instructor}
                            </Typography>
                            <Typography sx={{fontSize: 14, mb: 0}} color="text.secondary">
                                Start Date: {startTime.split("T")[0]}
                            </Typography>
                            <Typography sx={{fontSize: 14, mb: 0}} color="text.secondary">
                                End Date: {endTime.split("T")[0]}
                            </Typography>
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
                            <Button id={code} onClick={() => {
                                enrollInCourse(id)
                            }} size="small"
                                    disabled={isUserEnrolled(code)}>{!isUserEnrolled(code) ?
                                <div>Enroll in Course</div> : <div>Already Enrolled in Course</div>}</Button>
                            <Button id={code + 'edit'} onClick={() => {
                                handleEditCourse(true)
                            }} size="small">
                                Add Content/Exam
                            </Button>
                            {/*<Button id={courseCode} onClick={handleCourseClick} size="small">Go to the course </Button>*/}
                            {/*{isWishlist ? */}
                            {/*    <Button id={courseCode} onClick={event => handleWishlistClick(event, isWishlist)} size="small">Remove from Wishlist</Button>*/}
                            {/*:*/}
                            {/*    <Button id={courseCode} onClick={event => handleWishlistClick(event, isWishlist)} size="small">Add to Wishlist</Button>*/}
                            {/*}*/}
                            {/* <Button id={code + 'content'} onClick={seeContent} size="small">See Course Content</Button> */}

                        </CardActions>
                    </Card>
                    {isEdit && <Grid>
                        <Grid item xs={12}>
                            Content - <Input aria-label="Content" key="content" type="file"
                                             onChange={handleContentChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            Exam -<Input aria-label="Exams" key="exam" type="file" onChange={handleExamChange}/>
                        </Grid>
                        <Button id={code + 'edit'} onClick={() => {
                            addContentAndExam(false, id)
                        }} size="small">
                            Submit
                        </Button>
                    </Grid>}
                    {!isEdit && <div>
                        <Typography variant='h4' m={5} gutterBottom>
                            Contents
                        </Typography>
                        {first && <ContentCard data={contents} id={id}/>}
                        <Typography variant='h4' m={5} gutterBottom>
                            Exams
                        </Typography>
                        {first && <ExamCard data={exams}/>}
                        {/* <ExamCard data={exams}/> */}
                        <Typography variant='h4' m={5} gutterBottom>
                            <Button id="grades" onClick={event => handleGradesClick(event, id)} size="small">Checkout
                                Grades</Button>
                        </Typography>
                    </div>}
                </Container>
            </ThemeProvider>
        ))
    );
}
