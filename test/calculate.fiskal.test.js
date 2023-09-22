import { describe, expect, test } from 'vitest'
import data from 'data/data.json'
import { roundedObjectToNoDecimal, calculate } from './base.js'
import { DateTime } from 'luxon'

describe('Calculate Fiskal Test', () => {
  const today = DateTime.now().startOf('day')

  test('Today', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'fiskal',
          vehicleType: 'SepedaMotor',
          masukanPajak: 450900,
          masaLakuPajak: today.toISODate(),
        })
      )
    ).toMatchObject({
      kekuranganPajak: 37575,
      finalDendaJR: 0,
      PNPBMutasi: 150000,
      total: 187575,
    })
  })

  test('Yesterday', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'fiskal',
          vehicleType: 'SepedaMotor',
          masukanPajak: 450900,
          masaLakuPajak: today.minus({ days: 1 }).toISODate(),
        })
      )
    ).toMatchObject({
      kekuranganPajak: 38828,
      finalDendaJR: 184,
      PNPBMutasi: 150000,
      total: 189011,
    })
  })

  test('Bus, Last 2 years', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'fiskal',
          vehicleType: 'Bus',
          masukanPajak: 705500,
          masaLakuPajak: today.minus({ years: 2 }).toISODate(),
        })
      )
    ).toMatchObject({
      kekuranganPajak: 1489389,
      finalDendaJR: 486000,
      PNPBMutasi: 250000,
      total: 2225389,
    })
  })
})
