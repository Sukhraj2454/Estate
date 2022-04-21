// React Utils
import { useEffect, useState } from "react";

// Other Utils
import { getCategories, updateUser } from "../../Utils/controller";

//MUI Components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { FormControl, Select, InputLabel, MenuItem, Container } from '@mui/material';

// MUI Icons
import EditIcon from '@mui/icons-material/Edit';

function Branch({ branch, category, subCategory, setBranch, setCat, setSubCat }) {

  const [menuBranch, setMenuBr] = useState([]);
  const [menuCat, setMenuCat] = useState([]);
  const [menuSubCat, setMenuSubCat] = useState([]);
  const [categories, setCats] = useState([]);
  const [branchVal, setBV] = useState('');
  const [catVal, setCV] = useState('');
  const [subCatVal, setSCV] = useState('');

  useEffect(() => {
    getCategories(setCats);
  }, []);

  useEffect(() => {
    if (menuBranch.length)
      setBV(branch);
  }, [branch, menuBranch]);

  useEffect(() => {
    if (menuCat.length)
      setCV(category);
  }, [category, menuCat]);


  useEffect(() => {
    if (menuSubCat.length)
      setSCV(subCategory);
  }, [subCategory, menuSubCat]);

  useEffect(() => {
    let ind = 0;
    let x = categories.map(cat => <MenuItem key={ind++} value={cat.name}>{cat.name}</MenuItem>);
    setMenuBr(x);
  }, [categories]);

  useEffect(() => {
    let x = categories.filter(cat => cat.name === branch);
    if (x.length > 0) {
      let ind = 0;
      if (!(x[0].category.map(val => val.name).includes(category)))
        setCat('');
      let y = x[0].category.map(cat => <MenuItem key={ind++} value={cat.name}>{cat.name}</MenuItem>);
      setMenuCat(y);
    }
    // eslint-disable-next-line
  }, [branch, categories, setCat]);

  useEffect(() => {
    let x = categories.filter(cat => cat.name === branch);
    if (x.length > 0) {
      let ind = 0;
      let y = x[0].category.filter(cat => cat.name === category);
      if (y.length) {
        if (!(y[0].subCategory.map(val => val.name).includes(subCategory)))
          setSubCat('');
        let z = y[0].subCategory.map(cat => <MenuItem key={ind++} value={cat.name}>{cat.name}</MenuItem>);
        setMenuSubCat(z);
      }
    }
    // eslint-disable-next-line
  }, [category, categories, setSubCat, setMenuSubCat, branch]);




  return (
    <Container component='div' sx={{ p: 2 }}>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="branch-label" required>Branch</InputLabel>
        <Select
          labelId="branch-label"
          id="branch-select"
          value={branchVal}
          label="Branch"
          onChange={(e) => { setBranch((e.target.value)) }}
        >
          {menuBranch}
        </Select>
      </FormControl>
      {(branch !== '') &&
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="category-label" required>Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={catVal}
            label="Category"
            onChange={(e) => { setCat((e.target.value)) }}
          >
            {menuCat}
          </Select>
        </FormControl>}
      {(category !== '') &&
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="sub-category-label" required>Sub-Category</InputLabel>
          <Select
            labelId="sub-category-label"
            id="sub-category-select"
            value={subCatVal}
            label="Sub-Category"
            onChange={(e) => { setSubCat((e.target.value)) }}
          >
            {menuSubCat}
          </Select>
        </FormControl>}
    </Container >
  );
}
export default function FormDialog({ user, branch, category, subCategory, setBranch, setCat, setSubCat }) {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [contact, setContact] = useState(user.contact);

  function handleSubmit() {
    var br = {
      name: branch,
      category: [{
        name: category,
        subCategory: {
          name: subCategory
        }
      }]
    };
    if (user.desig !== 'Worker')
      br = null

    updateUser({
      branch: br,
      name: name,
      contact: contact
    });
    setOpen(false);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setName(user.name);
    setContact(user.contact);
  }, [user]);
  return (

    <div>
      <IconButton color="primary"
        aria-label="EditIcon"
        onClick={handleClickOpen} >
        <EditIcon />
      </IconButton>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle >Edit Profile</DialogTitle>
        <DialogContent>

          <TextField onChange={(e) => { setName(e.target.value); }}
            autoFocus
            value={name}
            margin="dense"
            id="name"
            label="Name"
            type="string"
            fullWidth
            variant="standard"
          />

          <TextField
            onChange={(e) => { setContact(e.target.value) }}
            autoFocus
            value={contact}
            margin="dense"
            id="contact"
            label="Contact"
            type="string"
            fullWidth
            variant="standard"
          />
          {(user.desig === 'Worker') ?
            <Branch
              user={user}
              branch={branch}
              category={category}
              subCategory={subCategory}
              setBranch={setBranch}
              setCat={setCat}
              setSubCat={setSubCat} /> : <></>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained"  >Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" >Submit</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
