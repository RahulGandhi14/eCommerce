import React, { useState } from 'react';
import "./auth.scss";
import Grid from '@material-ui/core/Grid';
import { Button, createStyles, InputBase, makeStyles, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import signupCart from "../../assets/sign-up-cart.svg"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            minHeight: "100vh",
        },
        signupCart: {
            width: "100%",
            height: "auto"
        },
        formBox: {
            paddingTop: theme.spacing(5)
        },
        heroDiv: {
            width: "276px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        },
        heroText: {
            fontSize: "24px",
            lineHeight: "2.4rem",
            margin: "0",
            color: "white"
        },
        heading: {
            fontWeight: "500",
        },
        subHeading: {
            fontWeight: "300",
        },
        btnHeight: {
            height: "56px",
            borderRadius: "12px",
            backgroundColor: "#FF7F2D",
            color: "#1D256E",
            fontWeight: "900",
            textTransform: "none",
            fontSize: 'large'
        },
        paddingTop: {
            paddingTop: theme.spacing(2)
        }
    })
);

const Signup = () => {
    const classes = useStyles();

    const [signupInputs, setSignupInputs] = useState({
        email: "",
        fullName: "",
        password: ""
    })

    const handleInputChange = (e) => {
        setSignupInputs({
            ...signupInputs,
            [e.target.name]: e.target.value
        })
    }

    const focusLogin = () => {
        let loginForm = document.getElementById('login-div');
        let signupForm = document.getElementById('signup-div');
        loginForm.style.transform = "translateX(0%)";
        signupForm.style.transform = "translateX(110%)";
    }

    const focusSignup = () => {
        let loginForm = document.getElementById('login-div');
        let signupForm = document.getElementById('signup-div');
        loginForm.style.transform = "translateX(-110%)";
        signupForm.style.transform = "translateX(0%)";
    }

    return (
        <div className="mainDiv">
            <Grid className={classes.container} container direction="row" justify="center" alignItems="center">
                <Grid container className="signUpDiv" item xs={10}>
                    <Grid className="hideContent" container direction="row" justify="center" alignItems="flex-end" item xs={6}>
                        <Grid item className={classes.heroDiv}>
                            <p className={classes.heroText}>
                                <span className={classes.heading}>Looks like you're <br/> new here!</span><br/>
                                <span className={classes.subHeading}>Sign up to get <br/> started</span>
                            </p>
                            <img className={classes.signupCart} src={signupCart} alt="hero"/>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" item xs={12} sm={6}>
                        <Grid item md={8} className="main-container">
                            <div className="auth-titles">
                                <h3 className="textWhite" onClick={focusLogin}>Login</h3>
                                <h3 className="textWhite" onClick={focusSignup}>Sign up</h3>
                            </div>
                            <div id="signup-div">
                                <TextField 
                                    variant="filled"
                                    autoComplete="off" 
                                    label="Email" 
                                    className="auth-inputs"
                                    name="email"
                                    value={signupInputs.email} 
                                    onChange={handleInputChange}
                                    fullWidth />
                                <TextField 
                                    variant="filled"
                                    autoComplete="off" 
                                    label="Full Name" 
                                    className="auth-inputs"
                                    name="fullName"
                                    value={signupInputs.fullName} 
                                    onChange={handleInputChange}
                                    fullWidth />
                                <TextField 
                                    variant="filled"
                                    autoComplete="off" 
                                    type="password" 
                                    label="Password" 
                                    className="auth-inputs"
                                    name="password"
                                    value={signupInputs.password} 
                                    onChange={handleInputChange}
                                    fullWidth />
                                <Grid container direction="row" justify="center">
                                    <Button 
                                        variant="contained" 
                                        className={classes.btnHeight}
                                        fullWidth 
                                    >Create Account</Button>
                                    <span className={classes.paddingTop}>Already have an account?</span>
                                </Grid>
                            </div>
                            <div id="login-div">
                                <TextField 
                                    variant="filled"
                                    autoComplete="off" 
                                    label="Email" 
                                    className="auth-inputs"
                                    name="email"
                                    value={signupInputs.email} 
                                    onChange={handleInputChange}
                                    fullWidth />
                                <TextField 
                                    variant="filled"
                                    autoComplete="off" 
                                    type="password" 
                                    label="Password" 
                                    className="auth-inputs"
                                    name="password"
                                    value={signupInputs.password} 
                                    onChange={handleInputChange}
                                    fullWidth />
                                <Grid container direction="row" justify="center">
                                    <Button 
                                        variant="contained" 
                                        className={classes.btnHeight}
                                        fullWidth 
                                    >Login</Button>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Signup;
