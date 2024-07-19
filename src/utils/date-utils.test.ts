import { expect, test } from 'vitest'

import { stringToDate } from './date-utils'

test('stringToDate should convert string into date', () => {
  expect(stringToDate('2020-06-31')).toStrictEqual(new Date(2020, 5, 31))
})
