import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function ACInput({ data, label, defValue, variant, setTitle }) {
    const [value, setValue] = useState(defValue || '');
    return (
        <Autocomplete
            value={value}
            onChange={
                (event, newValue) => {
                    if(newValue === null)
                    {
                        setValue(newValue)
                        setTitle({
                            name:'',id:''
                        })
                    }
                    else if (typeof newValue === 'string') {
                        setValue({
                            title: newValue,
                        });
                        setTitle({
                            name: newValue,
                            id: ''
                        });
                    } else {
                        setValue(newValue);
                        setTitle({ name: newValue.title, id: newValue.id });
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
            renderOption={(props, option) => <li  {...props} key={option.id || option.title || option}>{option.title}</li>}
            sx={{ width: 300, ml: 'auto', mr: 'auto', mt: 2, mb: 2 }}
            renderInput={(params) => (
                <TextField {...params}
                    variant={variant || "standard"}
                    label={label} />
            )}
        />
    );
}
ACInput.defaultProps = {
    setTitle: () => { }
}
