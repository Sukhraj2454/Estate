// React Utils 
import axios from 'axios';
import { useEffect, useState } from 'react';

// other Utils
import useWidth from '../../Utils/useWidth';

// Components
import ExpCardlg from "./ExpCardlg";
import ExpCardsm from './ExpCardsm';


export default function ExpandedCard({ close, theme }) {
    //eslint-disable-next-line
    const [refresh, setRefresh] = useState(true);
    useEffect(() => {
        axios.get('/task/all', {
            headers: {
                'x-auth': sessionStorage.getItem('x-auth')
            }
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch(err => {
            })
    }, [refresh]);

    const wd = useWidth();  // get viewport size
    return (
        <>
            {
                (wd !== 'xs' && wd !== 'sm') ?
                    <ExpCardlg close={close} theme={theme} /> :
                    <ExpCardsm close={close} theme={theme} />
            }
        </>
    )
};