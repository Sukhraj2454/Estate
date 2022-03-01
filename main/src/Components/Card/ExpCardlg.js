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

const TabPanel = ({ comp, value, index }) => {
    return (
        <div
            hidden={value !== index}
        >{comp}</div>

    )
}

export default function ExpCardlg({ close, theme, workers, data }) {
    const [tab, setTab] = useState(10);


    const handleTabChange = (event, newValue) => {
        event.preventDefault();
        setTab(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component='main'>
                <Paper elevation={24} sx={{ minHeight: 600 }} >

                    <Button onClick={close}>
                        <CloseIcon sx={{ p: 1 }} />
                    </Button>

                    <Tabs value={tab} onChange={handleTabChange} variant='standard'>
                        <Tab label="Info" value={10} />
                        <Tab label="Comments" value={11} />
                    </Tabs>

                    <TabPanel value={tab} index={10}
                        comp={
                            <Grid container columns={5}>

                                <Grid item xs={3} lg={3}>
                                    <Desc data={data} />
                                </Grid>

                                <Grid item sx={{
                                    width: "35%"
                                }}>
                                    <Info workers={workers} data={data} />
                                </Grid>

                            </Grid>

                        }
                    />
                    <TabPanel value={tab} index={11} comp={<Comments />} />
                </Paper>
            </Container >
        </ThemeProvider>
    )
};
