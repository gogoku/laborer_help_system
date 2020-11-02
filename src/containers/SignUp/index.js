import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { setToken, signUpApi } from "../../utils/api";
import { capitalize } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

let signupErrorMessage = "";

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userCookies, setUserCookie] = useCookies(["user"]);
  const [singupFailed, setSignUpStatus] = useState(false);
  const [signUpLoader, setSignUpLoader] = useState(false);

  const handleCloseAlert = () => {
    setSignUpStatus(false);
  };

  const signUpUser = async (ev) => {
    ev.preventDefault();
    setSignUpLoader(true);
    try {
      const res = await signUpApi({
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      });
      if (res && res.data.statusCode === 201) {
        setUserCookie("user", res.data.data, { path: "/" });
        setToken(res.data.data.jwt);
        history.push("/");
      } else {
        signupErrorMessage = "Signup failed!, Please try again";
        setSignUpStatus(true);
      }
      setSignUpLoader(false);
    } catch (err) {
      if (err && err.response) {
        signupErrorMessage = err.response.data.message;
      } else {
        signupErrorMessage = "Signup failed!, Please try again";
      }
      setSignUpStatus(true);
      setSignUpLoader(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LHS
        </Typography>
        <form className={classes.form} onSubmit={signUpUser}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(ev) => {
                  setFirstName(ev.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(ev) => {
                  setLastName(ev.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(ev) => {
                  setEmail(ev.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(ev) => {
                  setPassword(ev.target.value);
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="projectId"
                label="Project Id"
                type="text"
                id="projectId"
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={signUpLoader}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={singupFailed}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseAlert} severity="error">
            {capitalize(signupErrorMessage)}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}
