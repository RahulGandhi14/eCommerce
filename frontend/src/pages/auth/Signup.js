import React from 'react';
import "./auth.css";
import Grid from '@material-ui/core/Grid';
import { createStyles, InputBase, makeStyles, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import signupCart from "../../assets/sign-up-cart.svg"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: "100vh",
        },
        signUpDiv: {
            height: "80vh",
            borderRadius: "20px",
            backgroundColor: "rgba(76,177,255,0.1)",
            paddingLeft: theme.spacing(7),
            paddingRight: theme.spacing(7),
            paddingTop: theme.spacing(9),
            paddingBottom: theme.spacing(9),
        },
        signupCart: {
            width: "276px",
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
            margin: "0"
        },
        heading: {
            fontWeight: "500",
        },
        subHeading: {
            fontWeight: "300",
        }
    })
);

const Signup = () => {
    const classes = useStyles();

    return (
        <div className="mainDiv">
            <Grid className={classes.container} container direction="row" justify="center" alignItems="center">
                <Grid container className={classes.signUpDiv} item xs={10}>
                    <Grid container direction="row" justify="center" alignItems="flex-end" item xs={6}>
                        <Grid item className={classes.heroDiv}>
                            <p className={classes.heroText}>
                                <span className={classes.heading}>Looks like you're <br/> new here!</span><br/>
                                <span className={classes.subHeading}>Sign up to get <br/> started</span>
                            </p>
                            <img className={classes.signupCart} src={signupCart} alt="hero"/>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" item xs={6}>
                        <Grid container item xs={8}>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Signup;
