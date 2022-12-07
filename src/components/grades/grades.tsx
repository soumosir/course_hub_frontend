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
import { card, content, course, exam, resultContent } from '../interfaces/interface'
import { jsx } from '@emotion/react';
import { useNavigate, useParams } from "react-router-dom";
import { AppService } from "../appService/appService";
import { Alert } from '@mui/material';
import axios from 'axios';
import CorrectAnswerMap from './correctAnswerMap';
import { hostUrl } from '../../App';

function getResult(id:any) {
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json', Authorization : `Bearer ${localStorage.getItem('courseHubtoken')}` },
        url: hostUrl + `/api/courseresult/${id}`,
    };

    console.log(options);
    return axios(options)
}

export default function Grades(): JSX.Element {
    const theme = createTheme();
    let [examList, setExamList] = React.useState([])
    const [loading,setLoading] = React.useState("Loading...")
    const params = useParams();
    const courseId = params.id;
    let navigate = useNavigate();
    const [total,setTotal] = React.useState(0.0);
    const [loader, setLoader] = React.useState(false);
    
    if(localStorage.getItem('courseHubtoken') == null){
        navigate("/signin")
    }
    React.useEffect(() => {
        setLoader(true)
        getResult(courseId).then(r => {
            setLoader(false)
            console.log("results are ", r.data);
            console.log(r.data);
            const t = [0.0];
            r.data.forEach((element :any) => {
                t[0] += element.marks;
                const answers = JSON.parse(element.exam.answers);
                const anMap :any = {}
                Object.keys(answers).forEach((an : any)=>{
                    anMap[an] = {"correct" : answers[an]}
                });
                console.log(anMap);
                const usera = JSON.parse(element.answers);
                console.log(usera);
                Object.keys(usera).forEach((an : any)=>{
                    anMap[an] = {...anMap[an],"answered" : usera[an] }
                })

                element["answerMap"] = anMap;
            });

            const results :any = r.data;
            setExamList(results);
            if(results.length>0){
            t[0] = t[0]/results.length;
            }
            setTotal(t[0])
            setLoading("Loaded");
        }).catch((err) => {
            setLoader(false)
          alert(`Result not found`);
          setLoading("Error occured. Please try again");
          console.log(err);
        })
    }, []);

    const handleCourseClick = function(event: React.MouseEvent<HTMLButtonElement>, id: number){
        // Somewhere in your code, e.g. inside a handler:
        // console.log(data.courseCode, data.courseInstructor)
        console.log(id);
        navigate("/exam/"+id);
    };

    return (
        <><div>
            {loading == "Loaded" ?
                examList.map(({ id, marks, exam, answerMap }: resultContent) => (

                    <ThemeProvider theme={theme}>

                        <Container key={id} component="main">
                            <CssBaseline />
                            <Card key={id} sx={{ m: 5 }}>
                                <CardContent>

                                    <Typography sx={{ fontSize: 20 }} gutterBottom>
                                        {exam.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                                        Type: {exam.type}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                                        Marks %: {marks}
                                    </Typography>
                                    <CorrectAnswerMap data={answerMap} />

                                </CardContent>

                            </Card>

                        </Container>

                    </ThemeProvider>



                ))
                :  
                <Typography m={5} sx={{ fontSize: 18 }} color={loading.length <= 10 ? "text.secondary":"red"}>
                    {loading}
                </Typography>
                }
        </div>
        <Container key="total_marks" component="main">
                            <CssBaseline />
                            <Card key="total_marks" sx={{ m: 5 }}>
                                <CardContent>
        <Button>Total: {total} %</Button>
        </CardContent>

        </Card>

        </Container>


        </>

        )
}
