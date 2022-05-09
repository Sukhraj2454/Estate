// React Utils
import { useState } from "react";
import { useLocation, Link } from 'react-router-dom';
// Other Utils
import { logout } from "../../Utils/controller";

// Other Components
import CardSearch from "./CardSearch";
import UserSearch from "./UserSearch";

// MUI Components

import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography'
import { IconButton, Button } from "@mui/material";
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

// MUI Icons
import HomeIcon from '@mui/icons-material/Home';

export default function Search() {
    const location = useLocation();
    const workers = location.state?.workers;

    const [tab, setTab] = useState('User');

    const handleTabChange = (event, newValue) => {
        event.preventDefault();
        setTab(newValue);
    };

    return (<>
        <AppBar position="static">
            <Toolbar>
                <Link to={'/home'} style={{
                    textDecoration: 'none',
                    color: 'white'
                }}>
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
                <Typography variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}>
                    Service Desk NITJ
                </Typography>

                <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
        </AppBar>
        <TabContext value={tab}>
            <TabList value={tab} onChange={(handleTabChange)} variant='standard'>
                <Tab label="User" value='User' />
                <Tab label="Tasks" value='Task' />
            </TabList>

            <TabPanel value="User" >
                <UserSearch workers={workers} />
            </TabPanel>

            <TabPanel value="Task" >
                <CardSearch workers={workers} />
            </TabPanel>
        </TabContext>

    </>);
}