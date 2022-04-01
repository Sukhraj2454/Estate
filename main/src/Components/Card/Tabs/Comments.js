// React Utils.
import { useState, useEffect } from 'react';

// Other Utils.
import stringAvatar from '../../../Utils/stringAvatar';
import { publishComment } from '../../../Utils/controller';

// Mui Components
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Container, Typography, Box, Tooltip, TextField, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function Comment({ data }) {
    return (
        <Box component='div' sx={{ mb: 1 }}>
            <Tooltip title={data.userName}>
                <Avatar sx={{ fontSize: 20, float: 'right', ml: 0.5, cursor: 'pointer' }} {...stringAvatar(data.userName)} />
            </Tooltip>
            <Typography component='h5' variant='h6'>
                {data.message}
            </Typography>
            <Typography component='span' sx={{ color: 'gray' }}>{data.date}</Typography>
        </Box>
    )
}
function NewComment() {
    const [message, setMessage] = useState('');
    const handleTextChange = (event) => {
        setMessage(event.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        publishComment(message);
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

            <Button sx={{ ml: 1, mt: 1 }} color="success"
                variant="contained"
                disabled={message === ''}
                onSubmit={handleSubmit}
            >
                Publish Comment
            </Button>
        </Box>
    )
}
export default function Comments({ data }) {

    const [comments, setComments] = useState([]);
    useEffect(() => {
        let dt = data.map(comment => <Comment data={comment} />);
        setComments(dt);
    }, data, setComments);

    return (
        <Container sx={{ mt: 2, maxHeight: 480, overflowY: 'scroll' }}>
            <NewComment />
            <Stack
                sx={{ p: 2 }}
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={2}
            >
                {comments}
            </Stack>
        </Container >
    )
}

Comments.defaultProps = {
    data: []
}