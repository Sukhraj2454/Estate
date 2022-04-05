// React Utils
import { useEffect, useState } from 'react';

// MUI Components
import { Box } from '@mui/material';

// Other Components
import TaskCardLV from "../Card/TaskCardLV";
import CompletedCard from '../Card/CompletedCard';

export default function MyTasks({ cards, workers, theme, sz, setCards }) {
    // console.log(cards);
    const [data, setData] = useState([]);
    useEffect(() => {
        let col = false;
        let dat = cards.map(card => {
            col = !col;
            if (card.status === 'Completed') {
                if (col)
                    return <CompletedCard key={card._id} data={card} theme={theme} clr='#EEEEEE' sz={sz} />
                else return <CompletedCard key={card._id} data={card} theme={theme} sz={sz} />
            }
            else {
                if (col)
                    return <TaskCardLV key={card._id} data={card} workers={workers} theme={theme} clr='#EEEEEE' sz={sz} />
                else return <TaskCardLV key={card._id} data={card} workers={workers} theme={theme} sz={sz} />
            }
        });
        setData(dat);
    }, [cards, workers, sz, theme, setCards])
    return (
        <Box component='div' sx={{ height: 450, overflowY: 'scroll' }}>
            {data}
        </Box>
    )
} 