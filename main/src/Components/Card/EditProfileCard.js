// React Utils
import { useEffect, useState } from "react";

//MUI Components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import EditIcon from '@mui/icons-material/Edit';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [name, setname] = useState("");
  const [emailid, setemailid] = useState("");
  const [contact, setcontact] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

          <TextField onChange={setname}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField onChange={setemailid}
            autoFocus
            margin="dense"
            id="email"
            label="Category"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={setcontact}
            autoFocus
            margin="dense"
            id="contact"
            label="Contact"
            type="email"
            fullWidth
            variant="standard"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained"  >Cancel</Button>
          <Button onClick={handleClose} variant="contained" >Submit</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
