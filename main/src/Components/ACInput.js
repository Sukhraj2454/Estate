import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function ACInput({ data, label, defValue, variant }) {
    const [value, setValue] = useState(defValue || '');
    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        title: newValue,
                    });
                } else {
                    setValue(newValue);
                }
            }}
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
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            sx={{ width: 300, ml: 'auto', mr: 'auto', mt: 2, mb: 2 }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params}
                    variant={variant || "standard"}
                    label={label} />
            )}
        />
    );
}
