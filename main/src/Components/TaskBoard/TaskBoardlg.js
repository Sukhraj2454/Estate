// React Utils
import { useState, useEffect } from 'react';
// , useRef

// Other Utils
import { getCards } from '../../Utils/controller';

// Other Components
import TaskCard from '../Card/TaskCard';
import ToDo from './StatusColumns/lg/ToDo';
import InProgress from './StatusColumns/lg/InProgress';
// import Review from './StatusColumns/lg/Review';
import Completed from './StatusColumns/lg/Completed';

// Material UI Components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// MUI Icons
import RefreshIcon from '@mui/icons-material/Refresh';

export default function TaskBoardlg({ theme, workers, cards, useStyles, setCards }) {

    // const firstRender = useRef(true);
    const [loading, setLoading] = useState(false);
    const [toDoCards, setTDC] = useState([]);
    const [inProgressCards, setIPC] = useState([]);
    // const [reviewCards, setRC] = useState([]);
    const [completedCards, setCC] = useState([]);
    // const [cardsArr, setCards] = useState(cards);
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
        // if (cardsArr.length > 0) {
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
        // let rc = [];
        cards.forEach(card => {
            if (card.status === 'To Do')
                tdc.push(<TaskCard workers={workers} cards={cards} setCards={setCards} data={card} key={card._id} theme={theme} />)
            else if (card.status === 'In Progress')
                ipc.push(<TaskCard workers={workers} cards={cards} setCards={setCards} data={card} key={card._id} theme={theme} />)
            // else if (card.status === 'Review')
            //     rc.push(<TaskCard workers={workers} cards={cards} setCards={setCards} data={card} key={card._id} theme={theme} />)
            else cc.push(<TaskCard workers={workers} cards={cards} setCards={setCards} data={card} key={card._id} theme={theme} />)

        });
        setTDC(tdc)
        setIPC(ipc)
        // setRC(rc)
        setCC(cc)
    }, [cards, workers, theme, setCards]);

    const classes = useStyles();
    const mh = 550;
    return (
        <Container component='main' maxWidth='xl'>

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


            <Grid container spacing={3} justifyContent={'center'} sx={{ mb: 2 }}>
                <ToDo minHeight={mh} cards={toDoCards} classes={classes} />
                <InProgress minHeight={mh} cards={inProgressCards} classes={classes} />
                {/* <Review minHeight={mh} cards={reviewCards} classes={classes} /> */}
                <Completed minHeight={mh} cards={completedCards} classes={classes} />
            </Grid>

        </Container>

    )

}