
// React  Utils
import { useState } from 'react'

// Components
import Comments from "./Tabs/Comments";
import Desc from './Tabs/Desc';
import Info from './Tabs/Info';

// MUI Components
import { Container, Paper, Button } from "@mui/material"
import { ThemeProvider } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// MUI Icons
import CloseIcon from '@mui/icons-material/Close';

export default function ExpCardsm({ close, theme, workers, data }) {
    const [tabesm, setTabEsm] = useState(20);

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

                    <Tabs
                        value={tabesm}
                        variant="scrollable"
                        scrollButtons
                        onChange={handleTabChange}>
                        <Tab label="Description" value={20} />
                        <Tab label="Info" value={21} />
                        <Tab label="Comments" value={22} />
                    </Tabs>

                    <div hidden={tabesm !== 20}>
                        <Desc data={data} />
                    </div>
                    <div hidden={tabesm !== 21}>
                        <Info theme={theme} workers={workers} data={data} />
                    </div>
                    <div hidden={tabesm !== 22}>
                        <Comments />
                    </div>

                </Paper>
            </Container >
        </ThemeProvider>
    )
};
