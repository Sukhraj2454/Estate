// React Utils

// Other Utils
import stringAvatar from '../Utils/stringAvatar';

// MUI Compoenents
import { Box, Grid, Avatar, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

// Mui Icons

export default function Dashboard({ theme }) {
    return (
        <ThemeProvider theme={theme}>
            <Box component='div' sx={{ mt: 1 }}>
                <Grid container height={620} sx={{ m: 0, p: 0 }}>
                    <Grid item xs={2}>
                        {/* <Avatar sx={{ margin: 0 }} {...stringAvatar('Sukhraj Singh')} /> */}
                        <Typography textAlign={'center'} component='h1' variant='h5'>Sukhraj Singh</Typography>
                    </Grid>
                    <Grid item xs={10} sx={{ background: 'blue' }}>

                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    )
}