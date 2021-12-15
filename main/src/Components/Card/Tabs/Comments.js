// React Utils.
// Other Utils.

// Mui Components
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Container, Typography, Box, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function Comment() {
    return (
        <Box component='div' sx={{ mb: 1 }}>
            <Tooltip title="Sukhraj Singh">
                <Avatar sx={{ fontSize: 20, float: 'right', ml: 0.5, cursor: 'pointer' }}>SS</Avatar>
            </Tooltip>
            <Typography component='h5' variant='h6'>
                Hi thereHi thereHi thereHi thereHi thereHi thereHi thereHi thereHi there
                Hi thereHi thereHi thereHi thereHi thereHi there
            </Typography>
            <Typography component='span' sx={{ color: 'gray' }}>12/15/2021 09:11 am</Typography>
        </Box>
    )
}

export default function Comments() {

    return (
        <Container sx={{ mt: 2, maxHeight: 490, overflowY: 'scroll' }}>
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