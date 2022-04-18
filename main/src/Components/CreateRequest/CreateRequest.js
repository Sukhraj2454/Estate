// React Utils
import { useState, useEffect } from 'react';

//other utils
import { getCategories, createRequest } from '../../Utils/controller';

// MUI Components
import { Container } from '@mui/material';
import { ThemeProvider } from "@mui/material";
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';

const Divbox = function ({ comp }) {
  return (
    <Box
      sx={{
        width: 550,
        maxWidth: '100%',
        mt: 2
      }}
    > {comp}
    </Box>
  )
}

export default function CreateRequest({ theme }) {

  const [open, setOpen] = useState(false);
  const [issue, setIssue] = useState('');
  const [branch, setBranch] = useState('');
  const [category, setCat] = useState('');
  const [subCategory, setSubCat] = useState('');
  const [menuBranch, setMenuBr] = useState([]);
  const [menuCat, setMenuCat] = useState([]);
  const [menuSubCat, setMenuSubCat] = useState([]);

  const [categories, setCats] = useState([]);
  const [type, setType] = useState('Academic');
  const [description, setDescription] = useState('');

  const [location, setLocation] = useState('');

  useEffect(() => {
    getCategories(setCats);
  }, []);
  useEffect(() => {
    let ind = 0;
    let x = categories.map(cat => <MenuItem key={ind++} value={cat.name}>{cat.name}</MenuItem>);
    setMenuBr(x);
  }, [categories]);

  useEffect(() => {
    let x = categories.filter(cat => cat.name === branch);
    if (x.length > 0) {
      let ind = 0;
      setCat(x[0].category[0].name);
      let y = x[0].category.map(cat => <MenuItem key={ind++} value={cat.name}>{cat.name}</MenuItem>);
      setMenuCat(y);
    }
  }, [branch, categories]);

  useEffect(() => {
    let x = categories.filter(cat => cat.name === branch);
    if (x.length > 0) {
      let ind = 0;
      let y = x[0].category.filter(cat => cat.name === category);
      if (y.length) {
        let z = y[0].subCategory.map(cat => <MenuItem key={ind++} value={cat.name}>{cat.name}</MenuItem>);
        setMenuSubCat(z);
      }
    }
  }, [category, categories, setSubCat, setMenuSubCat, branch]);
  function handleSubmit(event) {
    createRequest(issue, description, location, category);
  }

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
          Make a Request
        </Typography>

        <FormControl sx={{ pl: 3 }} required>
          <FormLabel id="row-radio-buttons-group-label">Type of Service</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={type}
            onChange={(e) => { setType(e.target.value); }}
          >
            <FormControlLabel value="Academic" control={<Radio />} label="Academic" />
            <FormControlLabel value="Residential" control={<Radio />} label="Residential" />
            <FormControlLabel value="Hostel" control={<Radio />} label="Hostel" />
          </RadioGroup>
        </FormControl>


        <Divbox
          comp={<TextField fullWidth required
            onChange={(e) => setIssue(e.target.value)}
            label="Issue" id="issue" />
          } />


        <Divbox comp={<TextField multiline fullWidth required
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          label="Description" id="description" />} />


        <FormControl fullWidth sx={{ mt: 2 }} required>
          <InputLabel id="branch-label" >Branch</InputLabel>
          <Select
            labelId="branch-label"
            id="branch-select"
            value={branch}
            label="Branch"
            onChange={(e) => { setBranch((e.target.value)) }}
          >
            {menuBranch}
          </Select>
        </FormControl>

        {
          (branch !== '') &&
          <FormControl fullWidth sx={{ mt: 2 }} required >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={category}
              label="Category"
              onChange={(e) => { setCat((e.target.value)) }}
            >
              {menuCat}
            </Select>
          </FormControl>
        }
        {
          (category !== '') &&
          <FormControl fullWidth sx={{ mt: 2 }} required >
            <InputLabel id="sub-category-label">Sub-Category</InputLabel>
            <Select
              labelId="sub-category-label"
              id="sub-category-select"
              value={subCategory}
              label="Sub-Category"
              onChange={(e) => { setSubCat((e.target.value)) }}
            >
              {menuSubCat}
            </Select>
          </FormControl>
        }
        <Divbox comp={
          <TextField required
            onChange={(e) => setLocation(e.target.value)}
            fullWidth label="Location" id="Location"
          />}
        />

        <Dialog open={open} onClose={() => { setOpen(false) }}>
          <DialogTitle sx={{ textAlign: 'center' }}>Proceed with Request</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="h5" sx={{ color: 'black' }}> TERMS AND CONDITIONS</Typography>

              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: 'black',
                  textAlign: 'justify'
                }}>
                - I have not shared my password with anyone.
              </Typography>

              <Typography
                variant="h6"
                gutterBottom sx={{
                  color: 'black',
                  textAlign: 'justify'
                }}>
                - I am responsible for the content typed in desciption.
              </Typography>

              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: 'black',
                  textAlign: 'justify'
                }}>
                - I understand that a necessary disiplinary action can be initiated against me
                in the case of use of derogatory words or false statements against any
                Student | Faculty | Staff | Higher Authority.
              </Typography>

              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: 'black',
                  textAlign: 'justify'
                }}>
                - The information given to me regarding the complaint/request
                is true to the best of my knowledge and if found false/wrong,
                necessary disiplinary action can be initiated against me.
              </Typography>
              <Typography
                variant="overline"
                gutterBottom
                sx={{
                  color: 'red',
                  textAlign: 'justify'
                }}>
                By Clicking on Submit, <br /> you are agreeing to the Terms and Conditions listed above.
              </Typography>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpen(false) }}>Go Back</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Button variant="contained"
          sx={{ ml: '35%', mt: 2 }}
          onClick={() => { setOpen(true); }}
        >
          Send Request
        </Button>

      </Container>
    </ThemeProvider >)
}

