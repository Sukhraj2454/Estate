// React Utils
import { useState, useEffect } from 'react';

// Other Utils
import { getCards } from '../../Utils/controller';

// Other Components
import TaskCard from '../Card/TaskCard';
import ToDo from './StatusColumns/sm/ToDo';
import InProgress from './StatusColumns/sm/InProgress';
// import Review from './StatusColumns/sm/Review';
import Completed from './StatusColumns/sm/Completed';

// Material UI Components   
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// MUI Icons
import RefreshIcon from '@mui/icons-material/Refresh';

export default function TaskBoardsm({ theme, useStyles, workers, cards, setCards }) {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const [toDoCards, setTDC] = useState([<TaskCard workers={workers} key='1' theme={theme} />]);
    const [inProgressCards, setIPC] = useState([]);
    // const [reviewCards, setRC] = useState([]);
    const [completedCards, setCC] = useState([]);
    const [refresh, setRefresh] = useState(1);

    useEffect(() => {
        getCards(setCards, setLoading);
    }, [refresh, setCards]);
    const handleRefresh = () => {
        setLoading(true);
        let x = refresh;
        setRefresh(!x);
    }
    useEffect(() => {
        // if (cards.length > 0) {
        //     firstRender.current = false;
        // }
        // if (firstRender.current) {
        //     if (cards.length > 0) {
        //         firstRender.current = false;
        //         setCards(cards);
        //         return;
        //     }
        //     setCards([])
        //     return;
        // }
        let tdc = [], ipc = [], cc = [];
        // let, rc = [];
        cards.forEach((card) => {
            if (card.status === 'To Do')
                tdc.push(<TaskCard workers={workers} cards={cards} setCards={setCards} data={card} key={card._id} theme={theme} />)
            else if (card.status === 'In Progress')
                ipc.push(<TaskCard workers={workers} cards={cards} setCards={setCards} data={card} key={card._id} theme={theme} />)
            // else if (card.status === 'Review')
            //     rc.push(<TaskCard workers={workers} cards={cards} setCards={setCards} data={card} key={card._id} theme={theme} />)
            else cc.push(<TaskCard workers={workers} cards={cards} setCards={setCards} data={card} key={card._id} theme={theme} />)

        })
        setTDC(tdc)
        setIPC(ipc)
        // setRC(rc)
        setCC(cc)
    }, [workers, theme, cards, setCards])

    return (


        <Container component='main' maxWidth='lg'>
            <Typography component='h1' variant='h4' className={classes.root}>
                Task Board
                <LoadingButton
                    size="medium"
                    onClick={handleRefresh}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<RefreshIcon />}
                >
                    REFRESH
                </LoadingButton>
            </Typography>
            <ToDo cards={toDoCards} />
            <InProgress cards={inProgressCards} />
            {/* <Review cards={reviewCards} /> */}
            <Completed cards={completedCards} />
        </Container>
    )
}