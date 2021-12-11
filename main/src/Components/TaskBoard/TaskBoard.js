// Components
import TaskBoardlg from './TaskBoardlg';
import TaskBoardsm from './TaskBoardsm';
// Material UI Components
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

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
    const wd = useWidth();
    return (
        (wd !== 'xs' && wd !== 'sm') ?
            <TaskBoardlg theme={theme} />
            : <TaskBoardsm theme={theme} />
    )
}