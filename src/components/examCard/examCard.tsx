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
import { card, content, course, exam } from '../interfaces/interface'
import { jsx } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import { AppService } from "../appService/appService";
import { Alert } from '@mui/material';



export default function ExamCard({data}: any): JSX.Element {
    const theme = createTheme();
    let [examList, setExamList] = React.useState([])
    React.useEffect(() => {
        setExamList(data)
      }, [data]);

      const handleCourseClick = function(event: React.MouseEvent<HTMLButtonElement>, contentId: number){
        // Somewhere in your code, e.g. inside a handler:
        // console.log(data.courseCode, data.courseInstructor)
        console.log(contentId);
        // navigate("/course/"+courseCode, {state: {id: 1, course: filteredData}}); 
    };

    return <>{(
        examList.map(({id, name, type}: content) => (
            <ThemeProvider theme={theme}>
                
                <Container key = {id} component="main">
                <CssBaseline />
                    <Card key = {id} sx={{ m:5 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} gutterBottom>
                                {name}
                            </Typography>
                            <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                               Type: {type}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button id={name} onClick={event => handleCourseClick(event, id)} size="small">Go to the {name} </Button>
                        </CardActions>
                    </Card>
                </Container>
            </ThemeProvider>
        ))
    )}</>
}