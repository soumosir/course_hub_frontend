import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Navigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import CourseCard from '../courseCard/courseCard';
import jwt from 'jwt-decode'

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

export default function HomePage(props: any) {

    return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
      <CssBaseline />
      </Container>
    </ThemeProvider>
  );
}
