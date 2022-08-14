// React Utils
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Other Utils
import { getUsers } from '../../Utils/controller';

// MUI Components
import { Container, TextField, Typography } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
const filter = createFilterOptions();

const User = function ({ op, workers, clr }) {
    const [css, setCss] = useState({ backgroundColor: 'black', textDecoration: 'none', color: 'black' });
    return (
        <Link
            style={css}
            onMouseEnter={() => {
                setCss({ backgroundColor: 'black', textDecoration: 'none', color: '#1976D2' })
            }}
            onMouseLeave={() => {

                setCss({ backgroundColor: 'black', textDecoration: 'none', color: 'black' })
            }}
            to={{
                pathname: '/user',
                state: { worker: op, workers: workers }
            }} >
            <Typography variant='h6' sx={{ bgcolor: clr }}>
                {op.title}
            </Typography>
        </Link>
    )
}

export default function UserSearch({ workers }) {

    const [data, setData] = useState([]);
    const [users, setUsers] = useState(workers);
    const [list, setList] = useState([]);

    useEffect(() => {
        getUsers(setData);
    }, []);

    const getOptionLabel = (option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
            return option;
        }
        // Regular option
        return option.title;
    }

    useEffect(() => {
        var col = false;
        if(users)
        {
            let temp = users.map(op => {

            col = !col;
            return (<User
                clr={col ? "#EEEEEE" : "white"}
                key={op.id}
                op={op}
                workers={workers} />)
        })
        setList(temp);
    }
        else setList([])
    }, [workers, users, setList]);

    return (<>
        <TextField
            fullWidth
            label='Search User'
            onChange={
                (e) => {
                    const filtered = filter(data, { inputValue: e.target.value, getOptionLabel: getOptionLabel });
                    setUsers(filtered);
                }
            } />

        <Container
            component='main' maxWidth='xl'
            sx={{ border: '1px solid black', minHeight: 460, mt: 1 }}
        >
            {list}
        </Container>
    </>)
}