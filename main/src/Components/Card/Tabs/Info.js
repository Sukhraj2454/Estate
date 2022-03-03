
// React  Utils
import { useState } from 'react'

// Components
import ACInput from "../../Others/ACInput";

// MUI Components
import { Container } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Info({ theme, workers, data, set }) {
    const [priority, setPriority] = useState(data ? (data.priority === 2 ? 'High' : 'Medium') : '');
    const [status, setStatus] = useState(data ? data.status : '');
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
        set[1](event.target.value === 'Medium' ? 1 : 2);
    };
    return (
        <Container component={'main'} maxWidth='sm'>

            <ACInput theme={theme} variant='outlined'
                setTitle={set[2]}
                defValue={
                    {
                        title: data.assignee.name,
                        id: data.assignee.id
                    }}
                data={workers}
                label={"Assignee"} />

            <ACInput theme={theme} variant='outlined'
                defValue={{
                    title: data.reporter.name,
                    id: data.reporter.id
                }}
                data={workers}
                label={"Reporter"} />


            <FormControl fullWidth sx={{ mb: 3, mt: 3 }}>
                <InputLabel id="priority-select-label">Priority</InputLabel>
                <Select
                    labelId="priority-select-label"
                    id="priority-select"
                    value={priority}
                    label="Status"
                    onChange={handlePriorityChange}
                >
                    <MenuItem value={'Medium'}>Medium</MenuItem>
                    <MenuItem value={'High'}>High</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                    labelId="status-select-label"
                    value={status}
                    label="Status"
                    onChange={handleStatusChange}
                >
                    <MenuItem value={'To Do'}>To Do</MenuItem>
                    <MenuItem value={'In Progress'}>In Progress</MenuItem>
                    <MenuItem value={'Review'}>Review</MenuItem>
                    <MenuItem value={'Completed'}>Completed</MenuItem>
                </Select>
            </FormControl>
        </Container>)
}

export default Info;