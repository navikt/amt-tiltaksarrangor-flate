import React from 'react';
import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron';
import './PaginationBar.less';
import { Element } from 'nav-frontend-typografi';
import { Show } from '../../felles/Show';
import styles from './PaginationBar.module.less';
import { PagineringKnapp } from './PagineringKnapp';

interface PaginationBarProps {
    totalUsers: number;
}

export const PaginationBar = (props: PaginationBarProps) => {
    const { currentPage, totalPages, pageSize } = {
        currentPage: 1,
        totalPages: 4,
        pageSize: 25
    };

    const erPaForsteSide: boolean = currentPage === 1;
    const erPaSisteSide: boolean = currentPage >= totalPages;

    const fraBruker = ((currentPage - 1) * pageSize) + 1;
    const tilBruker = ((currentPage - 1) * pageSize) + props.totalUsers;
    const totaltBrukere = 100;

    const handlePageChanged = (newPage: number) => {
        // setCurrentPage(newPage);
    }

    return (
        <div className={styles.paginationBar}>
            <Element aria-live="polite">
                Viser {fraBruker}-{tilBruker} av totalt {totaltBrukere} brukere
            </Element>
            <div className={styles.paginering}>
                <PagineringKnapp aria-label="Forrige side" disabled={erPaForsteSide} onClick={() => handlePageChanged(currentPage - 1)}>
                    <VenstreChevron/>
                </PagineringKnapp>

                <Show if={!erPaForsteSide}>
                    <PagineringKnapp aria-label="Første side" onClick={() => handlePageChanged(1)}>1</PagineringKnapp>
                </Show>

                <PagineringKnapp aria-live="polite" aria-label="Valgt side">
                    <strong>{currentPage}</strong>
                </PagineringKnapp>

                <Show if={!erPaSisteSide}>
                    <PagineringKnapp aria-label="Siste side" onClick={() => handlePageChanged(totalPages)}>
                        {totalPages}
                    </PagineringKnapp>
                </Show>

                <PagineringKnapp aria-label="Neste side" disabled={erPaSisteSide} onClick={() => handlePageChanged(currentPage + 1)}>
                    <HoyreChevron/>
                </PagineringKnapp>
            </div>
        </div>
    );
}
