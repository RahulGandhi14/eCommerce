import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';

const Loader = () => {
    return (
        <Box py={10} className="w100 text-center">
            <CircularProgress />
        </Box>
    )
}

export default Loader
