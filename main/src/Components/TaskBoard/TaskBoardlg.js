// Other Components
import TaskCard from '../Card/TaskCard';
import ToDo from './StatusColumns/lg/ToDo';
import InProgress from './StatusColumns/lg/InProgress';
import Completed from './StatusColumns/lg/Completed';
import Review from './StatusColumns/lg/Review';

// Material UI Components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

export default function TaskBoardlg({ theme, useStyles }) {

    const toDoCards = [<TaskCard key='1' theme={theme} />];
    const inProgressCards = [];
    const reviewCards = [];
    const completedCards = [];
    const classes = useStyles();
    const mh = 550;
    return (
        <Container component='main' maxWidth='xl'>

            <Typography component='h1' variant='h4' className={classes.root}>
                Task Board
            </Typography>


            <Grid container spacing={3} justifyContent={'center'} sx={{ mb: 2 }}>
                <ToDo minHeight={mh} cards={toDoCards} classes={classes} />
                <InProgress minHeight={mh} cards={inProgressCards} classes={classes} />
                <Review minHeight={mh} cards={reviewCards} classes={classes} />
                <Completed minHeight={mh} cards={completedCards} classes={classes} />
            </Grid>

        </Container>

    )

}