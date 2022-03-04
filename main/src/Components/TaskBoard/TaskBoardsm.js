// React Utils
import { useState, useEffect, useRef } from 'react';

// Other Components
import TaskCard from '../Card/TaskCard';
import ToDo from './StatusColumns/sm/ToDo';
import InProgress from './StatusColumns/sm/InProgress';
import Review from './StatusColumns/sm/Review';
import Completed from './StatusColumns/sm/Completed';

// Material UI Components   
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


export default function TaskBoardsm({ theme, useStyles, workers, cards }) {

    const classes = useStyles();
    const firstRender = useRef(true);

    const [toDoCards, setTDC] = useState([<TaskCard workers={workers} key='1' theme={theme} />]);
    const [inProgressCards, setIPC] = useState([]);
    const [reviewCards, setRC] = useState([]);
    const [completedCards, setCC] = useState([]);
    const [cardsArr, setCards] = useState(cards);
    useEffect(() => {
        if (cardsArr.length > 0) {
            firstRender.current = false;
        }
        if (firstRender.current) {
            if (cards.length > 0) {
                firstRender.current = false;
                setCards(cards);
                return;
            }
            setCards([])
            return;
        }
        let tdc = [], ipc = [], rc = [], cc = [];
        cardsArr.forEach((card) => {
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
    }, [cardsArr, workers, theme, cards])

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