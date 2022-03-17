import { formaterTelefonnummer, hentFodselsdato, hentPersonnummer } from './bruker-utils'

test('formaterTelefonnummer skal returnere tom string hvis null | undefined | tom', () => {
	expect(formaterTelefonnummer(null)).toEqual('')
	expect(formaterTelefonnummer(undefined)).toEqual('')
	expect(formaterTelefonnummer('')).toEqual('')
})

test('formaterTelefonnummer skal parse norskt telefonnummer', () => {
	expect(formaterTelefonnummer('+47 12345678')).toEqual('12 34 56 78')
	expect(formaterTelefonnummer('12345678')).toEqual('12 34 56 78')
})

test('formaterTelefonnummer skal ikke endre telefonnummer som ikke har skille mellom landskode og nummer', () => {
	expect(formaterTelefonnummer('+4712345678')).toEqual('+4712345678')
})

test('formaterTelefonnummer skal ikke endre telefonnummer som ikke er norskt telefonnummer', () => {
	expect(formaterTelefonnummer('+49 12345678')).toEqual('+49 12345678')
	expect(formaterTelefonnummer('123456789')).toEqual('123456789')
	expect(formaterTelefonnummer('123 456 789')).toEqual('123 456 789')
})

describe('hentFodselsdato', () => {
	test('skal hente fodselsdato', () => {
		expect(hentFodselsdato('12345678900')).toEqual('123456')
	})
})

describe('hentPersonnummer', () => {
	test('skal hente personnummer', () => {
		expect(hentPersonnummer('12345678900')).toEqual('78900')
	})
})