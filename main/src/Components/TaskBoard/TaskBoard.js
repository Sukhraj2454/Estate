
// Components
import TaskBoardlg from './TaskBoardlg';
import TaskBoardsm from './TaskBoardsm';

// Material UI Components
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';


function useWidth() {
    const theme = useTheme();
    const keys = [...theme.breakpoints.keys].reverse();
    return (
        keys.reduce((output, key) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || 'xs'
    );
}

export default function TaskBoard({ theme }) {
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
            <TaskBoardlg theme={theme} useStyles={useStyles} />
            : <TaskBoardsm theme={theme} useStyles={useStyles} />
    )
}