// React Utils

// Other Utils
// import stringAvatar from '../../Utils/stringAvatar';
import TaskCardLV from "../Card/TaskCardLV";

// MUI Compoenents
import { Box, Grid, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

// Mui Icons

export default function Dashboard({ theme }) {

    return (
        <ThemeProvider theme={theme}>
            <Box component='div' sx={{ mt: 1 }} >
                <Grid container height={620} sx={{ m: 0, p: 0 }}>
                    <Grid item xs={2}>
                        {/* <Avatar sx={{ margin: 0 }} {...stringAvatar('Sukhraj Singh')} /> */}
                        <Typography textAlign={'center'} component='h1' variant='h4'>Welcome,{<br />} Sukhraj Singh</Typography>
                    </Grid>
                    <Grid item xs={10} sx={{ border: '2px solid gray', borderBottomRightRadius: 15, borderTopRightRadius: 15 }}>
                        <Typography textAlign={'center'} sx={{ mb: 5 }} component='h1' variant='h4'>My Tasks</Typography>
                        <Box component='div' sx={{ height: 500, overflowY: 'scroll' }}>
                            <TaskCardLV key='1' theme={theme} clr='#EEEEEE' />
                            <TaskCardLV theme={theme} />
                            <TaskCardLV theme={theme} clr='#EEEEEE' />
                            <TaskCardLV theme={theme} />
                            <TaskCardLV theme={theme} clr='#EEEEEE' />
                            <TaskCardLV theme={theme} />
                            <TaskCardLV theme={theme} clr='#EEEEEE' />
                            <TaskCardLV theme={theme} />
                            <TaskCardLV theme={theme} clr='#EEEEEE' />
                            <TaskCardLV theme={theme} />
                            <TaskCardLV theme={theme} clr='#EEEEEE' />
                            <TaskCardLV theme={theme} />
                            <TaskCardLV theme={theme} clr='#EEEEEE' />
                            <TaskCardLV theme={theme} />
                            <TaskCardLV theme={theme} clr='#EEEEEE' />

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider >
    )
}