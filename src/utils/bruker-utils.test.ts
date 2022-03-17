import { formaterTelefonnummer, hentFodselsdato, hentPersonnummer } from './bruker-utils'

test('formaterTelefonnummer skal returnere tom string hvis null | undefined | tom', () => {
	expect(formaterTelefonnummer(null)).toEqual('')
	expect(formaterTelefonnummer(undefined)).toEqual('')
	expect(formaterTelefonnummer('')).toEqual('')
})

test('formaterTelefonnummer skal parse norskt telefonnummer (8 siffer)', () => {
	expect(formaterTelefonnummer('12345678')).toEqual('123 45 678')
	expect(formaterTelefonnummer('123 45 678')).toEqual('123 45 678')
})

test('formaterTelefonnummer skal ikke endre telefonnummer som ikke har 8 siffer', () => {
	expect(formaterTelefonnummer('+4712345678')).toEqual('+4712345678')
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