// React Utils.
import { useState } from 'react';

// Mui Components
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Box } from "@mui/system";
import { Container, Typography, Button } from '@mui/material';



export default function Comments() {

    return (
        <Container component={'main'} sx={{ mt: 2 }}>
            <Stack
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={2}
            >
                <Typography component='h1' variant='h6'>
                    Hi there
                </Typography>
                <Typography component='h1' variant='h6'>
                    Hi there
                </Typography>
                <Typography component='h1' variant='h6'>
                    Hi there
                </Typography>
                <Typography component='h1' variant='h6'>
                    Hi there
                </Typography>
                <Typography component='h1' variant='h6'>
                    Hi there
                </Typography>
                <Typography component='h1' variant='h6'>
                    Hi there
                </Typography>
            </Stack>
        </Container >
    )
}