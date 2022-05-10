// React Utils
import { useState } from "react";

// Other Utils
import { addJob, updateJob, changeJobStatus, verifyJob } from '../../../Utils/controller';

// MUI Components
import { Container, TextField, Button, Typography, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { useEffect } from "react";
import { Chip, Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

// Other Components
import ACInput from "../../Others/ACInput";

// Mui Icons
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Chips({ material, setMaterial }) {
    const [comp, setComp] = useState([]);

    const handleDelete = (data) => {
        setMaterial((material) => material.filter((chip) => chip !== data));
    };

    useEffect(() => {
        const temp = material.map((val) =>
            <Chip
                label={val}
                key={val}
                onDelete={() => { handleDelete(val) }} />)
        setComp(temp);
        // eslint-disable-next-line
    }, [material, setComp]);


    return (<Stack direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}>
        {comp}
    </Stack>)
}
function CreateJob({ workers, theme, tId }) {
    const [jobTitle, setJT] = useState('');
    const [assignee, setAssignee] = useState({});
    function handleSubmit() {
        console.log(jobTitle, assignee, tId)
        addJob(tId, assignee, jobTitle);
    }
    return (<>
        <Accordion>

            <AccordionSummary
                expandIcon={<AddIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Create Job</Typography>
            </AccordionSummary>

            <AccordionDetails>

                <TextField sx={{ mt: 2 }}
                    label='Job Title'
                    fullWidth
                    value={jobTitle}
                    onChange={(e) => { setJT(e.target.value) }} />


                <ACInput theme={theme} variant='outlined'
                    setTitle={setAssignee}
                    fullWidth
                    data={workers}
                    label={"Assignee"} />

                <Button
                    onClick={handleSubmit}
                    variant='contained'
                    sx={{ m: 2 }}>Add Job</Button>
            </AccordionDetails>
        </Accordion></>
    )
}

function Job({ data, ind, theme, workers, tId, user, reporter }) {
    const [jobTitle, setJT] = useState(data.job || '');
    const [status, setStatus] = useState(data.status || 'In Progress')
    const [assignee, setAssignee] = useState(data.assignee || {});
    const [mat, setMat] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [material, setMaterial] = useState(data.materialUsed || []);

    return (
        <Accordion>

            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Stack direction={{ xs: 'column', sm: 'row' }}>
                    <Typography noWrap width={200}>{jobTitle}</Typography>
                    <Typography >Status:</Typography>
                    <Typography color={(status === 'Completed' || status === 'Verified') ? 'primary' : 'secondary'}>  {status}</Typography>

                </Stack>
            </AccordionSummary>

            <AccordionDetails>

                <TextField sx={{ mt: 2 }}
                    label='Job Title'
                    fullWidth
                    value={jobTitle}
                    onChange={(e) => { setJT(e.target.value) }}
                    disabled={status === 'Completed'} />


                <ACInput theme={theme} variant='outlined'
                    defValue={{ title: assignee.name, id: assignee.id }}
                    setTitle={setAssignee}
                    fullWidth
                    data={workers}
                    disabled={status === 'Completed'}
                    label={"Assignee"} />

                <OutlinedInput
                    sx={{ mt: 2, mb: 2 }}
                    value={mat}
                    disabled={status === 'Completed'}
                    placeholder='Material Used'
                    fullWidth
                    onChange={(e) => { setMat(e.target.value); }}
                    startAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                label='Material Used'
                                aria-label="add material"
                                onClick={() => {
                                    let temp = material.slice();
                                    if (!(temp.includes(mat))) {
                                        temp.push(mat);
                                        setMat('');
                                        setMaterial(temp);
                                    }
                                    else setMat('')
                                }}
                                disabled={mat === '' || status === 'Completed'}
                                edge="start"
                            >
                                <AddCircleIcon color={mat === '' ? '' : 'success'} />
                            </IconButton >
                        </InputAdornment>
                    }
                />
                <Chips material={material} setMaterial={setMaterial} />

                <Button variant='contained'
                    sx={{ mt: 2 }}
                    disabled={status === 'Completed' || status === 'Verified'}
                    onClick={() => {
                        updateJob(tId, ind, assignee, jobTitle, material)
                    }}
                >
                    Update Job Card
                </Button>

                <Button
                    variant='contained' sx={{ ml: 2, mt: 2 }}
                    color={status !== 'Completed' ? 'success' : 'primary'}
                    disabled={disabled || reporter.id === user._id}
                    onClick={
                        () => {
                            setDisabled(true)
                            if (status === 'Completed') {
                                changeJobStatus(tId, 'In Progress', ind, setDisabled, setStatus)
                            }
                            else { changeJobStatus(tId, 'Completed', ind, setDisabled, setStatus) }
                        }
                    }
                >
                    {status !== 'Completed' ? 'Complete Job' : 'In Progress'}
                </Button>

                <Button
                    disabled={status !== 'Completed' || status === 'Verified' || reporter.id !== user._id}
                    variant='contained' sx={{ ml: 2, mt: 2 }}
                    onClick={() => { verifyJob(tId, ind, setStatus); }}
                    color='success'>
                    Verify Completion
                </Button>
            </AccordionDetails>
        </Accordion >
    )
}
export default function JobCard({ data, workers, theme }) {

    // eslint-disable-next-line
    const [jobs, setJobs] = useState(data.jobCard || "No Jobs Found. You Can Create New Job.");
    const user = JSON.parse(sessionStorage.getItem('user'))
    useEffect(() => {
        setJobs(data.jobCard || "No Jobs Found. You Can Create New Job.");
    }, [data]);
    return (
        <Container sx={{ height: 450, overflowY: 'scroll' }}>

            <CreateJob workers={workers} theme={theme} tId={data._id} />

            <Typography variant="h5" sx={{
                m: 1,
                textDecoration: 'underline',
                textAlign: 'center'
            }} gutterBottom >Jobs</Typography>

            {(typeof (jobs) === 'object') ? jobs.map((job, index) =>
                <Job key={index}
                    tId={data._id}
                    data={job}
                    ind={index}
                    reporter={data.reporter}
                    user={user}
                    theme={theme}
                    workers={workers} />
            ) : { jobs }}
        </Container>
    )
}