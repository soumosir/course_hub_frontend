import * as React from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";
import ReactPlayer from "react-player";
import axios from "axios";
import { contentDetail } from '../interfaces/interface';
import { Backdrop, Box, CircularProgress, Container, CssBaseline, Typography } from '@mui/material';
import { useState } from 'react';
import { hostUrl } from '../../App';

const theme = createTheme();

export default function Loader() {
     return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
