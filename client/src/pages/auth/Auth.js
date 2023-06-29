import React, { useEffect, useState } from 'react'
import './auth.scss'
import Grid from '@material-ui/core/Grid'
import { Button, createStyles, makeStyles, TextField } from '@material-ui/core'
import signupCart from '../../assets/sign-up-cart.svg'
import CheckIcon from '@material-ui/icons/Check'
import { Instance } from '../../axios'
import { authRequests } from '../../request'
import CryptoJS from 'crypto-js'
import dotEnv from 'dotenv'
import { useHistory } from 'react-router'
import { ToastContainer, Zoom } from 'react-toastify'
import { isAuthenticated } from './AuthHelpers'
import { resError } from '../util'

dotEnv.config()

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            minHeight: '100vh',
        },
        signupCart: {
            width: '100%',
            height: 'auto',
        },
        formBox: {
            paddingTop: theme.spacing(5),
        },
        heroDiv: {
            width: '276px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        heroText: {
            fontSize: '24px',
            lineHeight: '2.4rem',
            margin: '0',
            color: 'white',
        },
        heading: {
            fontWeight: '500',
        },
        subHeading: {
            fontWeight: '300',
        },
        btnHeight: {
            height: '56px',
            borderRadius: '12px',
            backgroundColor: '#FF7F2D',
            color: '#1D256E',
            fontWeight: '900',
            textTransform: 'none',
            fontSize: 'large',
        },
        paddingTop: {
            paddingTop: theme.spacing(2),
        },
    })
)

const Auth = () => {
    const classes = useStyles()
    const history = useHistory()
    const user = isAuthenticated()

    const [currentTab, setCurrentTab] = useState('signup')
    const [signupInputs, setSignupInputs] = useState({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
    })
    const [validInputs, setValidInputs] = useState({
        isEmailValid: false,
        isFullNameValid: false,
        isPasswordValid: false,
        isConfirmPasswordValid: false,
        valid: false,
    })
    const [loading, setLoading] = useState(false)

    const clearStates = () => {
        setSignupInputs({
            ...signupInputs,
            email: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        })

        setValidInputs({
            ...validInputs,
            isEmailValid: false,
            isFullNameValid: false,
            isPasswordValid: false,
            isConfirmPasswordValid: false,
            valid: false,
        })

        setLoading(false)
    }

    useEffect(() => {
        if (user) history.goBack('/')
    }, [])

    useEffect(() => {
        clearStates()
    }, [currentTab])

    useEffect(() => {
        validateInputs()
    }, [signupInputs])

    const validateInputs = () => {
        let { email, fullName, password, confirmPassword } = signupInputs
        let validEmail, validName, validPassword, validConfirmPassword, allValid

        if (email) {
            const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (re.test(email)) validEmail = true
        }

        if (password && password.length >= 3) validPassword = true

        if (validEmail && validPassword) allValid = true

        if (currentTab === 'signup') {
            allValid = false

            if (fullName) validName = true

            if (validPassword && password === confirmPassword)
                validConfirmPassword = true

            if (
                validEmail &&
                validName &&
                validPassword &&
                validConfirmPassword
            )
                allValid = true
        }

        setValidInputs({
            ...validInputs,
            isEmailValid: validEmail ? validEmail : false,
            isFullNameValid: validName ? validName : false,
            isPasswordValid: validPassword ? validPassword : false,
            isConfirmPasswordValid: validConfirmPassword
                ? validConfirmPassword
                : false,
            valid: allValid ? allValid : false,
        })
    }

    const handleInputChange = (e) => {
        setSignupInputs({
            ...signupInputs,
            [e.target.name]: e.target.value,
        })
    }

    const focusLogin = () => {
        setCurrentTab('login')
        let loginForm = document.getElementById('login-div')
        let signupForm = document.getElementById('signup-div')
        let loginTitle = document.getElementById('logIn')
        let signInTitle = document.getElementById('signIn')
        loginForm.style.transform = 'translateX(0%)'
        signupForm.style.transform = 'translateX(110%)'
        loginTitle.style.opacity = '1'
        signInTitle.style.opacity = '0.5'
    }

    const focusSignup = () => {
        setCurrentTab('signup')
        let loginForm = document.getElementById('login-div')
        let signupForm = document.getElementById('signup-div')
        let loginTitle = document.getElementById('logIn')
        let signInTitle = document.getElementById('signIn')
        loginForm.style.transform = 'translateX(-110%)'
        signupForm.style.transform = 'translateX(0%)'
        signInTitle.style.opacity = '1'
        loginTitle.style.opacity = '0.5'
    }

    const registerUser = async () => {
        if (validInputs.valid) {
            setLoading(true)
            let encryptedPassword = CryptoJS.AES.encrypt(
                signupInputs.password,
                process.env.REACT_APP_SECRET
            ).toString()
            let result = await Instance.post(authRequests.register, {
                email: signupInputs.email,
                name: signupInputs.fullName,
                password: encryptedPassword,
            }).catch((error) => {
                if (error.response) {
                    setLoading(false)
                    resError(error)
                }
            })
            if (result && result.data) {
                clearStates()
                focusLogin()
            }
        }
    }

    const loginUser = async () => {
        if (validInputs.valid) {
            setLoading(true)
            let encryptedPassword = CryptoJS.AES.encrypt(
                signupInputs.password,
                process.env.REACT_APP_PASS_SECRET
            ).toString()
            let result = await Instance.post(authRequests.loginUser, {
                email: signupInputs.email,
                password: encryptedPassword,
            }).catch((error) => {
                if (error.response) {
                    setLoading(false)
                    resError(error)
                }
            })
            if (result && result.data) {
                clearStates()
                localStorage.setItem('user', JSON.stringify(result.data.data))
                if (history.action === 'PUSH') {
                    history.goBack()
                } else {
                    history.push('/')
                }
            }
        }
    }

    return (
        <div className="mainDiv">
            <Grid
                className={classes.container}
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid container className="signUpDiv" item xs={10}>
                    <Grid
                        className="hideContent"
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-end"
                        item
                        xs={6}
                    >
                        <Grid item className={classes.heroDiv}>
                            <p className={classes.heroText}>
                                <span className={classes.heading}>
                                    Looks like you're <br /> new here!
                                </span>
                                <br />
                                <span className={classes.subHeading}>
                                    Sign up to get <br /> started
                                </span>
                            </p>
                            <img
                                className={classes.signupCart}
                                src={signupCart}
                                alt="hero"
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        item
                        xs={12}
                        sm={6}
                    >
                        <Grid item md={8} className="main-container">
                            <div className="auth-titles">
                                <h3
                                    id="logIn"
                                    className="textWhite"
                                    onClick={focusLogin}
                                >
                                    Login
                                </h3>
                                <h3
                                    id="signIn"
                                    className="textWhite"
                                    onClick={focusSignup}
                                >
                                    Sign up
                                </h3>
                            </div>
                            <div id="signup-div">
                                <div className="relative mb14">
                                    <TextField
                                        variant="filled"
                                        autoComplete="off"
                                        label="Email"
                                        className="auth-inputs"
                                        name="email"
                                        value={signupInputs.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <CheckIcon
                                        className={`checkIcon ${
                                            validInputs.isEmailValid
                                                ? 'displayContent'
                                                : 'displayNone'
                                        }`}
                                    />
                                </div>
                                <div className="relative mb14">
                                    <TextField
                                        variant="filled"
                                        autoComplete="off"
                                        label="Full Name"
                                        className="auth-inputs"
                                        name="fullName"
                                        value={signupInputs.fullName}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <CheckIcon
                                        className={`checkIcon ${
                                            validInputs.isFullNameValid
                                                ? 'displayContent'
                                                : 'displayNone'
                                        }`}
                                    />
                                </div>
                                <div className="relative mb14">
                                    <TextField
                                        variant="filled"
                                        autoComplete="off"
                                        type="password"
                                        label="Password"
                                        className="auth-inputs"
                                        name="password"
                                        value={signupInputs.password}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <CheckIcon
                                        className={`checkIcon ${
                                            validInputs.isPasswordValid
                                                ? 'displayContent'
                                                : 'displayNone'
                                        }`}
                                    />
                                </div>
                                <div className="relative mb14">
                                    <TextField
                                        variant="filled"
                                        autoComplete="off"
                                        type="password"
                                        label="Confirm Password"
                                        className="auth-inputs"
                                        name="confirmPassword"
                                        value={signupInputs.confirmPassword}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <CheckIcon
                                        className={`checkIcon ${
                                            validInputs.isConfirmPasswordValid
                                                ? 'displayContent'
                                                : 'displayNone'
                                        }`}
                                    />
                                </div>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                >
                                    <Button
                                        variant="contained"
                                        className={classes.btnHeight}
                                        fullWidth
                                        disabled={loading}
                                        onClick={registerUser}
                                    >
                                        Create Account
                                    </Button>
                                </Grid>
                            </div>
                            <div id="login-div">
                                <div className="relative mb14">
                                    <TextField
                                        variant="filled"
                                        autoComplete="off"
                                        label="Email"
                                        className="auth-inputs"
                                        name="email"
                                        value={signupInputs.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <CheckIcon
                                        className={`checkIcon ${
                                            validInputs.isEmailValid
                                                ? 'displayContent'
                                                : 'displayNone'
                                        }`}
                                    />
                                </div>
                                <div className="relative mb14">
                                    <TextField
                                        variant="filled"
                                        autoComplete="off"
                                        type="password"
                                        label="Password"
                                        className="auth-inputs"
                                        name="password"
                                        value={signupInputs.password}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                    <CheckIcon
                                        className={`checkIcon ${
                                            validInputs.isPasswordValid
                                                ? 'displayContent'
                                                : 'displayNone'
                                        }`}
                                    />
                                </div>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                >
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        disabled={loading}
                                        className={classes.btnHeight}
                                        onClick={loginUser}
                                    >
                                        Login
                                    </Button>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ToastContainer
                transition={Zoom}
                autoClose={3000}
                closeButton={true}
                hideProgressBar={true}
                pauseOnHover={true}
            />
        </div>
    )
}

export default Auth
