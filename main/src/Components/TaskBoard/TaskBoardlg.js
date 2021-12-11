// Material UI Components
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function TaskBoardlg({ theme }) {

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xl'>
                <Grid container spacing={3} justifyContent={'center'} sx={{ mt: 7 }} >
                    <Grid item sm={3} xs={8}>
                        <Paper variant='outlined' sx={{ background: '#eee', minHeight: 600, height: 'maxContent', width: '100%' }} />
                    </Grid>
                    <Grid item sm={3} xs={8}>
                        <Paper variant='outlined' sx={{ background: '#eee', minHeight: 600, height: 'maxContent', width: '100%' }} />
                    </Grid>
                    <Grid item sm={3} xs={8}>
                        <Paper variant='outlined' sx={{ background: '#eee', minHeight: 600, height: 'maxContent', width: '100%' }} />
                    </Grid>
                    <Grid item sm={3} xs={8}>
                        <Paper variant='outlined' sx={{ background: '#eee', minHeight: 600, height: 'maxContent', width: '100%' }} />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )

}