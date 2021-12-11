
// Material UI Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import { Grid, Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

// material Icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

function Priority({ lvl }) {
    if (lvl === 1)
        return (<Tooltip title='Low Priority'><LowPriorityIcon sx={{ color: 'orange' }} /></Tooltip>)
    else
        return (<Tooltip title='High Priority'><PriorityHighIcon sx={{ color: 'red' }} /></Tooltip>)
}

const workerHandle = () => {
    console.log("Worker Clicked");
}
export default function TaskCard() {

    return (
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
                                onClick={workerHandle}>
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
                                Worker Assigned to this Task.
                            </Button>
                        </CardActions>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}