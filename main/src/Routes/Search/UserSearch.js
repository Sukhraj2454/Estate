// React Utils
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Other Utils
import { getUsers } from '../../Utils/controller';

// MUI Components
import { Container, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();


export default function UserSearch({ workers, setList }) {
    useEffect(() => {
        getUsers(setData);
    }, []);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState('');
    useEffect(() => {

        console.log(users)
    }, [users]);

    useEffect(() => {
        let temp = users.map(op =>
        (<Link key={op._id} to={{
            pathname: '/user',
            state: { worker: op, workers: workers }
        }} />)
        )
        setList(temp);
    }, [users]);
    return (<>
        <Autocomplete

            value={value}

            onChange={
                (event, newValue) => {
                    if (newValue === null) {
                        setValue(newValue)
                    }
                    else if (typeof newValue === 'string') {
                        setValue({
                            title: newValue,
                        });
                    } else {
                        setValue(newValue);
                    }
                }
            }
            filterOptions={filter}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={data}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Regular option
                return option.title;
            }}
            freeSolo
            sx={{ width: '20%', ml: 'auto', mr: 'auto', }}
            renderOption={(props, option) => <li  {...props} key={option.id || option.title || option}>{option.title}</li>}
            renderInput={(params) => (
                <TextField {...params}
                    variant={"standard"}
                    label='User' />
            )}
        />
    </>)
}