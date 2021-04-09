import { Box, Grid, TextField } from '@material-ui/core'
import React from 'react'

const AddEditProduct = () => {
    return (
        <Box p={3}>
            <h4>Add Product</h4>
            <div>
                <Grid container direction="row" justify="space-between">
                    <Grid xs={5}>
                        <TextField 
                            margin="normal"
                            name="name" 
                            fullWidth 
                            label="Brand Name"
                        />
                    </Grid>
                    <Grid xs={5}>
                        <TextField 
                            margin="normal"
                            name="name" 
                            fullWidth 
                            label="Product Name"
                        />
                    </Grid>
                </Grid>
                
                <TextField 
                    margin="normal"
                    name="name" 
                    fullWidth
                    multiline
                    label="Description"
                />
            </div>
        </Box>
    )
}

export default AddEditProduct
