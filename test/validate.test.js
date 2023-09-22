import { describe, test, expect, expectTypeOf, assertType } from 'vitest'
import data from 'data/data.json'

const baseSchema = {
  version: '',
  vehicleTypes: [],
  baseWeights: {},
  formulas: {},
}

const modules = {
  bbnkb: {},
  fiskal: {},
  stnkLimaTahunan: {},
  pajakKendaraanTahunan: {},
}

describe('Validate data', () => {
  test('Mandatory schema', () => {
    expect(data).toBeInstanceOf(Object)
    for (const key in baseSchema) {
      expectTypeOf(data[key]).toEqualTypeOf(data[key])
    }

    data.vehicleTypes.forEach((e) => {
      expect(e).toHaveProperty('value')
      expect(e).toHaveProperty('text')
      expect(e.value).toBeTypeOf('string')
      expect(e.text).toBeTypeOf('string')
    })

    for (const key in data.baseWeights) {
      expect(data.baseWeights[key]).toBeTypeOf('object')
    }

    for (const key in data.formulas) {
      expect(Array.isArray(data.formulas[key])).toBeTruthy()
    }
  })

  test('Key between vehicleTypes & baseWeights', () => {
    data.vehicleTypes.forEach((e) => {
      expect(data.baseWeights).toHaveProperty(e.value)
    })
  })

  test('formula have modules and must array', () => {
    for (const key in modules) {
      expect(data.formulas).toHaveProperty(key)
      expect(Array.isArray(data.formulas[key])).toBeTruthy()
      data.formulas[key].forEach((e) => {
        expect(e).toBeTypeOf('string')
      })
    }
  })
})
