// React Utils
import { useEffect, useState } from 'react';

// MUI Components
import { Box } from '@mui/material';

// Other Components
import TaskCardLV from "../Card/TaskCardLV";

export default function MyTasks({ cards, workers, theme, sz, setCards }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        let col = false;
        let dat = cards.map(card => {
            col = !col;
            if (col)
                return <TaskCardLV key={card._id} cards={cards} data={card} setCards={setCards} workers={workers} theme={theme} clr='#EEEEEE' sz={sz} />
            else return <TaskCardLV key={card._id} cards={cards} data={card} setCards={setCards} workers={workers} theme={theme} sz={sz} />
        });
        setData(dat);
    }, [cards, workers, sz, theme, setCards])
    return (
        <Box component='div' sx={{ height: 450, overflowY: 'scroll' }}>
            {data}
        </Box>
    )
} 