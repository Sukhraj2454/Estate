// React Utils.\
import { useState } from 'react';

// Other Utils.
import stringAvatar from '../../../Utils/stringAvatar';
// Mui Components
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Container, Typography, Box, Tooltip, TextField, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function Comment() {
    return (
        <Box component='div' sx={{ mb: 1 }}>
            <Tooltip title="Sukhraj Singh">
                <Avatar sx={{ fontSize: 20, float: 'right', ml: 0.5, cursor: 'pointer' }} {...stringAvatar('Sukhraj Singh')} />
            </Tooltip>
            <Typography component='h5' variant='h6'>
                Hi thereHi thereHi thereHi thereHi thereHi thereHi thereHi thereHi there
                Hi thereHi thereHi thereHi thereHi thereHi there
            </Typography>
            <Typography component='span' sx={{ color: 'gray' }}>12/15/2021 09:11 am</Typography>
        </Box>
    )
}
function NewComment() {
    const [disable, setDisable] = useState(true);
    const handleTextChange = () => {
        setDisable(false);
    }
    return (
        <Box component='div' sx={{ mb: 1, mt: 2 }}>
            <TextField
                onChange={handleTextChange}
                sx={{ p: 1, width: '100%' }}
                label="Comment"
                multiline
                rows={4}
            />

            <Button sx={{ ml: 1, mt: 1 }} color="success" variant="contained" disabled={disable} >Publish Comment</Button>
        </Box>
    )
}
export default function Comments() {

    return (
        <Container sx={{ mt: 2, maxHeight: 480, overflowY: 'scroll' }}>
            <NewComment />
            <Stack
                sx={{ p: 2 }}
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={2}
            >
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </Stack>
        </Container >
    )
}