import * as React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";
import ReactPlayer from "react-player";

const theme = createTheme();

export default function Content() {
    // const [courseList, setCourseList] = useState([])
    const navigate = useNavigate();
    if(localStorage.getItem('courseHubtoken') == null){
        navigate("/signin")
    }
    const arr = ['https://www.youtube.com/watch?v=BQwj6A99oVc','https://www.youtube.com/watch?v=O753uuutqH8&t=10s&ab_channel=CrashCourse','https://www.youtube.com/watch?v=M_GVUj86VaY&list=RDLVO753uuutqH8&index=2&ab_channel=KeepOnCoding']
    return (
            <ThemeProvider theme={theme}>
                <h2>Lecture 1</h2>
                <ReactPlayer url ={arr[0]}/>
            </ThemeProvider>
        )
}
