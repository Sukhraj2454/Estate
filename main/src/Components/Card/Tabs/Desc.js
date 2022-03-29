// React Utils.
import { useState, useEffect, useRef } from "react";

// Other Utils
import { updateDescTitle } from "../../../Utils/controller";
// MUI Components
import { TextField, Button } from "@mui/material";

export default function Desc({ data, set, cards, setCards }) {
    const firstDTRender = useRef(true);
    const [description, setDescription] = useState(data.description);
    const [title, setTitle] = useState(data.title);
    const [titleText, setTText] = useState(data.title);
    const [descText, setDText] = useState(data.description);
    const handleTitleChange = (event) => {
        setTText(event.target.value);
    }
    const handleDescChange = (event) => {
        setDText(event.target.value);
    }
    const updateChange = () => {
        setTitle(titleText);
        setDescription(descText);
        set[0](titleText);
        if (cards.length > 0) {
            let dat = cards;
            let ind = dat.findIndex(x => x._id === data._id);
            let temp = dat[ind];
            dat = dat.filter(x => x._id !== data._id);
            temp.description = descText;
            temp.title = titleText;
            dat.push(temp);
            setCards(dat);

        }
    }
    const discardChange = () => {
        setTText(title);
        setDText(description);
    }
    useEffect(() => {
        if (firstDTRender.current) {
            firstDTRender.current = false;
            return;
        }
        updateDescTitle(title, description, data._id);
    }, [title, description, data._id])
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
        <Button sx={{ ml: 3, mt: 1 }} onClick={updateChange} color="success" variant="contained" disabled={descText === description && titleText === title} >Update</Button>
        <Button sx={{ ml: 3, mt: 1 }} onClick={discardChange} color="error" variant="contained" disabled={descText === description && titleText === title}>Discard Changes</Button>

    </>)
}