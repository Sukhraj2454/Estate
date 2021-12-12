// MUI Components
import Tooltip from '@mui/material/Tooltip';

// MUI Icons
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function Priority({ lvl }) {
    if (lvl === 1)
        return (<Tooltip title='Low Priority'><LowPriorityIcon sx={{ color: 'orange' }} /></Tooltip>)
    else
        return (<Tooltip title='High Priority'><PriorityHighIcon sx={{ color: 'red' }} /></Tooltip>)
}