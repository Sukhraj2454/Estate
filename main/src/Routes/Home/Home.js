import { useState } from 'react';

import Login from '../../Components/Login';
import Signup from '../../Components/Signup';
import { createTheme } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

const Home = function () {

    const theme = createTheme();
    const [flag, setFlag] = useState(true)
    const LS = () => {
        setFlag(!flag);
    }

    return (
        <Container component="main" maxWidth="xl" sx={{ userSelect: "none" }}>

            <Typography component='h1' variant="h4"
                sx={{
                    background: "#1565C0",
                    padding: 5,
                    textAlign: "center",
                    color: "white"
                }}
            >
                NITJ Estate Service Portal
            </Typography>

            {
                flag ? <Login theme={theme} change={LS} /> :
                    <Signup theme={theme} change={LS} />
            }

        </Container>
    )
}
export default Home;