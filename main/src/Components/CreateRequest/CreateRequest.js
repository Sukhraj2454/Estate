// React Utils
import { useState,useEffect } from 'react';

//other utils
import { getCategories, createRequest } from '../../Utils/controller';

// MUI Components
import { Container, Grid } from '@mui/material';
import { ThemeProvider } from "@mui/material";
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';



// Other Components
import BasicDateTimePicker from './BasicDateTimePicker';

// MUI Icons
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import SendIcon from '@material-ui/icons/Send';

const Divbox = function ({ comp }) {
  return (
    <Box
      sx={{
        width: 500,
        minWidth: 300,
        maxWidth: '100%',
        m: 2
      }}
    > {comp}
    </Box>

  )
}

export default function CreateRequest({ theme }) {
 
  const [issue, setIssue] = useState('');
  const [menu, setMenu] = useState([]);
  const [category, setCat] = useState('');

  const [categories, setCats] = useState([]);

  const [description, setDescription] = useState('');
  
  const [location, setLocation] = useState('');

  function handleCatChange(event) {
    setCat(event.target.value);
  } 
  function handleSubmit(event){
    createRequest(issue, description, location, category);
  }
  useEffect(() => {
    let ind=0;
    let cats = categories;
    let menu = cats.map((cat) => <MenuItem key={ind++} value={cat}>{cat}</MenuItem>);
    setMenu(menu);
  }, [categories]);
  
  useEffect(() => {
    getCategories(setCats);
}, []);
  return (

    <ThemeProvider theme={theme}>
      <Container maxWidth='sm' sx={{ p: 2 }}>

        <Typography
          sx={{
            textAlign: 'center',
            userSelect: 'none'
          }}
          component='h1'
          variant='h4'
          color={"primary"}>
          {/* <AddCircleRoundedIcon
            color='#1976D2' /> */}
          Create a Request
        </Typography>

        <Divbox
          comp={<TextField
            onChange={(e) => setIssue(e.target.value)}
            fullWidth label="Issue" id="issue" />
          } />
      
        <Divbox comp={<BasicDateTimePicker name="Date" />} />
        <Grid  columns={8}>
          <Divbox
          comp={ <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
              labelId="category-label"
              id="category-select"
              value={category}
              label="Category"
              onChange={handleCatChange}
          >
              {menu}
          </Select>
      </FormControl>
          } />
        </Grid>
        <Divbox comp={<TextField multiline
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          fullWidth label="Description" id="fullWidth" />} />
         
        <Divbox comp={
          <TextField
          onChange={(e) => setLocation(e.target.value)}
          fullWidth label="Location" id="Location" /
          
          >}
          />


        <Button variant="contained"
        
          sx={{ ml: '35%' }}
        // startIcon={<SendIcon />}
        onClick={handleSubmit}
        >
          Send Request
        </Button>

      </Container>
    </ThemeProvider>)
}

