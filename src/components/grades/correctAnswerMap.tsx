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

export default function CorrectAnswerMap({data} : any): JSX.Element{

    const answerMap = data;
    const ui: any = []
    Object.keys(answerMap).forEach((aM)=>{
        ui.push(
            <React.Fragment>
                <Typography sx={{ fontSize: 14, mb: 0 }} color="text.primary">
                Question: {aM}
            </Typography>                            

            <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary">
                Correct answer: {answerMap[aM]["correct"]} Your answer: {answerMap[aM]["answered"]}
            </Typography>
            </React.Fragment>
               
        )
    })


    return (
        <div>
          {ui}
        </div>
        
    )
     {/* {Object.keys(answerMap).forEach((am)=>{ */}
    {/* //     console.log(am);
    //     console.log(answerMap[am]["correct"]);
    //     <div id= >
            
    //     </div>
        
    // }) */}
    
}
