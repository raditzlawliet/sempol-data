import { describe, expect, test } from 'vitest'
import data from 'data/data.json'
import { roundedObjectToNoDecimal, calculate } from './base.js'
import { DateTime } from 'luxon'

describe('Calculate BBNKB Test', () => {
  const today = DateTime.now().startOf('day')

  test('Today', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'bbnkb',
          vehicleType: 'SepedaMotor',
          masukanPajak: 196500,
          masaLakuPajak: today.toISODate(),
        })
      )
    ).toMatchObject({
      njkb: 13100000,
      dasarPengenaanPajak: 13100000,
      bbn: 131000,
      pajak: 196500,
      jasaRaharja: 35000,
      kekuranganPajak: 16375,
      finalDendaJR: 0,
      bpkb: 225000,
      stnk: 100000,
      platNomor: 60000,
      total: 763875,
    })
  })

  test('Yesterday', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'bbnkb',
          vehicleType: 'SepedaMotor',
          masukanPajak: 196500,
          masaLakuPajak: today.minus({ days: 1 }).toISODate(),
        })
      )
    ).toMatchObject({
      njkb: 13100000,
      dasarPengenaanPajak: 13100000,
      bbn: 131000,
      pajak: 196500,
      jasaRaharja: 35000,
      kekuranganPajak: 16930,
      finalDendaJR: 184,
      bpkb: 225000,
      stnk: 100000,
      platNomor: 60000,
      total: 764614,
    })
  })

  test('Tomorrow', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'bbnkb',
          vehicleType: 'SepedaMotor',
          masukanPajak: 196500,
          masaLakuPajak: today.plus({ days: 1 }).toISODate(),
        })
      )
    ).toMatchObject({
      njkb: 13100000,
      dasarPengenaanPajak: 13100000,
      bbn: 131000,
      pajak: 196500,
      jasaRaharja: 35000,
      kekuranganPajak: 0,
      finalDendaJR: 0,
      bpkb: 225000,
      stnk: 100000,
      platNomor: 60000,
      total: 747500,
    })
  })

  test('Last year', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'bbnkb',
          vehicleType: 'SepedaMotor',
          masukanPajak: 196500,
          masaLakuPajak: today.minus({ years: 1 }).toISODate(),
        })
      )
    ).toMatchObject({
      njkb: 13100000,
      dasarPengenaanPajak: 13100000,
      bbn: 131000,
      pajak: 196500,
      jasaRaharja: 35000,
      kekuranganPajak: 218981,
      finalDendaJR: 67000,
      bpkb: 225000,
      stnk: 100000,
      platNomor: 60000,
      total: 1033481,
    })
  })

  test('Truck, Yesterday', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'bbnkb',
          vehicleType: 'Truck',
          masukanPajak: 196500,
          masaLakuPajak: today.minus({ days: 1 }).toISODate(),
        })
      )
    ).toMatchObject({
      njkb: 9357143,
      dasarPengenaanPajak: 13100000,
      bbn: 93571,
      pajak: 196500,
      jasaRaharja: 163000,
      kekuranganPajak: 16930,
      finalDendaJR: 721,
      bpkb: 375000,
      stnk: 200000,
      platNomor: 100000,
      total: 1145722,
    })
  })

  test('Truck, Last 2 years', () => {
    expect(
      roundedObjectToNoDecimal(
        calculate(data, {
          formula: 'bbnkb',
          vehicleType: 'Truck',
          masukanPajak: 350000,
          masaLakuPajak: today.minus({ years: 2 }).toISODate(),
        })
      )
    ).toMatchObject({
      njkb: 16666667,
      dasarPengenaanPajak: 23333333,
      bbn: 166667,
      pajak: 350000,
      jasaRaharja: 163000,
      kekuranganPajak: 750918,
      finalDendaJR: 526000,
      bpkb: 375000,
      stnk: 200000,
      platNomor: 100000,
      total: 2631585,
    })
  })
  //
})
