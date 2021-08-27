import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://bryanamezcua.github.io/" target="_blank">
        Bryan Amezcua | EPC VIP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.epcvip.com/bundles/core/images/affiliate.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  // History State
  let history = useHistory();
  // Email & Password State
  const [email, setEmail] = useState('');
  const [password, setPW] = useState('');
  const [email_helperText, set_email_helperText] = useState('');
  const [pw_helperText, set_pw_helperText] = useState('');
  const [email_error, set_emailError] = useState(false);
  const [pw_error, set_PWError] = useState(false);
  const loginEndpoint = "http://localhost:8000/auth/login";

  //Styles
  const classes = useStyles();

  const validateCredentials = (e) => {
    e.preventDefault();
    let email = get_email();
    let password = get_pw();

    const data = {
        email: email,
        password: password
    };

    fetch(loginEndpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
    })
      .then(response => response.json())
      .then((data) => {
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('token', data.access_token);
        console.log(data)
        if (data.letUserIn === true) {
          history.push('/PaginationUsers')
        } else if (data.status === 401) {
          set_email_helperText('Incorrect email or password');
          set_pw_helperText('Incorrect email or password');
          set_emailError(true);
          set_PWError(true);
        }
      })
      .catch(error => console.log(error));

  };

  const get_email = () => {
    let email = document.querySelector('#email').value;
    if (email === '') {
      set_emailError(true);
      set_email_helperText('Please enter an email');
      setTimeout(() => {
        set_emailError(false);
        set_email_helperText('');
      }, 3000);
    } else {
      setEmail(email);
      return email;
    }
  };

  const get_pw = (e) => {
    let password = document.querySelector('#password').value;
    if (password === '') {
      set_PWError(true);
      set_pw_helperText('Please enter a password');
      setTimeout(() => {
        set_PWError(false);
        set_pw_helperText('');
      }, 3000);
    } else {
      setPW(password);
      return password;
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={get_email}
              helperText={email_helperText}
              error={email_error}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={get_pw}
              helperText={pw_helperText}
              error={pw_error}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={validateCredentials}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item sm>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;