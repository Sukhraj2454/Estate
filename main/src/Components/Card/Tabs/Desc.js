// React Utils.
import { useState } from "react";
// MUI Components
import { TextField, Button } from "@mui/material";

export default function Desc() {
    const [disable, setDisable] = useState(true);

    const handleTextChange = () => {
        setDisable(false);
    }
    return (<>
        <TextField sx={{ p: 2, width: '90%' }}
            onChange={handleTextChange}
            defaultValue={'Electricity Bulb Needed for CS304.'} />
        <TextField
            onChange={handleTextChange}
            sx={{ p: 1, ml: 1, width: '90%' }}
            label="Description"
            multiline
            rows={12}
        />
        <Button sx={{ ml: 3, mt: 1 }} color="success" variant="contained" disabled={disable} >Update</Button>
        <Button sx={{ ml: 3, mt: 1 }} color="error" variant="contained" disabled={disable}>Discard Changes</Button>

    </>)
}