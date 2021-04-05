import { Box, Button } from '@material-ui/core'
import React from 'react'

const Addresses = () => {
    return (
        <Box p={3}>
            <div className="justifiedFlex">
                <h4>Saved Addresses</h4>
                <Button variant="outlined">+ Add New Address</Button>
            </div>
            <div className="cart-item">Hello</div>
            <Box mt={3}></Box>
        </Box>
    )
}

export default Addresses
