import faker from 'faker';

faker.locale = 'nb_NO';
faker.seed(486756783);

export const randBetween = (min: number, max: number): number => {
	return faker.datatype.number({ min, max });
};

export const randomFnr = (): string => {
	const dag = randBetween(1, 31);
	const mnd = randBetween(1, 12);
	const ar = randBetween(0, 99);
	const arhundre = randBetween(0, 99).toString().padStart(2, '0');
	const kjonnsiffer = faker.datatype.boolean() ? 4 : 1;
	const individsifre = `${arhundre}${kjonnsiffer}`;
	const kontrollsifre = `${randBetween(0, 9)}${randBetween(0, 9)}`;

	return `${dag.toString().padStart(2, '0')}${mnd.toString().padStart(2, '0')}${ar
		.toString()
		.padStart(2, '0')}${individsifre}${kontrollsifre}`;
};