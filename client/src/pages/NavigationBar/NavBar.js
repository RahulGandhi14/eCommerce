import React from 'react'
import './NavBar.scss'
import cartIcon from '../../assets/Cart-Icon.svg'
import Grid from '@material-ui/core/Grid'
import {
    Badge,
    Button,
    Container,
    createStyles,
    IconButton,
    makeStyles,
    withStyles,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/AuthHelpers'
import { useSelector } from 'react-redux'
import { ToastContainer, Zoom } from 'react-toastify'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconSize: {
            height: '32px',
            width: 'auto',
            cursor: 'pointer',
        },
        btnStyle: {
            textTransform: 'none',
            backgroundColor: '#FF7F2D',
            color: '#1D256E',
            fontWeight: '900',
            paddingLeft: '24px',
            paddingRight: '24px',
        },
    })
)

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            right: 23,
            top: 4,
            padding: '0 4px',
        },
    })
)(Badge)

const NavBar = () => {
    const classes = useStyles()
    const user = isAuthenticated()

    //REDUX states
    const cartProducts = useSelector((state) => state.cart.cartProducts)

    return (
        <Grid className="navBar" container xs={12}>
            <Container style={{ height: '100%' }}>
                <Grid
                    container
                    xs={12}
                    justify="space-between"
                    style={{ height: '100%' }}
                >
                    <Grid
                        item
                        style={{ height: '100%' }}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <h3 style={{ color: 'white', cursor: 'pointer' }}>
                                ECom
                            </h3>
                        </Link>
                    </Grid>
                    <Grid
                        item
                        className="verticalAlign"
                        container
                        justify="space-between"
                        alignItems="center"
                        xs={6}
                        sm={4}
                        md={2}
                    >
                        {/* <input className="formInput" type="text"/> */}
                        <Link to="/checkout/cart">
                            <IconButton aria-label="cart">
                                <StyledBadge
                                    badgeContent={cartProducts?.length}
                                    color="secondary"
                                >
                                    <img
                                        className={classes.iconSize}
                                        src={cartIcon}
                                        alt="cart-icon"
                                    />
                                </StyledBadge>
                            </IconButton>
                        </Link>
                        {user ? (
                            <Link to="/account/profile" className="userName">
                                <span>{user.name}</span>
                            </Link>
                        ) : (
                            <Link to="/auth" style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="contained"
                                    className={classes.btnStyle}
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <ToastContainer
                transition={Zoom}
                autoClose={3000}
                closeButton={true}
                hideProgressBar={true}
                pauseOnHover={true}
            />
        </Grid>
    )
}

export default NavBar
