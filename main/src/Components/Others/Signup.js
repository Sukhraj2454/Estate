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

    const [branch, setBranch] = useState('');
    const [category, setCat] = useState('');
    const [subCategory, setSubCat] = useState('');
    const [menuBranch, setMenuBr] = useState([]);
    const [menuCat, setMenuCat] = useState([]);
    const [menuSubCat, setMenuSubCat] = useState([]);
    const [categories, setCats] = useState([]);
    const [desig, setDesig] = useState('Worker');

    // Snackbar states
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');

    useEffect(() => {
        getCategories(setCats);
    }, []);

    useEffect(() => {
        let ind = 0;
        let x = categories.map(cat => <MenuItem key={ind++} value={cat.name}>{cat.name}</MenuItem>);
        setMenuBr(x);
    }, [categories]);

    useEffect(() => {
        let x = categories.filter(cat => cat.name === branch);
        if (x.length > 0) {
            let ind = 0;
            setCat(x[0].category[0].name);
            let y = x[0].category.map(cat => <MenuItem key={ind++} value={cat.name}>{cat.name}</MenuItem>);
            setMenuCat(y);
        }
    }, [branch, categories]);

    useEffect(() => {
        let x = categories.filter(cat => cat.name === branch);
        if (x.length > 0) {
            let ind = 0;
            let y = x[0].category.filter(cat => cat.name === category);
            setSubCat(y[0].subCategory[0].name);
            let z = y[0].subCategory.map(cat => <MenuItem key={ind++} value={cat.name}>{cat.name}</MenuItem>);
            setMenuSubCat(z);
        }
        // eslint-disable-next-line
    }, [category, categories, setSubCat, setMenuSubCat]);
    // function handleCatChange(event) {
    //     setBranch(event.target.value);
    // }
    // function handleChange(event) {
    //     setDesig(event.target.value);
    // }
    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        handleSignup(data, desig, branch, setMessage, setSeverity, setOpen);
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
                                label="Desig"
                                onChange={(e) => { setDesig(e.target.value) }}
                            >
                                <MenuItem value={'Faculty'}>Faculty</MenuItem>
                                <MenuItem value={'Non Faculty'}>Non Faculty</MenuItem>
                                <MenuItem value={'Worker'}>Worker</MenuItem>
                                <MenuItem value={'EE'}>Executive Engineer(EE)</MenuItem>
                                <MenuItem value={'AE'}>Assistant Engineer(AE)</MenuItem>
                                <MenuItem value={'JE'}>Junior Engineer(JE)</MenuItem>
                            </Select>
                        </FormControl>
                        {
                            (desig === 'Worker') &&
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="branch-label" required>Branch</InputLabel>
                                <Select
                                    labelId="branch-label"
                                    id="branch-select"
                                    value={branch}
                                    label="Branch"
                                    onChange={(e) => { setBranch((e.target.value)) }}
                                >
                                    {menuBranch}
                                </Select>
                            </FormControl>
                        }
                        {
                            (desig === 'Worker' && branch !== '') &&
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="category-label" required>Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category-select"
                                    value={category}
                                    label="Category"
                                    onChange={(e) => { setCat((e.target.value)) }}
                                >
                                    {menuCat}
                                </Select>
                            </FormControl>
                        }
                        {
                            (desig === 'Worker' && category !== '') &&
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="sub-category-label" required>Sub-Category</InputLabel>
                                <Select
                                    labelId="sub-category-label"
                                    id="sub-category-select"
                                    value={subCategory}
                                    label="Sub-Category"
                                    onChange={(e) => { setSubCat((e.target.value)) }}
                                >
                                    {menuSubCat}
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