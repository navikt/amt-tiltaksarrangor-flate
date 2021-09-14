import cls from 'classnames';
import React from 'react';
import styles from './Card.module.less';

interface CardProps {
	className?: string;
	children?: React.ReactNode;
}

export const Card = (props: CardProps) => {
	return (
		<section className={cls(styles.card, props.className)}>
			{props.children}
		</section>
	);
};