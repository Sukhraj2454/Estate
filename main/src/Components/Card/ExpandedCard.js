// React Utils 
// import { useEffect, useState } from 'react';

// other Utils
import useWidth from '../../Utils/useWidth';

// Components
import ExpCardlg from "./ExpCardlg";
import ExpCardsm from './ExpCardsm';
const dt = {
    title: '',
    desciption: '',
    assignee: {
        name: '',
        id: '12'
    },
    reporter: {
        name: '',
        id: '13'
    },
    status: 'To Do',
    priority: 'Medium'
};

export default function ExpandedCard({ close, theme, workers, data, set }) {
    const wd = useWidth();  // get viewport size
    return (
        <>
            {
                (wd !== 'xs' && wd !== 'sm') ?
                    <ExpCardlg close={close} data={data || dt} set={set} workers={workers} theme={theme} /> :
                    <ExpCardsm close={close} data={data || dt} set={set} workers={workers} theme={theme} />
            }
        </>
    )
};