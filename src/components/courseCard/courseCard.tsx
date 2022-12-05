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
import { AppService } from "../appService/appService";
import { Alert, Snackbar } from '@mui/material';

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
export default function courseCard({data}: any): JSX.Element {

    let navigate = useNavigate();
    let appService = new AppService();
    let isWishlist = data[1]
    let isHome = data[2]
    let initialData = data[0]

    let [courseList, setCourseList] = React.useState([])
    React.useEffect(() => {
        setCourseList(data[0])
      }, [initialData]);

      let [wishlistCourses, setWishlistCourses] = React.useState([])
        React.useEffect(() => {
        setWishlistCourses(JSON.parse(localStorage.getItem('wishlist') as string))
      }, []);
    

    const [isUnuccessfulWishlistAddition, setUnsuccessfulWishlistAddition] = React.useState<boolean>(false)
    const [isUnuccessfulWishlistDeletion, setUnsuccessfulWishlistDeletion] = React.useState<boolean>(false)

    const handleCourseClick = function(event: React.MouseEvent<HTMLButtonElement>, courseId: number){
        let courseCode = event.currentTarget.getAttribute("id")
        let filteredData = courseList.filter((course: { code: string | null; }) => {
            return course.code === courseCode;
          });
        navigate("/course/"+courseId);
    };

    const handleAddWishlistClick = function(event: React.MouseEvent<HTMLButtonElement>, courseId: number){
        
        const request = {
            "wishlistId": courseId
        }

        appService.addToWishlist(request).then(r => {
            
            let wishlistCourses = JSON.parse(localStorage.getItem('wishlist') as string)
            let addedCourse = courseList.filter((course: course) => {
                return course.id == courseId;
            });

            wishlistCourses.push(addedCourse[0])
            localStorage.setItem('wishlist',JSON.stringify(wishlistCourses))
            
            setWishlistCourses(wishlistCourses)

          }).catch(error => {
            setUnsuccessfulWishlistAddition(true)
          });
    };

    const handleRemoveWishlistClick = function(event: React.MouseEvent<HTMLButtonElement>, courseId: number){
        const request = {
            "wishlistId": courseId
        }

        appService.removeFromWishlist(request).then(r => {
            
            let filteredCourseList = courseList.filter((course: course) => {
                return course.id != courseId;
            });
            setCourseList(filteredCourseList)
            localStorage.setItem('wishlist',JSON.stringify(filteredCourseList))

        }).catch(error => {
            setUnsuccessfulWishlistDeletion(true)
        });
    };

    const handleCloseAddWishlist = function(){
        setUnsuccessfulWishlistAddition(false)
    }

    const handleCloseRemoveWishlist = function(){
        setUnsuccessfulWishlistDeletion(false)
    }

    return <>{(
        <div>
            { }
             { <Container component="main">
                <Snackbar open= {isUnuccessfulWishlistAddition} onClose={handleCloseAddWishlist} autoHideDuration={4000} >
                    <Alert severity="error">Unable to add course into wishlist! Please try again later.</Alert>
                </Snackbar>
                <Snackbar open= {isUnuccessfulWishlistDeletion} onClose={handleCloseRemoveWishlist} autoHideDuration={4000} >
                    <Alert severity="error">Unable to delete course from wishlist! Please try again later.</Alert>
                </Snackbar>
             </Container> }
            { courseList.map(({id, name, code, description,  instructor, startTime, endTime, totalSeats, remainingSeats}: course) => (
            <ThemeProvider theme={theme}>

                <Container key = {id} component="main">
                <CssBaseline />
                    <Card key = {id} sx={{ minWidth: 275, m: 5 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 20 }} gutterBottom>
                                {code} - {name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Instructor: {instructor}
                            </Typography>
                            <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                                Start Date: {startTime.split("T")[0]}
                            </Typography>
                            <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                                End Date: {endTime.split("T")[0]}
                            </Typography>
                            <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                                Total Seats: {totalSeats}
                            </Typography>
                            <Typography sx={{ fontSize: 14, mb:1.5 }} color="text.secondary">
                                Remaining Seats: {remainingSeats}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {description}
                            </Typography>
                            </CardContent>
                        <CardActions>
                            <Button id={code} onClick={event => handleCourseClick(event, id)} size="small">Go to the course </Button>
                            {isHome == false ?
                            isWishlist ?
                                <Button id={code} onClick={event => handleRemoveWishlistClick(event, id)} size="small">Remove from Wishlist</Button>
                            :
                            wishlistCourses.findIndex((e: course) => e.code === code) === -1 ?
                                <Button id={code} onClick={event => handleAddWishlistClick(event, id)} size="small">Add to Wishlist</Button>
                            :
                                <Button id={code} disabled={true} size="small">Already in Wishlist</Button>
                            :""}
                        </CardActions>
                    </Card>
                </Container>
            </ThemeProvider>
        ))}
        </div>

        
    )}</>
}

