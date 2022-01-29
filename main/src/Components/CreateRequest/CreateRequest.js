import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import SendIcon from '@material-ui/icons/Send';
import { TextareaAutosize, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import MultipleSelect from './MultipleSelect';
import BasicDateTimePicker from './BasicDateTimePicker';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Autofillele from './Autofillele';

export default function CreateRequest({ theme }) {
    const [Title,setTitle]=React.useState('');
  const [TypeOfWork,setTypeOfWork]=React.useState('');
  const [Description,setDecription]=React.useState('');
  const [Assignee,setAssignee]=React.useState('');
  const [Reporter,setReporter]=React.useState('');
    return (<Stack  
        color={"primary"}
        direction="column" spacing={2} margin={3}  alignItems="center">
        <Typography numberoflines={1} fontSize={"125%"} color={"primary"}> <AddCircleRoundedIcon  fontSize='20' color='#1976D2' ></AddCircleRoundedIcon>  Create a Request </Typography>
        <Box
          sx={{
            width: 500,
            minWidth:300,
            maxWidth: '100%',
          }}
        > <TextField
        onChange={(e)=>setTitle(e.target.value)}
        fullWidth label="Title" id="title" />
        </Box>
        <Box
          sx={{
            width: 500,
            minWidth:300,
            maxWidth: '100%',
          }}
        > <TextField 
        onChange={(e)=>setTypeOfWork(e.target.value)}
        fullWidth label="Type of Work" id="fullWidth" />
        </Box>
        <Box
          sx={{
            width: 500,
            minWidth:300,
         maxWidth: '100%',
          }}
        > 
        <BasicDateTimePicker  name="Deadline"/>
        
        </Box>
        <Box
          sx={{
            width: 500,
            minWidth:300,
         maxWidth: '100%',
          }}
        >
        <MultipleSelect/>
        </Box>
    
        <Box
    
          sx={{
            width: 500,
            minWidth:300,
            maxWidth: '100%',
          }}
        > <TextField multiline
        onChange={(e)=>setDecription(e.target.value)}
        rows={5}
         fullWidth label="Description" id="fullWidth" />
        </Box>
    
        <Box
          sx={{
            width: 500,
            minWidth:300,
            maxWidth: '100%',
          }}
        >
        <Grid container   spacing={2}>
        <Grid container item sx="6" >
        <Autofillele
        onChange={(e)=>setTitle(e.target.value)}
        title="Assignee" /> 
        </Grid>
        <Grid container item sx="6">
        <Autofillele
        onChange={(e)=>setTitle(e.target.value)}
         title="Reporter" /> 
        </Grid>
       </Grid>
        </Box>
        
        <Button  variant="contained" startIcon={<SendIcon />}>
          Send Request
        </Button>
        
      </Stack>)
}