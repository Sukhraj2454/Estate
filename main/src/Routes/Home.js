// React Utils.
import { useState, useEffect } from 'react';
import { logout } from '../Utils/controller';

// Other Utils
import { getUsers } from '../Utils/controller';

// Other Components
import Taskboard from '../Components/TaskBoard/TaskBoard';
import Dashboard from '../Components/Dashboard/Dashboard';
// import WorkersTable from '../Components/Workers/WorkersTable';
import CreateRequest from '../Components/CreateRequest/CreateRequest';

// MUI Components
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { Container, Typography, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu';

// This data object is basis for app we will store most of data from backend here and then pass it down to Components
export default function Home({ theme }) {

    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState(0);
    const [workers, setWorkers] = useState([{ 'title': 'No Worker Data Found.' }]);

    useEffect(() => {
        getUsers(setWorkers);
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    }
    const handleLogout = () => {
        logout();
    }
    return (
        <Container maxWidth='xl' component='main'>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Service Desk NITJ
                    </Typography>

                    <Button color="inherit" onClick={handleLogout}>Logout</Button>

                </Toolbar>
            </AppBar>

            <SwipeableDrawer
                anchor='left'
                open={open}
                onClose={handleDrawerClose}
                onOpen={handleDrawerOpen}
                sx={{ width: '50%' }}
                transitionDuration={{ enter: 100, exit: 100 }}
            >

                <Typography component='h5' variant='h4' padding={2} textAlign={'center'} color='primary'
                    borderBottom={1}>
                    Menu
                </Typography>

                <Tabs
                    orientation="vertical"
                    value={tab}
                    onChange={handleTabChange}
                    sx={{ borderRight: 1, borderColor: 'divider', width: 250 }}
                >
                    <Tab label="Home" value={0} />
                    <Tab label="Task Board" value={1} />
                    <Tab label="Request a Service" value={2} />
                    
                    {/* <Tab label="Workers" value={3} /> */}
                </Tabs>

            </SwipeableDrawer>
            <>
                <div hidden={tab !== 0}>
                    <Dashboard
                        theme={theme}
                        workers={workers}
                    />
                </div>
                <div hidden={tab !== 1}>
                    <Taskboard
                        theme={theme}
                        workers={workers}
                    />
                </div>
                <div hidden={tab !== 2}>
                    <CreateRequest theme={theme} />
                </div>
                
                {/* <div hidden={tab !== 3}>
                    <WorkersTable />
                </div> */}
            </>
        </Container >
    )
}