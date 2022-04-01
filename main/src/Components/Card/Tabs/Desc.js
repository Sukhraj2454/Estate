// React Utils.
import { useState, useEffect, useRef } from "react";

// Other Utils
import { updateDescTitle } from "../../../Utils/controller";
// MUI Components
import { TextField, Button } from "@mui/material";

export default function Desc({ data, set, cards, setCards }) {
    const firstDTRender = useRef(true);
    const [location, setLocation] = useState(data.location);
    const [description, setDescription] = useState(data.description);
    const [title, setTitle] = useState(data.title);
    const [titleText, setTText] = useState(data.title);
    const [locText, setLocText] = useState(data.location);
    const [descText, setDText] = useState(data.description);
    var disabled = (descText === description && titleText === title && location === locText)
    const handleTitleChange = (event) => {
        setTText(event.target.value);
    }
    const handleDescChange = (event) => {
        setDText(event.target.value);
    }
    const handleLocationChange = (event) => {
        setLocText(event.target.value);
    }
    const updateChange = () => {
        setTitle(titleText);
        setDescription(descText);
        setLocation(locText);
        set[0](titleText);
    }
    const discardChange = () => {
        setTText(title);
        setDText(description);
        setLocText(location);
    }
    useEffect(() => {
        if (firstDTRender.current) {
            firstDTRender.current = false;
            return;
        }
        updateDescTitle(title, description, location, data._id);
    }, [title, description, location, data._id])
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
            rows={8}
        />
        <TextField sx={{ p: 2, width: '90%' }}
            placeholder="Location"
            onChange={handleLocationChange}
            value={locText} />
        <Button sx={{ ml: 3, mt: 1 }} onClick={updateChange} color="success" variant="contained" disabled={disabled} >Update</Button>
        <Button sx={{ ml: 3, mt: 1 }} onClick={discardChange} color="error" variant="contained" disabled={disabled}>Discard Changes</Button>

    </>)
}