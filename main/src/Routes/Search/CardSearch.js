// React Utils
import { useState, useEffect } from 'react';

// Other Utils
import { getUsers } from '../../Utils/controller';

// MUI Components
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function UserSearch({ variant }) {
    useEffect(() => {
        getUsers(setData);
    }, []);

    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    return <Autocomplete
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
        filterOptions={(options, params) => {
            const filtered = filter(options, params);
            return filtered;
        }}
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
        // renderOption={(props, option) => <li  {...props} key={option.id || option.title || option}>{option.title}</li>}
        renderInput={(params) => (
            <TextField {...params}
                variant={variant || "standard"}
                label='Task' />
        )}
    />
}