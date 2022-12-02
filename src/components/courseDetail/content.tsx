import * as React from 'react';
import {useLocation} from "react-router-dom";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";
import ReactPlayer from "react-player";

const theme = createTheme();

export default function Content() {
    // const [courseList, setCourseList] = useState([])
    const location = useLocation();
    let content = JSON.parse(localStorage.getItem('content') as string)
    console.log(content);
    return (
            <ThemeProvider theme={theme}>
                <h2>Lecture 1</h2>
                <ReactPlayer url = 'https://www.youtube.com/watch?v=BQwj6A99oVc'/>
                <br/>
                <h2>Lecture 2</h2>
                <ReactPlayer url = 'https://www.youtube.com/watch?v=O753uuutqH8&ab_channel=CrashCourse'/>
            </ThemeProvider>
        )
}
