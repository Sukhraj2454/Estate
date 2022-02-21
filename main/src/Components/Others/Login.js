
// React Libraries and other Utils
import axios from 'axios';
import { useState } from 'react';

// Material UI Components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

// Other Components
import Alert from '../Alerts/Alerts';

const BASE_URL = process.env.URL || '';

const Login = function ({ theme, change }) {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post(`${BASE_URL}/user/login`,
            {
                email: data.get('email'),
                password: data.get('password'),
            })
            .then((res) => {
                const header = res.headers['x-auth']
                sessionStorage.setItem('x-auth', header);
                setMessage("Login Successful.");
                setSeverity("success");
                setOpen(true);
                window.location.href = "/home"; // Successful Login
            })
            .catch(err => {
                console.clear();
                if (err.response) {

                    setMessage(err.response.data.message);
                    setSeverity("error");
                    setOpen(true);
                }
            })
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth='xs'>
                {/*  Alerts */}
                <Alert open={open} severity={severity} setOpen={setOpen} message={message} />


                <Box                // Used to define any block element
                    sx={{           // Accepts all CSS or any valid properties
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            type="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
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
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#Login" onClick={change} variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default Login;