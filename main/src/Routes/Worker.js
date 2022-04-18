// React Utils
import { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';

// Other Utils
// import ACInput from "../Others/ACInput";
import { getUserTasks, getUser, logout, getBranch } from '../Utils/controller';
import useWidth from "../Utils/useWidth";
import MyTasks from '../Components/Dashboard/MyTasks';
import EditProfileCard from '../Components/Card/EditProfileCard';

// MUI Compoenents
import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Rating from '@mui/material/Rating';
import { createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


// MUI Icons
import HomeIcon from '@mui/icons-material/Home';

export default function Worker() {

    //rating 
    const [value, setValue] = useState(4);

    const [branchData, setBranchData] = useState(null);
    const theme = createTheme();
    const location = useLocation();
    const worker = location.state?.worker;
    const workers = location.state?.workers;
    const [user, setUser] = useState({ 'name': '' });
    const [lUser, setLUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const sz = useWidth();
    const len = (sz !== 'sm' && sz !== 'xs') ? 7 : 12;
    const [cards, setCards] = useState([]);
    useEffect(() => {
        getUserTasks(setCards, null, worker.id);
    }, [worker.id]);
    useEffect(() => {
        if (user.desig !== 'Faculty' && user.desig !== 'Non Faculty')
            getBranch(setBranchData, worker.id);

    }, []);
    useEffect(() => {
        getUser(setUser, worker.id)
    }, [setUser, worker]);
    // const handleRefresh = () => {
    //     setLoading(true);
    //     let x = refresh;
    //     setRefresh(!x);
    // }
    const handleLogout = () => {
        logout();
    }
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={'/home'} style={{ textDecoration: 'none', color: 'white' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <HomeIcon />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Service Desk NITJ
                    </Typography>

                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Box component='div' sx={{ mt: 1 }} >
                <Grid container height={100} sx={{ m: 0, p: 0 }}>
                    <Grid item xs={len} lg={5}>

                        <Box xs={len}
                            sx={{ height: 'max-Content', m: 3, p: 2, pl: 15 }}
                        >
                            <Grid container direction={"row"} >
                                <Grid item>
                                    <Typography sx={{ textAlign: 'center' }} component='h1' variant='h4'>{worker.name}</Typography>
                                </Grid>
                                {worker.id === lUser._id ? (<Grid item>
                                    <EditProfileCard />
                                </Grid>) : <></>}
                            </Grid>
                        </Box>
                        <Box xs={len}
                            sx={{ height: 480, margin: 3 }
                            }
                        >
                            <Paper elevation={2} sx={{ minHeight: 450, minWidth: 200, p: 3 }}  >
                                <div>
                                    <Typography textAlign={'left'} component='h2' variant='h5' marginLeft={5} marginBottom={1} marginTop={1}>Email: {user.email} </Typography>
                                    <Typography textAlign={'left'} component='h3' variant='h5' marginLeft={5} marginBottom={1} marginTop={1}>Contact: {user.contact}</Typography>
                                    <Typography textAlign={'left'} component='h3' variant='h5' marginLeft={5} marginBottom={1} marginTop={1}>Desig: {user.desig}</Typography>

                                    {branchData && user.desig !== 'Faculty' && user.desig !== 'Non Faculty' ? (<>
                                        <Typography textAlign={'left'}
                                            component='h3'
                                            variant='h5'
                                            sx={{ ml: 5, mb: 1, mt: 1 }}
                                        >Branch: {branchData.name ? branchData.name : 'Not Selected'}</Typography>
                                        <Typography textAlign={'left'}
                                            component='h3'
                                            variant='h5'
                                            sx={{ ml: 5, mb: 1, mt: 1 }}
                                        >Category: {branchData.category.length ? branchData.category[0].name : 'Not Selected'}</Typography>
                                        <Typography textAlign={'left'}
                                            component='h3'
                                            variant='h5'
                                            sx={{ ml: 5, mb: 1, mt: 1 }}
                                        >Sub-Category: {branchData.category.length ?
                                            branchData.category[0].subCategory ? branchData.category[0].subCategory[0].name : <></> : 'Not Selected'}</Typography>
                                    </>) : <></>}

                                    <Typography textAlign={'left'}
                                        component='h5'
                                        variant='h5'
                                        sx={{ ml: 5, mb: 1, mt: 1 }}
                                    >Ratings: <Rating name="read-only" value={value} readOnly />
                                    </Typography>

                                </div>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={len} sx={{ border: '2px solid gray', borderBottomRightRadius: 15, borderTopRightRadius: 15 }}>
                        <Typography textAlign={'center'} sx={{ mb: 5 }} component='h1' variant='h4'>
                            Tasks
                        </Typography>
                        <MyTasks user={lUser} cards={cards} setCards={setCards} workers={workers} theme={theme} sz={sz} />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider >
    )
}