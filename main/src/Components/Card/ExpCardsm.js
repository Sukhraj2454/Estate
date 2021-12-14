
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

export default function ExpCardlg({ close, theme }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component='main'>
                <Paper elevation={24} sx={{ minHeight: 600 }} >

                    <Button onClick={close}>
                        <CloseIcon sx={{ p: 1 }} />
                    </Button>

                    <Tabs centered
                        value={value} 
                        onChange={handleChange}>
                        <Tab label="Description" />
                        <Tab label="Info" />
                        <Tab label="Comments" />
                    </Tabs>

                    <div hidden={value !== 0}>
                        <Desc />
                    </div>
                    <div hidden={value !== 1}>
                        <Info theme={theme} />
                    </div>
                    <div hidden={value !== 2}>
                        <Comments />
                    </div>

                </Paper>
            </Container >
        </ThemeProvider>
    )
};
