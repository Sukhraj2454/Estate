
// React  Utils
import { useState } from 'react'

// Components
import Comments from "./Tabs/Comments";
import Desc from './Tabs/Desc';
import Info from './Tabs/Info';

// MUI Components
import { Container, Paper, Button } from "@mui/material"
import { ThemeProvider } from "@mui/material";
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

// MUI Icons
import CloseIcon from '@mui/icons-material/Close';

export default function ExpCardsm({ close, theme, refresh, setRefresh, workers, data, set, cards, setCards }) {
    const [tabesm, setTabEsm] = useState('0');

    const handleTabChange = (event, newValue) => {
        setTabEsm(newValue);
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component='main'>
                <Paper elevation={24} sx={{ minHeight: 600 }} >

                    <Button onClick={close}>
                        <CloseIcon sx={{ p: 1 }} />
                    </Button>
                    <TabContext value={tabesm}>
                        <TabList
                            variant="scrollable"
                            scrollButtons
                            onChange={handleTabChange}>
                            <Tab label="Description" value='0' />
                            <Tab label="Info" value='1' />
                            <Tab label="Comments" value='2' />
                        </TabList>


                        <TabPanel value='0'>
                            <Desc set={set} data={data} cards={cards} setCards={setCards} />
                        </TabPanel>

                        <TabPanel value='1'>
                            <Info cards={cards} setCards={setCards} refresh={refresh} setRefresh={setRefresh} set={set} theme={theme} workers={workers} data={data} />
                        </TabPanel>

                        <TabPanel value='2'>
                            <Comments data={data.comments} id={data._id} />
                        </TabPanel>
                    </TabContext>
                </Paper>
            </Container >
        </ThemeProvider>
    )
};
