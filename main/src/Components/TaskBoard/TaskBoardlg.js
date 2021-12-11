import TaskCard from '../Card/TaskCard';

// Material UI Components
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

export default function TaskBoardlg({ theme, useStyles }) {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>

            <Container component='main' maxWidth='xl'>

                <Typography component='h1' variant='h4' className={classes.root}>
                    Task Board
                </Typography>


                <Grid container spacing={3} justifyContent={'center'} sx={{mb:2}}>

                    <Grid item sm={3} xs={8}>
                        <Paper variant='outlined' sx={{ background: '#eee', minHeight: 600, height: 'maxContent', width: '100%' }}>
                            <Typography component='h3' variant='h6' className={classes.root}>
                                To Do
                            </Typography>
                            <TaskCard />
                        </Paper>
                    </Grid>

                    <Grid item sm={3} xs={8}>
                        <Paper variant='outlined' sx={{ background: '#eee', minHeight: 600, height: 'maxContent', width: '100%' }}>
                            <Typography component='h3' variant='h6' className={classes.root}>
                                In Progress
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item sm={3} xs={8}>
                        <Paper variant='outlined' sx={{ background: '#eee', minHeight: 600, height: 'maxContent', width: '100%' }} >
                            <Typography component='h3' variant='h6' className={classes.root}>
                                In Review
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item sm={3} xs={8}>
                        <Paper variant='outlined' sx={{ background: '#eee', minHeight: 600, height: 'maxContent', width: '100%' }}>
                            <Typography component='h3' variant='h6' className={classes.root}>
                                Completed
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>

            </Container>

        </ThemeProvider>
    )

}