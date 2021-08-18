import React from 'react';

import styles from './PagineringKnapp.module.less';

export const PagineringKnapp = (
	props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => {
	const { children, ...rest } = props;
	return (
		<button className={styles.pagineringKnapp} {...rest}>
			{props.children}
		</button>
	);
};
