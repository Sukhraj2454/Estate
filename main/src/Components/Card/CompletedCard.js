// React Utils.
import { useState, useEffect } from 'react';

// Othe Utils
import { submitReview } from '../../Utils/controller';

// MUI Components
import { Typography, TextField, Button } from '@mui/material';
import { Grid, Rating } from '@mui/material';
import { Container } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function CompletedCard({ theme, clr, data, refresh, setRefresh }) {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        if (value !== 0) {
            setOpen(true);
        }
    },
        [value]);
    const handleDialogClose = () => {
        setOpen(false);
    };
    const handleReviewSubmit = (event) => {
        submitReview(value, data._id, text, setRefresh, refresh);
    }
    return (<Container component={'main'} sx={{ bgcolor: clr }}>
        <Grid container columns={12} >

            <Grid item lg={5} sm={5} xs={5} >
                <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {data.title}
                </Typography>
            </Grid >
            <Grid item lg={3} sm={3} xs={3}>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </Grid>
        </Grid>
        <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>Review</DialogTitle>
            <DialogContent>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                <DialogContentText>
                    Submit Review for current service.
                    It helps providing better service in future.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    multiline
                    id="name"
                    rows="8"
                    value={text}
                    onChange={(e) => { setText(e.target.value) }}
                    label="Review[optional]"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={handleReviewSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    </Container >)
}