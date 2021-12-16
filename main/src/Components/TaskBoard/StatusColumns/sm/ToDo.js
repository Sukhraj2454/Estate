// Material UI Components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from '@mui/material';

// MUI Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function ToDo({ cards }) {
    return (<Accordion>

        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >

            <Typography>To Do</Typography>

        </AccordionSummary>

        <AccordionDetails>
            {cards}
        </AccordionDetails>

    </Accordion>);
}