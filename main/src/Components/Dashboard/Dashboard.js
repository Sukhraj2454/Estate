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


    useEffect(() => {
        getUser(setUser)
    }, [setUser]);
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
    })
    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ mt: 1 }} component='main' maxWidth='xl'>
                <Typography textAlign={'center'} gutterBottom component='h1' variant='h4'>Welcome,{user.name}</Typography>
                <MyTasksTab theme={theme} user={user} workers={workers} />
            </Container>
        </ThemeProvider >
    )
}