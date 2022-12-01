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
import { card, course } from '../interfaces/interface'
import { jsx } from '@emotion/react';
import { useNavigate } from "react-router-dom";

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
// const courseCard = ({data}: any):JSX.Element => (
//     data.map(({courseCode, courseName, courseDescription, active}: card) => (
//         <ThemeProvider theme={theme}>
//             <Container component="main">
//             <CssBaseline />
//                 <Card sx={{ minWidth: 275, m: 5 }}>
//                     <CardContent>
//                         <Typography sx={{ fontSize: 20 }} gutterBottom>
//                             {courseCode}
//                         </Typography>
//                         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                             {courseName}
//                         </Typography>
//                         <Typography variant="body2">
//                             {courseDescription}
//                         </Typography>
//                         </CardContent>
//                     <CardActions>
//                         <Button size="small"
//                             >Go to the course</Button>
//                     </CardActions>
//                 </Card>
//             </Container>
//         </ThemeProvider>
//     ))
// )

// let navigate = useNavigate();
// const handleCourseNavigation = (event: React.MouseEvent<HTMLButtonElement>) => {
//     // Somewhere in your code, e.g. inside a handler:
//     navigate(event.currentTarget.innerText.toLowerCase()); 
//     // setAnchorElNav(null);
//   };


// export default courseCard

export default function courseCard({data}: any) {
    console.log("Course Card")
    console.log(data)
    let navigate = useNavigate();
    const handleCourseClick = function(event: React.MouseEvent<HTMLButtonElement>){
        // Somewhere in your code, e.g. inside a handler:
        // console.log(data.courseCode, data.courseInstructor)
        let courseCode = event.currentTarget.getAttribute("id")
        let filteredData = data.filter((course: { courseCode: string | null; }) => {
            return course.courseCode === courseCode;
          });
        console.log(filteredData)
        navigate("/course/"+courseCode, {state: {id: 1, course: filteredData}}); 
    };
    const handleWishlistClick = function(event: React.MouseEvent<HTMLButtonElement>, isWishlist:boolean){
        // Somewhere in your code, e.g. inside a handler:
        console.log(event.currentTarget.getAttribute("id"), isWishlist)
    };

    return (
        data.map(({name, code, description,  instructor, startTime, endTime, totalSeats}: course) => (
            <ThemeProvider theme={theme}>
                <Container key = {code} component="main">
                <CssBaseline />
                    <Card key = {code} sx={{ minWidth: 275, m: 5 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} gutterBottom>
                                {code} - {name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Instructor: {instructor}
                            </Typography>
                            <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                                Start Date: {startTime}
                            </Typography>
                            <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                                End Date: {endTime}
                            </Typography>
                            <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                                Total Seats: {totalSeats}
                            </Typography>
                            <Typography sx={{ fontSize: 14, mb:1.5 }} color="text.secondary">
                                Remaining Seats: 0
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {description}
                            </Typography>
                            </CardContent>
                        <CardActions>
                            <Button id={code} onClick={event => handleCourseClick(event)} size="small">Go to the course </Button>
                            {/* {isWishlist ? 
                                <Button id={code} onClick={event => handleWishlistClick(event, isWishlist)} size="small">Remove from Wishlist</Button>
                            :
                                <Button id={code} onClick={event => handleWishlistClick(event, isWishlist)} size="small">Add to Wishlist</Button>
                            } */}
                        </CardActions>
                    </Card>
                </Container>
            </ThemeProvider>
        ))
    );

    


}