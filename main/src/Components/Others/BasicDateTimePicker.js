// React Utils
import { useState, useEffect, useRef } from 'react';

// Other Utils
import { updateDate } from '../../Utils/controller';

// MUI Components
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import { Container } from '@mui/material';

export default function BasicDateTimePicker({ name, disabled, date, minDate, tId }) {
  const valueRef = useRef(date);
  const [value, setValue] = useState(date);
  useEffect(() => {
    if (value !== null && value !== valueRef.current) {
      // console.log(value)
      // console.log(date)
      valueRef.current = value;
      updateDate(value, tId);
    }
  }, [value, date, tId]);
  return (
    <Container sx={{ mt: 2, mb: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDateTimePicker
          clearable
          label={name}
          showTodayButton
          todayText="Current Time"
          value={value}
          minDate={minDate}
          disabled={disabled}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Container>
  );
}
BasicDateTimePicker.defaultProps = {
  disabled: false,
  name: 'DateTimePicker',
  date: new Date(),
  minDate: new Date()
}
