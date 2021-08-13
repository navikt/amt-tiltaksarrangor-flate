import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { fetchBrukerDetaljer } from '../../../api';
import { DetaljertBruker } from '../../../api/data/bruker';
import { Spinner } from '../../felles/spinner/Spinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { UserInfoContent } from './UserInfoContent';
import styles from './UserInfoPage.module.less';

export const UserInfoPage = () => {
	const { brukerId } = useParams<{ brukerId: string }>();
	const [bruker, setBruker] = useState<DetaljertBruker>();
	const [hasFailed, setHasFailed] = useState<boolean>(false);

	useEffect(() => {
		fetchBrukerDetaljer(brukerId)
			.then(res => setBruker(res.data))
			.catch(() => setHasFailed(true));
	}, []);

	return (
		<main className={styles.userInfoPage}>
			<Link to="/" className={cls(styles.tilbakeLenke, "blokk-m")}>Tilbake</Link>
			{bruker
				? <UserInfoContent bruker={bruker}/>
				: (hasFailed ? <AlertStripeFeil>En feil oppstod</AlertStripeFeil> : <Spinner/>)
			}
		</main>
	);
}