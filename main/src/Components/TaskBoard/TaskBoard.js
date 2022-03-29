// React Utils
import { useState, useEffect } from 'react';
// Utils
import useWidth from '../../Utils/useWidth';
import { getCards } from '../../Utils/controller';
// Components
import TaskBoardlg from './TaskBoardlg';
import TaskBoardsm from './TaskBoardsm';

// Material UI Components
import { createStyles, makeStyles } from '@mui/styles';



export default function TaskBoard({ theme, workers }) {
    const [cards, setCards] = useState([]);
    useEffect(() => {
        getCards(setCards);
    }, []);

    const useStyles = makeStyles(() =>
        createStyles({
            root: {
                color: '#2C272E',
                marginTop: 5,
                marginBottom: 5,
                padding: 10,
                fontWeight: 500,
                userSelect: 'none',
            },
        }),
    );

    const wd = useWidth();

    return (
        (wd !== 'xs' && wd !== 'sm') ?
            <TaskBoardlg
                theme={theme}
                useStyles={useStyles}
                workers={workers}
                cards={cards}
                setCards={setCards}
            />
            : <TaskBoardsm
                theme={theme}
                useStyles={useStyles}
                workers={workers}
                cards={cards}
            />
    )
}