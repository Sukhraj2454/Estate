import TaskCard from '../Card/TaskCard';

// Material UI Components
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function TaskBoardsm({ theme, useStyles }) {

    const classes = useStyles();

    return (

        <ThemeProvider theme={theme}>

            <Container component='main' maxWidth='lg'>
                <Typography component='h1' variant='h4' className={classes.root}>
                    Task Board
                </Typography>

                <Accordion>

                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >

                        <Typography>To Do</Typography>

                    </AccordionSummary>

                    <AccordionDetails>

                        <TaskCard />
                    </AccordionDetails>

                </Accordion>

                <Accordion>

                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >

                        <Typography>In Progress</Typography>

                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography>These Tasks are in progress.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>

                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Review</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography>These Tasks are in Review.
                        </Typography>
                    </AccordionDetails>

                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Completed</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography>These Tasks are Comleted within past two weeks.
                        </Typography>
                    </AccordionDetails>

                </Accordion>

            </Container>
        </ThemeProvider>
    )
}