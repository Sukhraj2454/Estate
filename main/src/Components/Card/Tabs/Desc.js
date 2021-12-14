// MUI Components
import { TextField } from "@mui/material";

export default function Desc() {
    return (<>
        <TextField sx={{ p: 2, width: '90%' }}
            defaultValue={'Electricity Bulb Needed for CS304.'} />
        <TextField
            sx={{ p: 1, ml: 1, width: '90%' }}
            label="Description"
            multiline
            rows={12}
        />
    </>)
}