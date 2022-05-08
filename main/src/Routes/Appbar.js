// React Utils
import { Link } from 'react-router-dom';

// MUI Components
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { Typography, Button } from '@mui/material';

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

export default function Appbar({ workers, handleDrawerOpen, handleLogout }) {

    return (<AppBar position="static">
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

            <Link to={{
                pathname: '/search',
                state: { workers: workers },
            }} style={{ color: 'white' }}>

                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <SearchIcon />
                </IconButton>
            </Link>

            <Link to={{
                pathname: '/user',
                state: { worker: 'user', workers: workers },
            }} style={{ color: 'white' }}>

                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <PersonIcon />
                </IconButton>
            </Link>

            <Button color="inherit" onClick={handleLogout}>Logout</Button>

        </Toolbar>
    </AppBar>)
} 