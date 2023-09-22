import { describe, expect, test } from 'vitest'
import data from 'data/data.json'
import { roundedObjectToNoDecimal, calculate } from './base.js'
import { DateTime } from 'luxon'

describe('Calculate STNK 5 Tahunan Test', () => {
  const today = DateTime.now().startOf('day')

  test('Today', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'stnkLimaTahunan',
          vehicleType: 'SepedaMotor',
          masukanPajak: 200100,
          masaLakuPajak: today.toISODate(),
        })
      )
    ).toMatchObject({
      njkb: 13340000,
      dasarPengenaanPajak: 13340000,
      pajak: 200100,
      jasaRaharja: 35000,
      kekuranganPajak: 0,
      finalDendaJR: 0,
      stnk: 100000,
      platNomor: 60000,
      total: 395100,
    })
  })

  test('Yesterday', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'stnkLimaTahunan',
          vehicleType: 'SepedaMotor',
          masukanPajak: 200100,
          masaLakuPajak: today.minus({ days: 1 }).toISODate(),
        })
      )
    ).toMatchObject({
      njkb: 13340000,
      dasarPengenaanPajak: 13340000,
      pajak: 200100,
      jasaRaharja: 35000,
      kekuranganPajak: 0,
      finalDendaJR: 88,
      stnk: 100000,
      platNomor: 60000,
      total: 395188,
    })
  })

  test('MicroBus, Last 2 years', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'stnkLimaTahunan',
          vehicleType: 'Microbus',
          masukanPajak: 350000,
          masaLakuPajak: today.minus({ years: 2 }).toISODate(),
        })
      )
    ).toMatchObject({
      njkb: 21505376,
      dasarPengenaanPajak: 23333333,
      pajak: 350000,
      jasaRaharja: 143000,
      kekuranganPajak: 700000,
      finalDendaJR: 486000,
      stnk: 200000,
      platNomor: 100000,
      total: 1979000,
    })
  })
})
