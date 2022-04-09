// Utils
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Other Utils
import { updateAssignee, updateReporter } from '../../Utils/controller';
import { updateStatus } from '../../Utils/controller';
import stringToColor from '../../Utils/stringToColor';

// Components
import ExpandedCard from './ExpandedCard';
// import Priority from '../Others/Priority';
// import DialogBox from './DialogBox';

// Material UI Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import { Grid, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Container } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

// material Icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


export default function TaskCard({ theme, workers, data, cards, setCards }) {
    const StatusRef = useRef(data.status);
    const assigneeRef = useRef(data.assignee);
    const reporterRef = useRef(data.assignee);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(data ? data.status : 'To Do');
    // const [dt, setData] = useState(data);
    const [title, setTitle] = useState(data.title);

    // eslint-disable-next-line
    const [priority, setPriority] = useState(data.priority);
    const [assignee, setAssignee] = useState(data.assignee);
    const [reporter, setReporter] = useState(data.reporter);
    const handleToggle = () => {
        setOpen(!open);
    };
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
        if (JSON.stringify(assigneeRef.current) === JSON.stringify(assignee)) {
            return;
        }
        assigneeRef.current = assignee;
        updateAssignee(assignee, data._id);
    }, [assignee, data._id]);

    useEffect(() => {
        if (StatusRef.current === status) {
            return;
        }
        StatusRef.current = status;
        updateStatus(status, data._id);
    }, [status, data._id]);
    useEffect(() => {

        if (JSON.stringify(reporterRef.current) === JSON.stringify(reporter)) {
            return;
        }
        reporterRef.current = reporter;
        updateReporter(reporter, data._id);
    }, [reporter, data._id]);

    const handleStatusChange = (event) => {

        setStatus(event.target.value);
        if (cards.length > 0) {
            let ind = cards.findIndex(x => x._id === data._id);
            let temp = cards[ind];
            cards = cards.filter(x => x._id !== data._id);
            temp.status = event.target.value;
            cards.push(temp);
            setCards(cards);
        }
    };
    const workerHandle = () => {
        console.log("Worker Clicked");
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


                        <Grid item lg={4} sm={4} xs={4}>
                            <CardActions>
                                <Link to={{
                                    pathname: '/worker',
                                    state: { worker: assignee }
                                }}
                                    style={{ textDecoration: 'none' }}>
                                    <Button size="small"
                                        onClick={workerHandle}>
                                        {assignee.name}
                                    </Button>
                                </Link>
                            </CardActions>
                        </Grid>


                        <Grid item lg={3} sm={4} xs={4} sx={{ pt: 1 }}>
                            <Typography sx={{ userSelect: 'none', fontWeight: 600, color: stringToColor(data.taskId.split('-')[0]) }} >{data.taskId}</Typography>
                            {/* <Priority lvl={priority} />
                            <FormControl>
                                <InputLabel id="status-select-label">Status</InputLabel>
                                <Select
                                    labelId="status-select-label"
                                    value={status}
                                    label="Status"
                                    onChange={handleStatusChange}
                                >
                                    <MenuItem value={'To Do'}>To Do</MenuItem>
                                    <MenuItem value={'In Progress'}>In Progress</MenuItem>
                            <MenuItem value={'Review'}>Review</MenuItem>
                            <MenuItem value={'Completed'}>Completed</MenuItem>
                                </Select>
                            </FormControl> */}
                        </Grid >


                    </Grid>
                    <ToggleButtonGroup
                        color="primary"
                        value={status}
                        exclusive
                        onChange={handleStatusChange}
                    >
                        <ToggleButton
                            sx={{ fontSize: 10, fontWeight: 600 }} value="To Do">To Do</ToggleButton>
                        <ToggleButton
                            sx={{ fontSize: 10, fontWeight: 600 }} value="In Progress">In Progress</ToggleButton>
                        <ToggleButton
                            sx={{ fontSize: 10, fontWeight: 600 }} value="Completed">Completed</ToggleButton>
                    </ToggleButtonGroup>
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
        taskId: 'a-b',
        status: 'To Do',
        priority: 'Medium'
    }
}