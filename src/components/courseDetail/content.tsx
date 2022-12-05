import * as React from 'react';
import {useLocation, useParams} from "react-router-dom";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";
import ReactPlayer from "react-player";
import axios from "axios";
import { contentDetail } from '../interfaces/interface';
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { useState } from 'react';

const theme = createTheme();

export default function Content() {
    const params = useParams();
    const [contentDetails, setContentDetails] = useState([])
    const [loading,setLoading] = useState("Loading...");
    const navigate = useNavigate();
    if(localStorage.getItem('courseHubtoken') == null){
        navigate("/signin")
    }
    React.useEffect(() => {
        const options = {
          method: 'GET',
          headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('courseHubtoken')}`
          },
          url: `https://localhost:8443/api/content/`+params.id,
        };
        console.log("PARAMETER ID",params.id)
        axios(options).then((r) => {
          // console.log(r.data);
          if(Object.hasOwn(r.data,"error_message")){
            setLoading(r.data.error_message)
          }
          else{
          setContentDetails([r.data])
          setLoading("Loaded")
          console.log("Content Details")
          console.log(r.data)
          }
        })
      }, []);
    // const [courseList, setCourseList] = useState([])
    // const arr = ['https://www.youtube.com/watch?v=BQwj6A99oVc','https://www.youtube.com/watch?v=O753uuutqH8&t=10s&ab_channel=CrashCourse','https://www.youtube.com/watch?v=M_GVUj86VaY&list=RDLVO753uuutqH8&index=2&ab_channel=KeepOnCoding']
    return (
        <div>
        {loading=="Loaded" ?
        contentDetails.map(({
            id,
            name,
            type,
            url,
            username,
            description
        }: contentDetail) => (
            <ThemeProvider theme={theme}>
                <Container component="main">
                    <CssBaseline/>
                    <Typography variant='h3' m={5} gutterBottom>
                        {name}
                    </Typography>
                    <Typography ml={5} mr={5} sx={{ fontSize: 18 }} color="text.secondary">
                        {description}
                    </Typography>
                    <Box m={5} sx={{ justifyContent: 'center' }}>
                        { type == "video" ?
                        <ReactPlayer width="100%" height={600} url ={url}/>
                        :
                        <object data={url} type="application/pdf" width="100%" height="600">
                            <p>Alternative text - include a link <a href={url}>to the PDF!</a></p>
                        </object>
                        }
                    </Box>
                </Container>
            </ThemeProvider>

        ))

        : 
        <ThemeProvider theme={theme}>
            <Container component="main">
            <CssBaseline/> 
                <Typography m={5} sx={{ fontSize: 18 }} color="text.secondary">
                        {loading}
                </Typography>
            </Container>
        </ThemeProvider> }
        </div>
    );
}
