// other Utils
import useWidth from '../../Utils/useWidth';

// Components
import ExpCardlg from "./ExpCardlg";
import ExpCardsm from './ExpCardsm';

export default function ExpandedCard({ close, theme }) {

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