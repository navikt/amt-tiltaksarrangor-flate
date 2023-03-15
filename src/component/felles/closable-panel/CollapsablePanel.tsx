import { ReactElement, useState } from 'react';
import styles from './CollapsablePanel.module.scss'
import SvgChevronUpCircle from '@navikt/ds-icons/esm/ChevronUpCircle';
import SvgChevronDownCircle from '@navikt/ds-icons/esm/ChevronDownCircle';

interface Props {
    title?: string
    children: ReactElement[] | ReactElement
}

export const CollapsablePanel = (props: Props) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)

    const onChevronClicked = () => {
        setCollapsed(!collapsed)
    }

    const getIcon = () => {
        return collapsed
            ? <SvgChevronDownCircle/>
            : <SvgChevronUpCircle/>
    }

    return (
        <div className={styles.collapsablePanel}>
            <header>
                <div className={styles.title}>{props.title}</div>
                <div onClick={onChevronClicked} className={styles.collapseButton}>{getIcon()}</div>
            </header>
            <section hidden={collapsed} className={styles.slide}>
                {props.children}
            </section>
        </div>
    )
}
