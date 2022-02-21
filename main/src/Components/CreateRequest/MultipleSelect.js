import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
    
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Priority = [
  'High',
  'Medium',
  'Normal',
];

function getStyles(priority, Priority, theme) {
  return {
    fontWeight:
      Priority.indexOf(priority) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({theme}) {
  const [priority, setPriority] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPriority(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 0, width: 200, maxWidth:"100%" }}>
        <InputLabel id="demo-multiple-name-label">Prioity</InputLabel>
        <Select
        defaultValue={'Normal'}
          labelId="priotritylabel"
          id="demo-multiple-name"
          value={priority}
          onChange={handleChange}
          input={<OutlinedInput label='Priority' />}
          MenuProps={MenuProps}
        >
          {Priority.map((priority) => (
            <MenuItem
              key={priority}
              value={priority}
              style={getStyles(priority, Priority, theme)}
            >
              {priority}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}