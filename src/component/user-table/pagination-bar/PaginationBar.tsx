import React from 'react';
import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron';
import cls from 'classnames';
import './PaginationBar.less';
import { Element } from 'nav-frontend-typografi';
import { Bruker } from '../../../rest/data/bruker';
import { Show } from '../../felles/Show';
import { mockBrukere } from '../../../mock/data/brukere';

function PagineringKnapp(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const { className, children, ...rest } = props;
    return (
        <button className={cls(className, 'paginering__knapp')} {...rest}>
            {props.children}
        </button>
    );
}

export function PaginationBar() {
    const { currentPage, totalPages, pageSize } = {
        currentPage: 1,
        totalPages: 4,
        pageSize: 25
    };

    const brukere: Bruker[] = mockBrukere;

    const erPaForsteSide: boolean = currentPage === 1;
    const erPaSisteSide: boolean = currentPage >= totalPages;

    const fraBruker = ((currentPage - 1) * pageSize) + 1;
    const tilBruker = ((currentPage - 1) * pageSize) + (brukere ? brukere.length : 0);
    const totaltBrukere = 100;

    function handlePageChanged(newPage: number) {
        // setCurrentPage(newPage);
    }

    return (
        <div className="pagination-bar">
            <div>
                <Show if={true}>
                    <Element aria-live="polite">
                        Viser {fraBruker}-{tilBruker} av totalt {totaltBrukere} brukere
                    </Element>
                </Show>
            </div>
            <div className={cls('paginering')}>
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
