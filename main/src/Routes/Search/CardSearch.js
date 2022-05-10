// React Utils
import { useState } from 'react';

// Other Utils
import { findTask } from '../../Utils/controller';
import useWidth from '../../Utils/useWidth';

// MUI Components

import { createTheme } from '@mui/material/styles';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useEffect } from 'react';

// Other Components
import TaskCardLV from '../../Components/Card/TaskCardLV';

export default function CardSearch({ workers }) {
    const [value, setVal] = useState('');
    const [res, setRes] = useState({});
    const [list, setList] = useState('');

    const sz = useWidth();
    const theme = createTheme();

    useEffect(() => {
        if (res.message) {
            setList(<Typography variant='h6'>
                {res.message}
            </Typography>);
        }
        else if (res.taskId) {
            setList(<TaskCardLV
                data={res}
                workers={workers}
                sz={sz}
                theme={theme}
            />
            )
        }
        // eslint-disable-next-line
    }, [res]);

    return (<>
        <TextField
            value={value}
            onChange={(e) => { setVal(e.target.value) }}
            fullWidth
            label='Search Task'
            placeholder='Enter Task Id'
        />
        <Button variant='contained' sx={{ m: 1 }}
            onClick={() => { findTask(setRes, value) }}
        >
            Search
        </Button>
        <Container
            component='main' maxWidth='xl'
            sx={{ border: '1px solid black', minHeight: 400, mt: 1 }}
        >
            {list}
        </Container>
    </>)
}