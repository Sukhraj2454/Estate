// Task Card List View
// Utils
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { updateAssignee, updateReporter } from '../../Utils/controller';

// Components
import ExpandedCard from './ExpandedCard';
// import Priority from '../Others/Priority';
import TaskCardLVSkel from './Skeleton/TaskLVSkel';

// Material UI Components
import Typography from '@mui/material/Typography';
import { Grid, Button } from '@mui/material';
import { Container } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

// material Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import stringToColor from '../../Utils/stringToColor';

export default function TaskCardLV({ theme, clr, sz, workers, data, setCards, cards, refresh, setRefresh }) {

    const assigneeRef = useRef(data.assignee);
    const reporterRef = useRef(data.assignee);
    // const firstCardsRender = useRef(true);
    // const [dt, setData] = useState(data);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState(data.title);

    // eslint-disable-next-line
    const [priority, setPriority] = useState(data.priority);
    const [assignee, setAssignee] = useState(data.assignee);
    const [reporter, setReporter] = useState(data.reporter);
    // useEffect(() => {
    //     let temp = data;
    //     temp.title = title;
    //     temp.assignee = { name: assignee.name, id: assignee.id };
    //     temp.reporter = { name: reporter.name, id: reporter.id };
    //     temp.priority = priority;
    //     setData(temp);
    //     // eslint-disable-next-line
    // }, [title, priority, assignee, reporter, data]);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 0);
    }, []);

    useEffect(() => {
        if (JSON.stringify(assigneeRef.current) === JSON.stringify(assignee)) {
            return;
        }

        assigneeRef.current = assignee;
        updateAssignee(assignee, data._id);

    }, [assignee, data._id]);

    useEffect(() => {
        if (JSON.stringify(reporterRef.current) === JSON.stringify(reporter)) {
            return;
        }
        reporterRef.current = reporter;
        updateReporter(reporter, data._id);

    }, [reporter, data._id]);

    const handleToggle = () => {
        setOpen(!open);
    };
    // useEffect(() => {
    //     setPriority(data.priority);
    // }, [data]);

    return (

        loading ?
            <TaskCardLVSkel />
            :
            (<Container component={'main'} sx={{ bgcolor: clr }}>
                <Grid container columns={12} >

                    <Grid item lg={5} sm={5} xs={5} >
                        <Typography gutterBottom variant="h6" component="h2" noWrap>
                            {title}
                        </Typography>
                    </Grid >

                    <Grid item lg={2} sm={2} xs={2} sx={{ pt: 1, pl: 3 }}>
                        {/*    <Priority lvl={priority} />*/}
                        <Typography sx={{ color: stringToColor(data.taskId.split('-')[0]), fontWeight: 600 }}>{data.taskId}</Typography>
                    </Grid >

                    <Grid item lg={4} sm={4} xs={4} sx={{ m: 'auto', pl: 10 }}>
                        <Link to={{
                            pathname: '/worker',
                            state: { worker: assignee, workers: workers },
                        }}
                            style={{ textDecoration: 'none' }}>
                            <Button size="small">
                                {assignee.name}
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item lg={1} sm={1} xs={1} justifyContent={'right'} sx={{ m: 'auto' }}>
                        <Button size="small"
                            onClick={handleToggle}>
                            <MoreVertIcon />
                        </Button>
                    </Grid >
                </Grid>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}>

                    <Container component='main'>
                        <ExpandedCard workers={workers} cards={cards} refresh={refresh} setRefresh={setRefresh} set={[setTitle, setPriority, setAssignee, setReporter]} setCards={setCards} data={data} close={handleToggle} theme={theme} />
                    </Container>
                </Backdrop>
            </Container >)
    );
}

TaskCardLV.defaultProps = {
    data: {
        assignee: {
            name: '',
            id: 'xyz'
        },
        reporter: {
            name: '',
            id: 'pqr'
        },
        taskId: "a-b",
        title: 'titles',
        description: '',
        status: 'To Do',
        priority: 1
    },
    setPriority: () => { }
}