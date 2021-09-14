import { Element, Normaltekst } from 'nav-frontend-typografi';
import cls from 'classnames';
import React from 'react';
import styles from './Label.module.less';

interface LabelProps {
	title: string;
	value: string | undefined | null;
	className?: string;
}

export const Label = (props: LabelProps) => {
	const { title, value, className } = props;
	return (
		<div className={cls(styles.label, className)}>
			<Element>{title}</Element>
			<Normaltekst>{value}</Normaltekst>
		</div>
	);
};