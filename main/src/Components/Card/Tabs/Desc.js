// React Utils.
import { useState } from "react";
// MUI Components
import { TextField, Button } from "@mui/material";

export default function Desc({ data }) {
    const [description, setDescription] = useState(data ? data.description : "");
    const [title, setTitle] = useState(data ? data.title : "");
    const [titleText, setTText] = useState(data ? data.title : "");
    const [descText, setDText] = useState(data ? data.description : "");
    const handleTitleChange = (event) => {
        setTText(event.target.value);
    }
    const handleDescChange = (event) => {
        setDText(event.target.value);
    }
    const updateChange = ()=>{
        setTitle(titleText);
        setDescription(descText);
    }
    const discardChange = ()=>{
        setTText(title);
        setDText(description);
    }
    return (<>
        <TextField sx={{ p: 2, width: '90%' }}
            onChange={handleTitleChange}
            value={titleText} />
        <TextField
            value={descText}
            onChange={handleDescChange}
            sx={{ p: 1, ml: 1, width: '90%' }}
            label="Description"
            multiline
            rows={12}
        />
        <Button sx={{ ml: 3, mt: 1 }} onClick = {updateChange} color="success" variant="contained" disabled={descText === description && titleText === title} >Update</Button>
        <Button sx={{ ml: 3, mt: 1 }} onClick = {discardChange} color="error" variant="contained" disabled={descText === description && titleText === title}>Discard Changes</Button>

    </>)
}