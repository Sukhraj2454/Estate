// React Utils
import { useEffect, useState } from "react";

// Other Utils
// import ACInput from "../Others/ACInput";
import { getUserTasks, getUser } from '../../Utils/controller';
import useWidth from "../../Utils/useWidth";

// MUI Compoenents
import { Container, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

// Other Components
import Branch from './Tabs/Branch';
import MyTasks from './Tabs/MyTasks';

// MUI Icons
import RefreshIcon from '@mui/icons-material/Refresh';
function MyTasksTab({ user, theme, workers }) {

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(1);
    const sz = useWidth();

    useEffect(() => {
        getUserTasks(setCards, setLoading);
    }, [refresh]);

    const handleRefresh = () => {
        setLoading(true);
        let x = refresh;
        setRefresh(!x);
    }


    return (user.desig === 'EE' || user.desig === 'AE' || user.desig === 'JE') ? <Branch /> :
        (<>
            <LoadingButton
                size="medium"
                onClick={handleRefresh}
                loading={loading}
                loadingPosition="start"
                startIcon={<RefreshIcon />}
            >
                REFRESH
            </LoadingButton>
            < MyTasks user={user}
                cards={cards}
                setCards={setCards}
                workers={workers}
                theme={theme} sz={sz} />
        </>)

}
export default function Dashboard({ theme, workers }) {
    const [user, setUser] = useState({ 'name': '' });
    const [tab, setTab] = useState('30');

    useEffect(() => {
        getUser(setUser)
    }, [setUser]);
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
    });

    const handleTabChange = (event, newValue) => {
        event.preventDefault();
        setTab(newValue);
    };
    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ mt: 1 }} component='main' maxWidth='xl'>
                <Typography textAlign={'left'}
                    component='h1'
                    variant='h4'>
                    Welcome,{user.name}
                </Typography>

                <TabContext value={tab}>
                    <TabList value={tab} onChange={handleTabChange} variant='standard'>
                        <Tab label="Main" value='30' />
                        <Tab label="Summary" value='31' />
                    </TabList>

                    <TabPanel value="30" >
                        <MyTasksTab theme={theme} user={user} workers={workers} />
                    </TabPanel>
                </TabContext>
            </Container>
        </ThemeProvider >
    )
}