//Utils
import { useState } from 'react';

// Components
import Info from './Tabs/Info';
import Desc from './Tabs/Desc';
import Comments from "./Tabs/Comments";

// MUI Components
import { Container, Grid, Paper, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

// MUI Icons
import CloseIcon from '@mui/icons-material/Close';

// const TabPanel = ({ comp, value, index }) => {
//     return (
//         <div hidden={value !== index}>
//             {comp}
//         </div>
//     )
// }

export default function ExpCardlg({ close, theme, workers, data, set, cards, refresh, setRefresh, setCards }) {
    const [tab, setTab] = useState('1');

    const handleTabChange = (event, newValue) => {
        event.preventDefault();
        setTab(newValue);
    };
    const d = new Date(data.createdOn);
    return (
        <ThemeProvider theme={theme}>
            <Container component='main'>
                <Paper elevation={24} sx={{ minHeight: 600 }} >
                    <Button onClick={close}>
                        <CloseIcon sx={{ p: 1 }} />
                    </Button>
                    <Typography sx={{ p: 3, float: 'right' }} variant='h6'>
                        Created On: {d.toDateString()}
                    </Typography>
                    <TabContext value={tab}>
                        <TabList value={tab} onChange={handleTabChange} variant='standard'>
                            <Tab label="Info" value='1' />
                            <Tab label="Comments" value='2' />
                        </TabList>

                        <TabPanel value="1" >
                            <Grid container columns={5}>

                                <Grid item xs={3} lg={3}>
                                    <Desc set={set} data={data} cards={cards} setCards={setCards} />
                                </Grid>

                                <Grid item sx={{
                                    width: "35%"
                                }}>
                                    <Info cards={cards} setCards={setCards} refresh={refresh} setRefresh={setRefresh} set={set} workers={workers} data={data} />
                                </Grid>

                            </Grid>
                        </TabPanel>

                        <TabPanel value="2" >
                            <Comments data={data.comments} id={data._id} />
                        </TabPanel>
                    </TabContext>
                </Paper>
            </Container >
        </ThemeProvider>
    )
};
