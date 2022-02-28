// Utils
import { useState } from 'react';

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


const workerHandle = () => {
    console.log("Worker Clicked");
}
export default function TaskCard({ theme, workers }) {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };
    return (
        <Container component={'main'}>
            <Card sx={{ maxWidth: 340, margin: 'auto', mb: 1 }}>
                <CardContent>
                    <Grid container columns={7} >

                        <Grid item lg={5} sm={5} xs={5}>
                            <Typography gutterBottom variant="h6" component="h2">
                                Electricity Bulb Needed for CS304.
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
                            <Priority lvl={1} />
                        </Grid >

                        <Grid item>
                            <CardActions>
                                <Button size="small"
                                    onClick={workerHandle}>
                                    Worker Assigned
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
                    <ExpandedCard close={handleToggle} workers={workers} theme={theme} />
                </Container>
            </Backdrop>
        </Container >
    );
}