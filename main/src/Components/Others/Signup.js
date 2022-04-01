// React Library Functions
import { useState, useEffect } from 'react';

// Other Utils
import { handleSignup, getCategories } from '../../Utils/controller';

// Material UI Components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';

// import alerts
import Alert from '../Alerts/Alerts';

export default function Signup({ theme, change }) {

    const [category, setCat] = useState('');
    const [menu, setMenu] = useState([]);
    const [categories, setCats] = useState([]);
    const [desig, setDesig] = useState('Faculty');

    // Snackbar states
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');

    useEffect(() => {
        getCategories(setCats);
    }, []);

    useEffect(() => {
        let ind=0;
        let cats = categories;
        let menu = cats.map((cat) => <MenuItem key={ind++} value={cat}>{cat}</MenuItem>);
        setMenu(menu);
    }, [categories]);

    function handleCatChange(event) {
        setCat(event.target.value);
    }
    function handleChange(event) {
        setDesig(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        handleSignup(data, desig, category, setMessage, setSeverity, setOpen);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth='xs'>

                {/*  Alerts */}
                <Alert open={open} severity={severity} setOpen={setOpen} message={message} />

                <Box                // Used to define any block element
                    sx={{           // Accepts all CSS or any valid properties
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="Phone No."
                            type="text"
                            id="phone"
                        />
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="desig-label">Desig.</InputLabel>
                            <Select
                                labelId="desig-label"
                                id="desig-select"
                                value={desig}
                                label="Category"
                                onChange={handleChange}
                            >
                                <MenuItem value={'Faculty'}>Faculty</MenuItem>
                                <MenuItem value={'Worker'}>Worker</MenuItem>
                                <MenuItem value={'Admin'}>Admin</MenuItem>
                            </Select>
                        </FormControl>
                        {desig === 'Admin' &&
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="category"
                                label="Category"
                                type="text"
                                id="category"
                            />}
                        {
                            desig === 'Worker' &&
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category-select"
                                    value={category}
                                    label="Category"
                                    onChange={handleCatChange}
                                >
                                    {menu}
                                </Select>
                            </FormControl>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
                <Grid container>
                    <Grid item>
                        <Link href='#Signup' onClick={change} variant="body2">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}