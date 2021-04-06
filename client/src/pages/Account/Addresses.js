import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const Addresses = () => {

    const [open, setOpen] = useState(false);
    const [listOfAddresses, SetListOfAddresses] = useState([]);
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

    const addAddress = () => {
        setOpen(false);
        SetListOfAddresses([...listOfAddresses, address]);
        clearInputs();
    }

    return (
        <Box p={3}>
            <div className="justifiedFlex">
                <h4>Saved Addresses</h4>
                <Button variant="outlined" onClick={()=>setOpen(true)}>+ Add New Address</Button>
            </div>
            {listOfAddresses.map((address, index)=>(
                <div id={index+"address"} className="cart-item address-card">
                    <Box p={2}>
                        <p><strong>{address.name}</strong></p>
                        <p>{address.address}</p>
                        <p>{address.town}</p>
                        <p>{address.city} - {address.pinCode}</p>
                        <p>{address.state}</p>
                        <p>Mobile Number: {address.mobileNumber}</p>
                    </Box>
                </div>
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
                {console.log("----ALL ADDRESS",listOfAddresses)}
                <div className="displayFlex">
                    <Button onClick={()=>setOpen(false)} className="borderRadiusNone cancelBtn" variant="contained" fullWidth>Cancel</Button>
                    <Button onClick={addAddress} className="borderRadiusNone" variant="contained" fullWidth>Save</Button>
                </div>
            </Dialog>
        </Box>
    )
}

export default Addresses
