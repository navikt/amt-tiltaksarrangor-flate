import React from 'react';
import styles from './Card.module.less';

interface CardProps {
	children?: React.ReactNode;
}

export const Card = (props: CardProps) => {
	return (
		<section className={styles.card}>
			{props.children}
		</section>
	);
};