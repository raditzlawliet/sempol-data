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
          formula: 'pajakKendaraanTahunan',
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
      total: 235100,
    })
  })

  test('Yesterday', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'pajakKendaraanTahunan',
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
      total: 235188,
    })
  })

  test('MicroBus, Last 2 years', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'pajakKendaraanTahunan',
          vehicleType: 'LightTruck',
          masukanPajak: 350000,
          masaLakuPajak: today.minus({ years: 2 }).toISODate(),
        })
      )
    ).toMatchObject({
      njkb: 17948718,
      dasarPengenaanPajak: 23333333,
      pajak: 350000,
      jasaRaharja: 163000,
      kekuranganPajak: 700000,
      finalDendaJR: 526000,
      total: 1739000,
    })
  })
})
