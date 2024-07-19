import { describe, expect, test } from 'vitest'

import {
  formaterTelefonnummer,
  hentFodselsdato,
  hentPersonnummer,
  lagBrukerNavn,
  lagKommaSeparertBrukerNavn
} from './bruker-utils'

describe('lagKommaSeparertBrukerNavn', () => {
  test('skal lage riktig navn når navn er uppercase', () => {
    expect(lagKommaSeparertBrukerNavn('TEST', undefined, 'TESTERSEN')).toEqual(
      'Testersen, Test'
    )
    expect(
      lagKommaSeparertBrukerNavn('TEST', 'TESTINGTON', 'TESTERSEN')
    ).toEqual('Testersen, Test Testington')
  })

  test('skal lage riktig navn når navn har stor forbokstav', () => {
    expect(lagKommaSeparertBrukerNavn('Test', undefined, 'Testersen')).toEqual(
      'Testersen, Test'
    )
    expect(
      lagKommaSeparertBrukerNavn('Test', 'Testington', 'Testersen')
    ).toEqual('Testersen, Test Testington')
  })

  test('skal lage riktig navn når navn har mellomrom', () => {
    expect(
      lagKommaSeparertBrukerNavn('TEST TESTER', undefined, 'TESTERSEN')
    ).toEqual('Testersen, Test Tester')
    expect(
      lagKommaSeparertBrukerNavn('TEST', undefined, 'TESTERSEN TESTERSON')
    ).toEqual('Testersen Testerson, Test')
  })

  test('skal lage riktig navn når navn har bindestrek', () => {
    expect(
      lagKommaSeparertBrukerNavn('TEST-TESTER', undefined, 'TESTERSEN')
    ).toEqual('Testersen, Test-Tester')
    expect(
      lagKommaSeparertBrukerNavn('TEST', undefined, 'TESTERSEN-TESTERSON')
    ).toEqual('Testersen-Testerson, Test')
  })
})

describe('lagBrukerNavn', () => {
  test('skal lage riktig navn', () => {
    expect(lagBrukerNavn('TEST', undefined, 'TESTERSEN')).toEqual(
      'Test Testersen'
    )
    expect(lagBrukerNavn('TEST', 'TESTINGTON', 'TESTERSEN')).toEqual(
      'Test Testington Testersen'
    )
  })

  test('skal lage riktig navn når navn har stor forbokstav', () => {
    expect(lagBrukerNavn('Test', undefined, 'Testersen')).toEqual(
      'Test Testersen'
    )
    expect(lagBrukerNavn('Test', 'Testington', 'Testersen')).toEqual(
      'Test Testington Testersen'
    )
  })

  test('skal lage riktig navn når navn har mellomrom', () => {
    expect(lagBrukerNavn('TEST TESTER', undefined, 'TESTERSEN')).toEqual(
      'Test Tester Testersen'
    )
    expect(lagBrukerNavn('TEST', undefined, 'TESTERSEN TESTERSON')).toEqual(
      'Test Testersen Testerson'
    )
  })

  test('skal lage riktig navn når navn har bindestrek', () => {
    expect(lagBrukerNavn('TEST-TESTER', undefined, 'TESTERSEN')).toEqual(
      'Test-Tester Testersen'
    )
    expect(lagBrukerNavn('TEST', undefined, 'TESTERSEN-TESTERSON')).toEqual(
      'Test Testersen-Testerson'
    )
  })
})

test('formaterTelefonnummer skal returnere tom string hvis null | undefined | tom', () => {
  expect(formaterTelefonnummer(null)).toEqual('')
  expect(formaterTelefonnummer(undefined)).toEqual('')
  expect(formaterTelefonnummer('')).toEqual('')
})

test('formaterTelefonnummer skal parse norsk landskode', () => {
  expect(formaterTelefonnummer('47526820')).toEqual('47 52 68 20')
  expect(formaterTelefonnummer('4747526820')).toEqual('47 52 68 20')
  expect(formaterTelefonnummer('+4747526820')).toEqual('47 52 68 20')
  expect(formaterTelefonnummer('004747526820')).toEqual('47 52 68 20')
})

test('formaterTelefonnummer skal parse norskt telefonnummer', () => {
  expect(formaterTelefonnummer('+47 12345678')).toEqual('12 34 56 78')
  expect(formaterTelefonnummer('12345678')).toEqual('12 34 56 78')
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
