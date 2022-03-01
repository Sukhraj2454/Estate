// React Utils 
// import { useEffect, useState } from 'react';

// other Utils
import useWidth from '../../Utils/useWidth';

// Components
import ExpCardlg from "./ExpCardlg";
import ExpCardsm from './ExpCardsm';


export default function ExpandedCard({ close, theme, workers, data }) {
    const wd = useWidth();  // get viewport size
    return (
        <>
            {
                (wd !== 'xs' && wd !== 'sm') ?
                    <ExpCardlg close={close} data={data} workers={workers} theme={theme} /> :
                    <ExpCardsm close={close} data={data} workers={workers} theme={theme} />
            }
        </>
    )
};