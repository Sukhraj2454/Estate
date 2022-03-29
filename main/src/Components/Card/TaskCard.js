// Utils
import { useState, useEffect, useRef } from 'react';
import { updateAssignee, updateReporter } from '../../Utils/controller';

// Components
import ExpandedCard from './ExpandedCard';
import Priority from '../Others/Priority';
// import DialogBox from './DialogBox';

// Material UI Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import { Grid, Button } from '@mui/material';
import { Container } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

// material Icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


export default function TaskCard({ theme, workers, data, cards, setCards }) {
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };
    const firstAssigneeRender = useRef(true);
    const firstReporterRender = useRef(true);
    // const [dt, setData] = useState(data);
    const [title, setTitle] = useState(data.title);
    const [priority, setPriority] = useState(data.priority);
    const [assignee, setAssignee] = useState(data.assignee);
    const [reporter, setReporter] = useState(data.reporter);
    // useEffect(() => {
    //     let temp = dt;
    //     temp.title = title;
    //     temp.assignee = { name: assignee.name, id: assignee.id };
    //     temp.reporter = { name: reporter.name, id: reporter.id };
    //     temp.priority = priority;
    //     setData(temp);
    //     // eslint-disable-next-line
    // }, [title, priority, assignee, reporter]);

    useEffect(() => {
        if (firstAssigneeRender.current) {
            firstAssigneeRender.current = false;
            return;
        }
        updateAssignee(assignee, data._id);
    }, [assignee, data._id]);

    useEffect(() => {
        if (firstReporterRender.current) {
            firstReporterRender.current = false;
            return;
        }
        updateReporter(reporter, data._id);
    }, [reporter, data._id]);

    const workerHandle = () => {
        console.log("Worker Clicked");
        console.log(assignee);
    }
    return (
        <Container component={'main'}>
            <Card sx={{ maxWidth: 340, margin: 'auto', mb: 1 }}>
                <CardContent>
                    <Grid container columns={7} >

                        <Grid item lg={5} sm={5} xs={5}>
                            <Typography gutterBottom variant="h6" component="h2">
                                {title}
                            </Typography>
                        </Grid >

                        <Grid item lg={2} sm={2} xs={2} justifyContent={'right'}>
                            <CardActions>
                                <Button size="small"
                                    onClick={handleToggle}>
                                    <MoreHorizIcon />
                                </Button>

                            </CardActions>
                        </Grid >

                        <Grid item lg={1} sm={1} xs={1} sx={{ pt: 1 }}>
                            <Priority lvl={priority} />
                        </Grid >

                        <Grid item>
                            <CardActions>
                                <Button size="small"
                                    onClick={workerHandle}>
                                    {assignee.name}
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card >

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <Container component='main'>
                    <ExpandedCard cards={cards} setCards={setCards} data={data} set={[setTitle, setPriority, setAssignee, setReporter]} close={handleToggle} workers={workers} theme={theme} />
                </Container>
            </Backdrop>
        </Container >)
}
TaskCard.defaultProps = {
    data: {
        assignee: {
            name: '',
            id: ''
        },
        reporter: {
            name: '',
            id: ''
        },
        status: 'To Do',
        priority: 'Medium'
    }
}