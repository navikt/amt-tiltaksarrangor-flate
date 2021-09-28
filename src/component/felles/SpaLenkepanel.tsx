import React from 'react';
import cls from 'classnames';
import { Link } from 'react-router-dom';
import 'nav-frontend-lenkepanel-style'; // Importer direkte siden vi ikke bruker React-komponenten

interface SpaLenkepanelProps {
	to: string;
	border?: boolean;
	children?: React.ReactNode;
	className?: string;
}

export const SpaLenkepanel = (props: SpaLenkepanelProps) => {
	const { to, border, children, className } = props

	return (
		<Link to={to} className={cls('lenkepanel', {'lenkepanel--border': border}, className)}>
			{children}
			<span className="lenkepanel__indikator"/>
		</Link>
	)
};
