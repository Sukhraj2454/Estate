//Utils
import { useState } from 'react'

// Components
import Info from './Tabs/Info';
import Desc from './Tabs/Desc';
import Comments from "./Tabs/Comments";

// MUI Components
import { Container, Grid, Paper, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// MUI Icons
import CloseIcon from '@mui/icons-material/Close';


export default function ExpCardlg({ close, theme }) {
    const [tab, setTab] = useState(0);


    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component='main'>
                <Paper elevation={24} sx={{ minHeight: 600 }} >

                    <Button onClick={close}>
                        <CloseIcon sx={{ p: 1 }} />
                    </Button>

                    <Tabs value={tab} onChange={handleTabChange}>
                        <Tab label="Info" />
                        <Tab label="Comments" />
                    </Tabs>

                    {(tab === 0) ?
                        (
                            <Grid container columns={5}>

                                <Grid item xs={3} lg={3}>
                                    <Desc />
                                </Grid>

                                <Grid item sx={{
                                    width: "35%"
                                }}>
                                    <Info />
                                </Grid>

                            </Grid>

                        ) :
                        <Comments />}
                </Paper>
            </Container >
        </ThemeProvider>
    )
};
