import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { loginApi, setToken } from "../../utils/api";
import { capitalize } from "@material-ui/core";

let signinErrorMessage = "";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCookies, setUserCookie] = useCookies(["user"]);
  const [singinFailed, setSignInStatus] = useState(false);
  const [signInLoader, setSignInLoader] = useState(false);

  const handleCloseAlert = () => {
    setSignInStatus(false);
  };

  const loginUser = async (ev) => {
    ev.preventDefault();
    setSignInLoader(true);
    try {
      const res = await loginApi({
        email,
        password,
      });
      if (res && res.data.statusCode === 200) {
        setUserCookie("user", res.data.data, { path: "/" });
        setToken(res.data.data.jwt);
        history.push("/");
      } else {
        signinErrorMessage = "Signin failed!, Please try again";
        setSignInStatus(true);
      }
      setSignInLoader(false);
    } catch (err) {
      if (err && err.response) {
        signinErrorMessage = err.response.data.message;
      } else {
        signinErrorMessage = "Signin failed!, Please try again";
      }
      setSignInStatus(true);
      setSignInLoader(false);
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
        <form className={classes.form} onSubmit={loginUser}>
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
            onChange={(ev) => {
              setEmail(ev.target.value);
            }}
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
            onChange={(ev) => {
              setPassword(ev.target.value);
            }}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={signInLoader}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={singinFailed}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseAlert} severity="error">
            {capitalize(signinErrorMessage)}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}
