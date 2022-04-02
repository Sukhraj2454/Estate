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
    const d = new Date(data.date);
    return (
        <Box component='div' sx={{ mb: 1 }}>
            <Tooltip title={data.userName}>
                <Avatar sx={{ fontSize: 20, float: 'right', ml: 0.5, cursor: 'pointer' }} {...stringAvatar(data.userName)} />
            </Tooltip>
            <Typography component='h5' variant='h6'>
                {data.message}
            </Typography>
            <Typography component='span' sx={{ color: 'gray' }}>{d.toDateString()} {d.toTimeString()}</Typography>
        </Box>
    )
}
function NewComment({ id, comments, setComments }) {
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [comment, setComment] = useState({});
    useEffect(() => {
        if (Object.keys(comment).length) {
            setComments(prevState => { return [<Comment key={prevState.length} data={comment} />, ...prevState] });
        }
    }, [comment, setComments]);
    const handleTextChange = (event) => {
        setMessage(event.target.value);
    }
    useEffect(() => {
        setDisabled(message === '');
    }, [message]);
    function handleSubmit(e) {
        e.preventDefault();
        setMessage('');
        publishComment(message, id, setComment);
    }
    return (
        <Box component='div' sx={{ mb: 1, mt: 2 }}>
            <TextField
                onChange={handleTextChange}
                sx={{ p: 1, width: '100%' }}
                label="Comment"
                value={message}
                multiline
                rows={4}
            />

            <Button sx={{ ml: 1, mt: 1 }} color="success"
                variant="contained"
                disabled={disabled}
                onClick={handleSubmit}
            >
                Publish Comment
            </Button>
        </Box>
    )
}
export default function Comments({ data, id }) {

    const [comments, setComments] = useState([]);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        let ind = 0;
        let dt = data.map(comment => <Comment key={ind++} data={comment} />);
        setComments(dt);
    }, [data, setComments]);
    return (
        <Container sx={{ mt: 2, maxHeight: 480, overflowY: 'scroll' }}>

            <NewComment
                success={success}
                setSuccess={setSuccess}
                comments={comments}
                setComments={setComments}
                id={id} />

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