// React Utils
import { useState, useEffect } from 'react';

// Other Utils
import { getBranch, getCategories } from '../../Utils/controller';
import { updateBranchData } from '../../Utils/controller';

// MUI Components
import { Container } from '@mui/material';
import { Button } from '@mui/material';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';

// MUI Icons
import SendIcon from '@mui/icons-material/Send';

export default function BranchAJE({ user }) {
    const [branchData, setBranchData] = useState('');
    const [branch, setBranch] = useState('');
    const [category, setCat] = useState('');
    const [subCategory, setSubCat] = useState('');
    const [menuBranch, setMenuBr] = useState([]);
    const [menuCat, setMenuCat] = useState([]);
    const [menuSubCat, setMenuSubCat] = useState([]);
    const [categories, setCats] = useState([]);
    useEffect(() => {
        getCategories(setCats);
        getBranch(setBranchData);
    }, []);
    useEffect(() => {
        setTimeout(() => {
            if (branchData !== '') {
                setBranch(branchData.name);
                if (branchData.category.length) {
                    setCat(branchData.category[0].name);
                    if (branchData.category[0].subCategory.length) {
                        setSubCat(branchData.category[0].subCategory[0].name);
                    }
                }
            }
        }, 10);

    }, [branchData]);
    
    useEffect(() => {
        let ind = 0;
        let x = categories.map(cat => <MenuItem key={ind++} value={cat.name}>{cat.name}</MenuItem>);
        setMenuBr(x);
    }, [categories]);

    useEffect(() => {
        let x = categories.filter(cat => cat.name === branch);
        if (x.length > 0) {
            let ind = 0;
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
    return (
        <Container component='div' sx={{ p: 2, height: 600, overflowY: 'scroll' }}>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="branch-label" required>Branch</InputLabel>
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
            {(branch !== []) &&
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="category-label" required>Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category-select"
                        value={category}
                        label="Category"
                        onChange={(e) => { setCat((e.target.value)) }}
                    >
                        {menuCat}
                    </Select>
                </FormControl>}
            {(category !== '' && user.desig === 'JE') &&
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="sub-category-label" required>Sub-Category</InputLabel>
                    <Select
                        labelId="sub-category-label"
                        id="sub-category-select"
                        value={subCategory}
                        label="Sub-Category"
                        onChange={(e) => { setSubCat((e.target.value)) }}
                    >
                        {menuSubCat}
                    </Select>
                </FormControl>}
            <Button aria-label="Send Category Data"
                variant='outlined'
                endIcon={<SendIcon />}
                sx={{ mt: 1, ml: 1 }}
                onClick={() => {
                    updateBranchData(branch, {
                        name: branch,
                        category: [{
                            name: category,
                            subCategory: [{ name: subCategory }]
                        }]
                    });
                }}>
                Submit Category Data
            </Button>
        </Container >
    );
}