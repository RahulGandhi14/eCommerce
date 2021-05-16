import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    TextField,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Instance } from '../../axios'
import { userDetailRequests } from '../../request'
import { isAuthenticated } from '../auth/AuthHelpers'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import Loader from '../Loader'
import { resError } from '../util'
import classNames from 'classnames'
import { deliveryAddress } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { useStyles } from '../NavigationBar/NavBar'

const Addresses = ({ displayFor = '' }) => {
    const user = isAuthenticated()
    const dispatch = useDispatch()
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [listOfAddresses, setListOfAddresses] = useState([])
    const [address, setAddress] = useState({
        name: '',
        mobileNumber: '',
        pinCode: '',
        town: '',
        address: '',
        city: '',
        state: '',
        default: false,
    })
    const [addressOfDelivery, setAddressOfDelivery] = useState('')

    useEffect(() => {
        getAllAddresses()
    }, [])

    const clearInputs = () => {
        setAddress({
            ...address,
            name: '',
            mobileNumber: '',
            pinCode: '',
            town: '',
            address: '',
            city: '',
            state: '',
            default: false,
        })
    }

    const handleChangeAddress = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value,
        })
    }

    const getAllAddresses = async () => {
        setIsLoading(true)
        let result = await Instance.get(`${userDetailRequests.address}`, {
            headers: {
                Authorization: user.token,
            },
        }).catch((error) => {
            if (error.response) {
                setIsLoading(false)
                resError(error)
            }
        })

        if (result && result.data) {
            for (let i = 0; i < result.data.data.length; i++) {
                if (result.data.data[i].default) {
                    setAddressOfDelivery(result.data.data[i]._id)
                }
            }
            setListOfAddresses(result.data.data)
        }
        setIsLoading(false)
    }

    const addAddress = async () => {
        let result = await Instance.post(
            userDetailRequests.address,
            {
                ...address,
                userID: user._id,
            },
            {
                headers: {
                    Authorization: user.token,
                },
            }
        ).catch((error) => {
            if (error.response) {
                resError(error)
            }
        })

        if (result && result.data) {
            setListOfAddresses([...result.data.data])
            clearInputs()
            setOpen(false)
        }
    }

    const deleteAddress = async (addressId) => {
        let result = await Instance.delete(
            `${userDetailRequests.address}/${addressId}`,
            {
                headers: {
                    Authorization: user.token,
                },
            }
        ).catch((error) => {
            if (error.response) {
                resError(error)
            }
        })

        if (result && result.data) {
            setListOfAddresses([...result.data.data])
        }
    }

    const selectDeliverAddress = (addressId) => {
        dispatch(deliveryAddress(addressId))
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div
                        className={classNames(
                            'justifiedFlex alignCenter alignNormal',
                            {
                                mb20: displayFor === 'cart',
                            }
                        )}
                    >
                        <h4>
                            {displayFor === 'cart'
                                ? 'Delivery Address'
                                : 'Saved Addresses'}
                        </h4>
                        <Button
                            variant="outlined"
                            onClick={() => setOpen(true)}
                        >
                            + Add New Address
                        </Button>
                    </div>
                    {listOfAddresses.map((address, index) => (
                        <>
                            <>
                                {address.default &&
                                    displayFor === 'account' && (
                                        <h6>Default Address</h6>
                                    )}
                                <div
                                    id={index + 'address'}
                                    className={classNames('address-card mb20', {
                                        cursorPointer: displayFor === 'cart',
                                    })}
                                    style={{ width: '100%' }}
                                    onClick={() =>
                                        setAddressOfDelivery(address._id)
                                    }
                                >
                                    <Box p={2} className="relative border">
                                        {displayFor === 'account' ? (
                                            <DeleteOutlineIcon
                                                className="absolute trashIcon cursorPointer"
                                                onClick={() =>
                                                    deleteAddress(address._id)
                                                }
                                            />
                                        ) : null}

                                        {displayFor === 'account' ? (
                                            <>
                                                <p>
                                                    <strong>
                                                        {address.name}
                                                    </strong>
                                                </p>
                                                <p>{address.address}</p>
                                                <p>{address.town}</p>
                                                <p>
                                                    {address.city} -{' '}
                                                    {address.pinCode}
                                                </p>
                                                <p>{address.state}</p>
                                                <p>
                                                    Mobile Number:{' '}
                                                    {address.mobileNumber}
                                                </p>
                                            </>
                                        ) : displayFor === 'cart' ? (
                                            <>
                                                <p>
                                                    <strong>
                                                        {address.name} -{' '}
                                                        {address.mobileNumber}
                                                    </strong>
                                                </p>
                                                <p className="fontSize14 mb8">
                                                    {address.address},&nbsp;
                                                    {address.town},&nbsp;
                                                    {address.city},&nbsp;
                                                    {address.state} -{' '}
                                                    {address.pinCode}
                                                </p>
                                                {addressOfDelivery ===
                                                    address._id && (
                                                    <Button
                                                        variant="contained"
                                                        className={`${classes.btnStyle}`}
                                                        onClick={() =>
                                                            selectDeliverAddress(
                                                                address._id
                                                            )
                                                        }
                                                    >
                                                        Deliver Here
                                                    </Button>
                                                )}
                                            </>
                                        ) : null}
                                    </Box>
                                </div>
                            </>
                        </>
                    ))}
                </>
            )}

            <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
                <DialogTitle className="bottomBorder">
                    Add New Address
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        value={address.name}
                        onChange={handleChangeAddress}
                        name="name"
                        fullWidth
                        label="Name"
                    />
                    <TextField
                        type="number"
                        margin="normal"
                        value={address.mobileNumber}
                        onChange={handleChangeAddress}
                        name="mobileNumber"
                        fullWidth
                        label="Mobile Number"
                    />
                    <Grid container direction="row" justify="space-between">
                        <Grid item xs={5}>
                            <TextField
                                margin="normal"
                                value={address.pinCode}
                                onChange={handleChangeAddress}
                                name="pinCode"
                                fullWidth
                                label="Pincode"
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                margin="normal"
                                value={address.town}
                                onChange={handleChangeAddress}
                                name="town"
                                fullWidth
                                label="Town"
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="normal"
                        value={address.address}
                        onChange={handleChangeAddress}
                        name="address"
                        fullWidth
                        label="Address"
                    />
                    <TextField
                        margin="normal"
                        value={address.city}
                        onChange={handleChangeAddress}
                        name="city"
                        fullWidth
                        label="City"
                    />
                    <TextField
                        margin="normal"
                        value={address.state}
                        onChange={handleChangeAddress}
                        name="state"
                        fullWidth
                        label="State"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={address.default}
                                onChange={() =>
                                    setAddress({
                                        ...address,
                                        default: !address.default,
                                    })
                                }
                                color="primary"
                            />
                        }
                        label="Make this as my default address"
                    />
                </DialogContent>
                <div className="displayFlex">
                    <Button
                        onClick={() => setOpen(false)}
                        className="borderRadiusNone cancelBtn"
                        variant="contained"
                        fullWidth
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={addAddress}
                        className="borderRadiusNone"
                        variant="contained"
                        fullWidth
                    >
                        Save
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default Addresses
