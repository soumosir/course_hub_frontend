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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import qs from 'qs';
import {Navigate, useNavigate} from "react-router-dom";
import {useState} from "react";
import Home from "../home/home";


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

 function login(request: any){
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(request),
    url:'https://coursehubbackend.herokuapp.com/api/login',
  };
  return axios(options);
}

export default function UserSignIn() {

  const [isSuccessfulLogin, setSuccessfulLogin] = useState<number>(-1)
  const [token,setToken] = useState<string>("");
  const [failedAttempt,setFailedAttempt] = useState<number>(0)
  let navigate = useNavigate()

  const navigateToHome = () => {
    window.location.reload()
    navigate("/")
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      username: data.get('email'),
      password: data.get('password'),
    }).then(r => {
      setSuccessfulLogin(1);
      setFailedAttempt(0)
      setToken(r.data.access_token)
      console.log(r.data.access_token);
      window.localStorage.setItem('courseHubtoken',r.data.access_token)
    }).catch(error => {
      setSuccessfulLogin(0);
      setFailedAttempt(failedAttempt+1)
    });
    console.log({
      username: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={failedAttempt>=3}
            >
              Sign In
            </Button>
            {isSuccessfulLogin == 0 && <div>Wrong credentials</div>}
            {failedAttempt >=3 && <div>User Blocked for 10 hours. Contact CEO - Soumosir Dutta</div>}
            {isSuccessfulLogin == 1 && token != "" && navigateToHome() }
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
