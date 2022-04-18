// React Utils
import { useState, useEffect } from 'react';

// Other Utils
import { getBranch, getUser } from '../../Utils/controller';
import { updateBranchData } from '../../Utils/controller';

// Other components
import BranchAJE from './BranchAJE';

// MUI Components
import { Container, TextField, Typography } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Button } from '@mui/material';

// MUI Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

function SubCategory({ nm, i, subCatsData, setSubCatsData }) {
    const [name, setName] = useState(nm);
    useEffect(() => {
        setName(nm);
    }, [nm]);

    useEffect(() => {
        let temp = subCatsData.slice();
        temp[i].name = name;
        setSubCatsData(temp);
        // eslint-disable-next-line
    }, [name, i, setSubCatsData])

    function deleteSubCategory() {
        let temp = subCatsData.slice();
        temp.splice(i, 1);
        setSubCatsData(temp);
    }
    return (
        <>
            <TextField
                fullWidth
                label='subCategory'
                sx={{ m: 1 }}
                value={name}
                onChange={(e) => setName(e.target.value)} />
            <Button endIcon={<DeleteIcon />}
                color='error'
                onClick={deleteSubCategory}>Delete Sub-Category</Button>

        </>)
}
function Category({ sub, nm, branch, setBranch, i }) {
    const [subCats, setSubCats] = useState([]);
    const [subCatsData, setSubCatsData] = useState(sub || []);
    useEffect(() => {
        setSubCatsData(sub);
    }, [sub]);
    function handleNameChange(e) {
        let temp = { ...branch };
        temp.category[i].name = e.target.value;
        setBranch(temp);
    }
    useEffect(() => {
        let ct = 0;
        let x = subCatsData.map(s => {
            ct = ct + 1;
            return (<SubCategory
                i={ct - 1}
                nm={s.name}
                subCatsData={subCatsData}
                setSubCatsData={setSubCatsData}
                key={ct - 1} />)
        });
        setSubCats(x);
    }, [subCatsData]);
    useEffect(() => {
        if (subCatsData) {
            let temp = { ...branch };
            temp.category[i].subCategory = subCatsData;
            setBranch(temp);
        }
        // eslint-disable-next-line
    }, [subCatsData, setSubCats]);

    function deleteCategory() {
        let temp = { ...branch }
        temp.category.splice(i, 1);
        setBranch(temp);
    }

    function addSubCategory(e) {
        var temp = sub.slice();
        temp.push({ name: 'Sub Category' });
        setSubCatsData(temp);
    }

    return (
        (<Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}>
                <Typography>{nm}</Typography>

            </AccordionSummary>

            <Button endIcon={<DeleteIcon />}
                color='error'
                onClick={deleteCategory}>Delete Category</Button>
            <AccordionDetails>

                <TextField
                    fullWidth
                    type='text'
                    label='Category'
                    variant='filled'
                    value={nm}
                    onChange={handleNameChange}
                />

                <Button aria-label="Add Category"
                    variant='outlined'
                    startIcon={<AddCircleIcon />}
                    sx={{ mt: 1 }}
                    onClick={addSubCategory}>
                    Add Sub-Category
                </Button>

                {subCats}

            </AccordionDetails>

        </Accordion>)
    );
}
export default function Branch() {
    const [branch, setBranch] = useState({});
    const [name, setName] = useState('');
    const [ind, setInd] = useState(0);
    const [cats, setCats] = useState([]);
    const [user, setUser] = useState({ name: '', desig: 'EE' });
    useEffect(() => {
        getUser(setUser);
    }, [setUser]);
    useEffect(() => {
        getBranch(setBranch);
    }, [setBranch, setInd]);
    useEffect(() => {
        let ct = 0;
        if (branch.name)
            setName(branch.name);
        if (branch.category) {
            let x = branch.category.map(cat => {
                ct = ct + 1;
                return (<Category nm={cat.name} sub={cat.subCategory}
                    branch={branch} setBranch={setBranch} i={ct - 1} key={ct} />);
            })
            setCats(x);
        }
    }, [branch]);
    function addCategory(e) {
        let t = { ...branch };
        t.category.push({ name: 'Category', subCategory: [] });
        setBranch(t);
        let x = ind;
        setInd(x + 1);
    }
    return (<>{
        user.desig === 'EE' ? (<Container component='div' sx={{ p: 2, height: 600, overflowY: 'scroll' }}>
            <TextField
                fullWidth
                type='text'
                label='Branch'
                variant='filled'
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <Button aria-label="Add Category"
                variant='outlined'
                startIcon={<AddCircleIcon />}
                sx={{ mt: 1 }}
                onClick={addCategory}>
                Add Category
            </Button>
            <Button aria-label="Add Category"
                variant='outlined'
                endIcon={<SendIcon />}
                sx={{ mt: 1, ml: 1 }}
                onClick={() => { updateBranchData(name, branch); }}>
                Submit Branch Data
            </Button>
            {cats}
        </Container >) : <BranchAJE user={user} />
    }</>
    );
}