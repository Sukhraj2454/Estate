// React Utils
import { useEffect, useState } from "react";

// Other Utils
// import ACInput from "../Others/ACInput";
import { getCards } from '../../Utils/controller';
import useWidth from "../../Utils/useWidth";
import MyTasks from './MyTasks';

// MUI Compoenents
import { Box, Grid, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

export default function Dashboard({ theme, workers }) {
    const sz = useWidth();
    const len = (sz !== 'sm' && sz !== 'xs') ? 10 : 12;
    const [cards, setCards] = useState([]);
    useEffect(() => {
        getCards(setCards);
    }, []);


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


                        {/* <ACInput
                            label='Status'
                            defValue='To Do'
                            variant='outlined'
                            data={[{ title: 'To Do' },
                            { title: 'In Progress' },
                            { title: 'Review' },
                            { title: 'Completed' }]}
                        /> */}
                        <MyTasks cards={cards} setCards={setCards} workers={workers} theme={theme} sz={sz} />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider >
    )
}