// Other Components
import TaskCard from '../Card/TaskCard';
import ToDo from './StatusColumns/sm/ToDo';
import InProgress from './StatusColumns/sm/InProgress';
import Review from './StatusColumns/sm/Review';
import Completed from './StatusColumns/sm/Completed';

// Material UI Components   
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


export default function TaskBoardsm({ theme, useStyles }) {

    const classes = useStyles();
    const toDoCards = [<TaskCard key='1' theme={theme} />];
    const inProgressCards = [];
    const reviewCards = [];
    const completedCards = [];

    return (


        <Container component='main' maxWidth='lg'>
            <Typography component='h1' variant='h4' className={classes.root}>
                Task Board
            </Typography>
            <ToDo cards={toDoCards} />
            <InProgress cards={inProgressCards} />
            <Review cards={reviewCards} />
            <Completed cards={completedCards} />
        </Container>
    )
}