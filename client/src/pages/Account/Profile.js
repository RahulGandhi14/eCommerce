import { Box, Grid } from '@material-ui/core'
import React from 'react'

const Profile = () => {
    return (
        <div className="detailSection">
            <h4 className="mb10">Profile Details</h4>
            <Grid container>
                <Grid container item lg={12} className="mb10">
                    <Grid item lg={3}>
                        <p>Full Name</p>
                    </Grid>
                    <Grid item lg={9}>
                        <p>Rahul Gandhi</p>
                    </Grid>
                </Grid>
                <Grid container item lg={12} className="mb10">
                    <Grid item lg={3}>
                        <p>Email</p>
                    </Grid>
                    <Grid item lg={9}>
                        <p>rahul@yopmail.com</p>
                    </Grid>
                </Grid>
                <Grid container item lg={12} className="mb10">
                    <Grid item lg={3}>
                        <p>Mobile Number</p>
                    </Grid>
                    <Grid item lg={9}>
                        <p>- not added -</p>
                    </Grid>
                </Grid>
                <Grid container item lg={12} className="mb10">
                    <Grid item lg={3}>
                        <p>Gender</p>
                    </Grid>
                    <Grid item lg={9}>
                        <p>- not added -</p>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile