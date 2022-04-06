// React Utils
import { useEffect, useState, useRef } from 'react';

// Other Utils
import { getUserTasks } from '../../Utils/controller';

// MUI Components
import { Box } from '@mui/material';

// Other Components
import TaskCardLV from "../Card/TaskCardLV";
import CompletedCard from '../Card/CompletedCard';

export default function MyTasks({ cards, workers, theme, sz, setCards, user }) {
    // console.log(cards);
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const currentRefresh = useRef(false);
    useEffect(() => {
        if (refresh === currentRefresh.current)
            return;
        currentRefresh.current = refresh;
        getUserTasks(setCards);
    }, [refresh, setCards]);
    useEffect(() => {
        let col = false;
        let dat = cards.map(card => {
            col = !col;
            if (card.status === 'Completed' && card.reporter.name === user.name && card.reporter.id === user._id) {

                if (col)
                    return <CompletedCard key={card._id} data={card} setRefresh={setRefresh} refresh={currentRefresh} theme={theme} clr='#EEEEEE' sz={sz} />
                else return <CompletedCard key={card._id} data={card} setRefresh={setRefresh} refresh={currentRefresh} theme={theme} sz={sz} />
            }
            else {
                if (col)
                    return <TaskCardLV key={card._id} data={card} setRefresh={setRefresh} refresh={currentRefresh} workers={workers} theme={theme} clr='#EEEEEE' sz={sz} />
                else return <TaskCardLV key={card._id} data={card} setRefresh={setRefresh} refresh={currentRefresh} workers={workers} theme={theme} sz={sz} />
            }
        });
        setData(dat);
    }, [cards, workers, sz, theme, setCards, setData, user, setRefresh])
    return (
        <Box component='div' sx={{ height: 450, overflowY: 'scroll' }}>
            {data}
        </Box>
    )
} 