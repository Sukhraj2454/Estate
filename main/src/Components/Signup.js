// React Library Functions
import { useState } from 'react';

// Other Utils
import axios from 'axios';

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
import SuccessSignup from './Alerts/SuccessSignup';
import ErrorSignup from './Alerts/ErrorSignup';

// Environment Variables
const BASE_URL = '';


export default function Signup({ theme, change }) {

    const [desig, setDesig] = useState('Worker');
    const [open, setOpen] = useState(false);
    const [er, setEr] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setDesig(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post(`${BASE_URL}/user/signup`, {

            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            contact: data.get('phone'),
            desig: desig

        }).then((res, err) => {
            // alert(res.data.message);
            setOpen(true)

        }).catch(err => {
            console.clear();
            if (err.response && err.response.status === 409) {
                setMessage("Email Address Already Registered!");
            }
            else {
                setMessage("Internal Server Error!");
            }
            setEr(true);
        })
    };


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth='xs'>

                {/*  Alerts */}
                <SuccessSignup open={open} setOpen={setOpen} />
                <ErrorSignup open={er} setOpen={setEr} message={message}/>

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
                            <InputLabel id="desig-label">Desig</InputLabel>
                            <Select
                                labelId="desig-label"
                                id="desig-select"
                                value={desig}
                                label="Desig"
                                onChange={handleChange}
                            >
                                <MenuItem value={'User'}>User</MenuItem>
                                <MenuItem value={'Worker'}>Worker</MenuItem>
                            </Select>
                        </FormControl>
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