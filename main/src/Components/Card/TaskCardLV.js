// Task Card List View
// Utils
import { useState, useEffect } from 'react';

// Components
import ExpandedCard from './ExpandedCard';
import Priority from '../Others/Priority';
import TaskCardLVSkel from './Skeleton/TaskLVSkel';

// Material UI Components
import Typography from '@mui/material/Typography';
import { Grid, Button } from '@mui/material';
import { Container } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

// material Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';


const workerHandle = () => {
    console.log("Worker Clicked");
}
export default function TaskCardLV({ theme, clr, sz }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const handleToggle = () => {
        setOpen(!open);
    };
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 0);
    }, []);

    return (

        loading ?
            <TaskCardLVSkel />
            :
            <Container component={'main'} sx={{ bgcolor: clr }}>
                <Grid container columns={12} >

                    <Grid item lg={6} sm={6} xs={6} >
                        <Typography gutterBottom variant="h6" component="h2" noWrap>
                            Electricity Bulb Needed for CS304.Electricity Bulb Needed for CS304.Electricity Bulb Needed for CS304.
                        </Typography>
                    </Grid >

                    <Grid item lg={1} sm={1} xs={1} sx={{ pt: 1, pl: 3 }}>
                        <Priority lvl={1} />
                    </Grid >
                    {(sz !== 'sm' && sz !== 'xs') ?
                        <Grid item lg={4} sm={4} xs={4} sx={{ m: 'auto', pl: 10 }}>
                            <Button size="small"
                                onClick={workerHandle}>
                                Worker Assigned
                            </Button>
                        </Grid> : <></>}
                    <Grid item lg={1} sm={1} xs={1} justifyContent={'right'} sx={{ m: 'auto' }}>
                        <Button size="small"
                            onClick={handleToggle}>
                            <MoreVertIcon />
                        </Button>
                    </Grid >
                </Grid>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <Container component='main'>
                        <ExpandedCard close={handleToggle} theme={theme} />
                    </Container>
                </Backdrop>
            </Container >
    );
}
TaskCardLV.defaultProps = {
    clr: 'transparent'
}