// React Utils
import { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';

// Other Utils
// import ACInput from "../Others/ACInput";
import { getUserTasks, getUser, logout } from '../Utils/controller';
import useWidth from "../Utils/useWidth";
import MyTasks from '../Components/Dashboard/MyTasks';
import EditProfileCard from '../Components/Card/EditProfileCard';

// MUI Compoenents
import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Rating from '@mui/material/Rating';
// import LoadingButton from '@mui/lab/LoadingButton';
import { createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


// MUI Icons
import HomeIcon from '@mui/icons-material/Home';

export default function Worker({ workers }) {

    //rating 
    const [value, setValue] = useState(4);

    const theme = createTheme();
    const location = useLocation();
    const worker = location.state?.worker;
    // const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({ 'name': '' });
    const sz = useWidth();
    const len = (sz !== 'sm' && sz !== 'xs') ? 7 : 12;
    const [cards, setCards] = useState([]);
    useEffect(() => {
        getUserTasks(setCards, null, worker.id);
    }, [worker.id]  );

    useEffect(() => {
        getUser(setUser, worker.id)
    }, [setUser, worker]);
    useEffect(() => {
        console.log(user);
    }, [user])
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
                <Grid container height={620} sx={{ m: 0, p: 0 }}>
                    <Grid item xs={len}lg={5}>
                        {/* <Avatar sx={{ margin: 0 }} {...stringAvatar('Sukhraj Singh')} /> */}
                  
                        <Box xs={len}
                         sx={{height:300 ,margin:3 }}
                        >
                          <Paper elevation={1}sx={{ minHeight: 300 ,minWidth:200,}}      
                        >
                           <Grid center container direction={"row"} >
                               <Grid item >
                               <Typography textAlign={'center'} component='h1' variant='h4'>{user.name}</Typography>
                               </Grid>
                               <Grid item>
                               <EditProfileCard></EditProfileCard>
                               </Grid>
                           </Grid>
                            {/* <Typography textAlign={'center'} component='h1' variant='h4'>{user.name}</Typography> */}
                            <Typography textAlign={'center'} component='h1' variant='h5'>{user.contact}</Typography>
                            </Paper>
                        </Box>
                        {/* other details */}
                        <Box  xs={len}
                         sx={{height:300 ,margin:3 }
                        }
                        >
                          <Paper elevation={2}sx={{  minHeight: 300 ,minWidth:200,}}  >
                       <div>
                       <Typography textAlign={'left'} component='h2' variant='h5' marginLeft={5} marginBottom={1}>Full Name : {user.name}</Typography>
                   <Typography textAlign={'left'} component='h2' variant='h5'marginLeft={5}marginBottom={1}marginTop={1}>Email: {user.email} </Typography>
                        <Typography textAlign={'left'} component='h3' variant='h5'marginLeft={5} marginBottom={1}marginTop={1}>Contact: {user.contact}</Typography>
                        <Typography textAlign={'left'} component='h4' variant='h5'marginLeft={5}marginBottom={1}marginTop={1}>Category: {user.category}</Typography>
                        <Typography textAlign={'left'} component='h5' variant='h5'marginLeft={5} marginBottom={1}marginTop={1}>Ratings: <Rating name="read-only" value={value} readOnly /> </Typography>
                       </div>
                   </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={len}  sx={{ border: '2px solid gray', borderBottomRightRadius: 15, borderTopRightRadius: 15 }}>
                        <Typography textAlign={'center'} sx={{ mb: 5 }} component='h1' variant='h4'>
                            Tasks
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
                        <MyTasks user={user} cards={cards} setCards={setCards} workers={workers} theme={theme} sz={sz} />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider >
    )
}