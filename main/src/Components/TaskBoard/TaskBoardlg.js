// React Utils
import { useState, useEffect } from 'react';

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

export default function TaskBoardlg({ theme, workers, cards, useStyles }) {

    const [toDoCards, setTDC] = useState([<TaskCard workers={workers} key='1' theme={theme} />]);
    const [inProgressCards, setIPC] = useState([]);
    const [reviewCards, setRC] = useState([]);
    const [completedCards, setCC] = useState([]);
    useEffect(() => {
        let tdc = [], ipc = [], rc = [], cc = [];
        cards.forEach(card => {
            if (card.status === 'To Do')
                tdc.push(<TaskCard workers={workers} data={card} key={card._id} theme={theme} />)
            else if (card.status === 'In Progress')
                ipc.push(<TaskCard workers={workers} data={card} key={card._id} theme={theme} />)
            else if (card.status === 'Review')
                rc.push(<TaskCard workers={workers} data={card} key={card._id} theme={theme} />)
            else cc.push(<TaskCard workers={workers} data={card} key={card._id} theme={theme} />)

        })
        setTDC(tdc)
        setIPC(ipc)
        setRC(rc)
        setCC(cc)
    }, [cards, workers, theme])
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