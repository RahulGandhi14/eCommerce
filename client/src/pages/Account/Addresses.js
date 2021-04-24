import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Instance } from '../../axios';
import { userDetailRequests } from '../../request';
import { isAuthenticated } from '../auth/AuthHelpers';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const Addresses = () => {

    const user = isAuthenticated();
    const [open, setOpen] = useState(false);
    const [listOfAddresses, setListOfAddresses] = useState([]);
    const [address, setAddress] = useState({
        name: '',
        mobileNumber: '',
        pinCode: '',
        town: '',
        address: '',
        city: '',
        state: '',
        default: false,
    });

    useEffect(() => {
        getAllAddresses();
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
            [e.target.name]: e.target.value
        })
    }

    const getAllAddresses = async () => {
        let result = await Instance.get(`${userDetailRequests.address}`,{
            headers: {
                "Authorization": user.token,
            }
        }).catch(error => {
            if(error.response){
                console.log("--->Error",error)
            }
        })

        if(result && result.data){
            setListOfAddresses(result.data.data);
        }
    }

    const addAddress = async () => {
        let result = await Instance.post(userDetailRequests.address, {
            ...address,
            userID: user._id,
        }).catch(error => {
            if(error.response){
                toast.error(error.response.data.error.message);
            }
        });
        
        if(result && result.data) {
            setListOfAddresses([...result.data.data]);
            clearInputs();
            setOpen(false);
        }
    }

    const deleteAddress = async (addressId) => {
        let result = await Instance.delete(`${userDetailRequests.address}/${addressId}`,{
            headers: {
                "Authorization": user.token,
            }
        }).catch(error => {
            if(error.response){
                toast.error(error.response.data.error.message);
            }
        });
        
        if(result && result.data) {
            setListOfAddresses([...result.data.data]);
        }
    }

    return (
        <>
            <div className="justifiedFlex">
                <h4>{window.location.hash === '#/checkout/cart' ? 'Delivery Address' : 'Saved Addresses'}</h4>
                {window.location.hash === '#/account/address' && <Button variant="outlined" onClick={()=>setOpen(true)}>+ Add New Address</Button>}
            </div>
            {listOfAddresses.map((address, index)=>(
                <>
                    {(window.location.hash === '#/checkout/cart' && address.default) || window.location.hash === '#/account/address' ? (
                        <>
                            {address.default && window.location.hash === '#/account/address' && <h6>Default Address</h6>}
                            <div id={index+"address"} className="address-card mb20" style={{width:"100%"}}>
                                <Box p={2} className="relative border">
                                    {window.location.hash === '#/account/address' ? 
                                        <DeleteOutlineIcon className="absolute trashIcon cursorPointer" onClick={()=>deleteAddress(address._id)}/> : null
                                    }
                                    <p><strong>{address.name}</strong></p>
                                    <p>{address.address}</p>
                                    <p>{address.town}</p>
                                    <p>{address.city} - {address.pinCode}</p>
                                    <p>{address.state}</p>
                                    <p>Mobile Number: {address.mobileNumber}</p>
                                </Box>
                            </div>
                        </>
                    ) : null}
                </>
            ))}
            <Box mt={3}></Box>

            <Dialog fullWidth open={open} onClose={()=>setOpen(false)}>
                <DialogTitle className="bottomBorder">Add New Address</DialogTitle>
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
                                onChange={()=>setAddress({...address, default: !address.default})}
                                color="primary"
                            />
                        }
                        label="Make this as my default address"
                    />
                </DialogContent>
                <div className="displayFlex">
                    <Button onClick={()=>setOpen(false)} className="borderRadiusNone cancelBtn" variant="contained" fullWidth>Cancel</Button>
                    <Button onClick={addAddress} className="borderRadiusNone" variant="contained" fullWidth>Save</Button>
                </div>
            </Dialog>
        </>
    )
}

export default Addresses
