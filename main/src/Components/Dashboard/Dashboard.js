// React Utils
import { useEffect, useState } from "react";

// Other Utils
// import ACInput from "../Others/ACInput";
import { getUserTasks, getUser } from '../../Utils/controller';
import useWidth from "../../Utils/useWidth";
import MyTasks from './MyTasks';

// MUI Compoenents
import { Box, Grid, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

// MUI Icons
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Dashboard({ theme, workers }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({ 'name': '' });
    const sz = useWidth();
    const len = (sz !== 'sm' && sz !== 'xs') ? 10 : 12;
    const [cards, setCards] = useState([]);
    const [refresh, setRefresh] = useState(1);

    useEffect(() => {
        getUserTasks(setCards, setLoading);
    }, [refresh]);

    useEffect(() => {
        getUser(setUser)
    }, [setUser]);
    const handleRefresh = () => {
        setLoading(true);
        let x = refresh;
        setRefresh(!x);
    }
    return (
        <ThemeProvider theme={theme}>
            <Box component='div' sx={{ mt: 1 }} >
                <Grid container height={620} sx={{ m: 0, p: 0 }}>
                    {sz !== 'sm' && sz !== 'xs' ? (
                        <Grid item xs={2}>
                            {/* <Avatar sx={{ margin: 0 }} {...stringAvatar('Sukhraj Singh')} /> */}
                            <Typography textAlign={'center'} component='h1' variant='h4'>Welcome,{<br />}{user.name}</Typography>
                        </Grid>) : <></>}
                    <Grid item xs={len} sx={{ border: '2px solid gray', borderBottomRightRadius: 15, borderTopRightRadius: 15 }}>
                        <Typography textAlign={'center'} sx={{ mb: 5 }} component='h1' variant='h4'>
                            My Tasks
                            <LoadingButton
                                size="medium"
                                onClick={handleRefresh}
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<RefreshIcon />}
                            >
                                REFRESH
                            </LoadingButton>
                        </Typography>


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