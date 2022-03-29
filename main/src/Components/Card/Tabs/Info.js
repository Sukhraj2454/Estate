// React  Utils
import { useState, useEffect, useRef } from 'react'

// Other Utils
import { updateStatus, updatePriority } from '../../../Utils/controller';

// Components
import ACInput from "../../Others/ACInput";

// MUI Components
import { Container } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Info({ theme, workers, data, set, cards, setCards }) {
    const firstStatusRender = useRef(true);
    const firstPriorityRender = useRef(true);
    const [priority, setPriority] = useState(data ? (data.priority === 2 ? 'High' : 'Medium') : '');
    const [status, setStatus] = useState(data ? data.status : 'To Do');
    // useEffect(() => {

    //     firstStatusRender.current = true;
    //     firstPriorityRender.current = true;
    // }, [])
    const handleStatusChange = (event) => {

        setStatus(event.target.value);

    };

    useEffect(() => {
        setPriority(data.priority === 2 ? 'High' : 'Medium');
        setStatus(data.status);
        set[2](data.assignee);
        set[3](data.reporter);
    }, [cards]);


    const handlePriorityChange = (event) => {

        setPriority(event.target.value);
        set[1](event.target.value === 'Medium' ? 1 : 2);

    };

    useEffect(() => {
        if (firstStatusRender.current) {
            firstStatusRender.current = false;
            return;
        }       // referece for not calling function if loading component for first time.
        updateStatus(status, data._id);
    }, [status, data._id]);

    useEffect(() => {
        if (firstPriorityRender.current) {
            firstPriorityRender.current = false;
            return;
        }   // referece for not calling function if loading component for first time.
        updatePriority(priority, data._id);
    }, [priority, data._id]);

    return (
        <Container component={'main'} maxWidth='sm'>

            <ACInput theme={theme} variant='outlined'
                setTitle={set[2]}
                defValue={{
                    title: data.assignee.name,
                    id: data.assignee.id
                }}
                data={workers}
                label={"Assignee"} />

            <ACInput theme={theme} variant='outlined'
                setTitle={set[3]}
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
Info.defaultProps = {
    setCards: () => { },
    cards: []
}
export default Info;