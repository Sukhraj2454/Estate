// React Utils.
import { useState, useEffect } from 'react';
import { logout } from '../Utils/controller';

// Other Utils
import { getUsers } from '../Utils/controller';

// Other Components
import Taskboard from '../Components/TaskBoard/TaskBoard';
import Dashboard from '../Components/Dashboard/Dashboard';
// import Worker from '../Routes/Worker';
import Appbar from './Appbar';
import CreateRequest from '../Components/CreateRequest/CreateRequest';

// MUI Components
import { Typography } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

// This data object is basis for app we will store most of data from backend here and then pass it down to Components
export default function Home({ theme }) {

    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState('0');
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
        <>

            <Appbar handleDrawerOpen={handleDrawerOpen} workers={workers} handleLogout={handleLogout} />
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
                    <Tab label="Home" value='0' />
                    <Tab label="Task Board" value='1' />
                    <Tab label="Request a Service" value='2' />
                    {/* <Tab label="Workers" value={3} /> */}
                </Tabs>

            </SwipeableDrawer>
            <TabContext value={tab}>
                <TabPanel value='0'>
                    <Dashboard
                        theme={theme}
                        workers={workers}
                    />
                </TabPanel>

                <TabPanel value='1'>
                    <Taskboard
                        theme={theme}
                        workers={workers}
                    />
                </TabPanel>

                <TabPanel value='2'>
                    <CreateRequest theme={theme} />
                </TabPanel>

                {/* <div hidden={tab !== 3}>
                    <Worker theme={theme} workers={workers} />
                </div> */}
            </TabContext>
        </ >
    )
}