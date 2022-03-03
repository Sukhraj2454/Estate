// React Utils

// Other Utils
import TaskCardLV from "../Card/TaskCardLV";
import ACInput from "../Others/ACInput";
import useWidth from "../../Utils/useWidth";

// MUI Compoenents
import { Box, Grid, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

// Mui Icons

export default function Dashboard({ theme, workers, cards }) {
    const sz = useWidth();
    const len = (sz !== 'sm' && sz !== 'xs') ? 10 : 12

    return (
        <ThemeProvider theme={theme}>
            <Box component='div' sx={{ mt: 1 }} >
                <Grid container height={620} sx={{ m: 0, p: 0 }}>
                    {sz !== 'sm' && sz !== 'xs' ? (
                        <Grid item xs={2}>
                            {/* <Avatar sx={{ margin: 0 }} {...stringAvatar('Sukhraj Singh')} /> */}
                            <Typography textAlign={'center'} component='h1' variant='h4'>Welcome,{<br />} Sukhraj Singh</Typography>
                        </Grid>) : <></>}
                    <Grid item xs={len} sx={{ border: '2px solid gray', borderBottomRightRadius: 15, borderTopRightRadius: 15 }}>
                        <Typography textAlign={'center'} sx={{ mb: 5 }} component='h1' variant='h4'>My Tasks</Typography>


                        <ACInput

                            label='Status'
                            defValue='To Do'
                            variant='outlined'
                            data={[{ title: 'To Do' },
                            { title: 'In Progress' },
                            { title: 'Review' },
                            { title: 'Completed' }]}
                        />

                        <Box component='div' sx={{ height: 450, overflowY: 'scroll' }}>
                            <TaskCardLV key='1' workers={workers} theme={theme} clr='#EEEEEE' sz={sz} />
                            <TaskCardLV workers={workers} theme={theme} sz={sz} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider >
    )
}