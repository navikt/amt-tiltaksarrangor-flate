import React from 'react';
import cls from 'classnames';

export const PagineringKnapp = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    const { className, children, ...rest } = props;
    return (
        <button className={cls(className, 'paginering__knapp')} {...rest}>
            {props.children}
        </button>
    );
}