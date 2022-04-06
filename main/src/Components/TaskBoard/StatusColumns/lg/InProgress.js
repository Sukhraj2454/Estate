// Material UI Components
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

export default function InProgress({ cards, minHeight, classes, xs, sm }) {
    return (<Grid item sm={sm} xs={xs}>
        <Paper variant='outlined'
            sx={{
                background: '#eee',
                minHeight: minHeight,
                height: 'maxContent',
                width: '100%'
            }}>
            <Typography component='h3' variant='h6' className={classes.root}>
                In Progress
            </Typography>
            {cards}
        </Paper>
    </Grid>);
}