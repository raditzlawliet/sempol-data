import { create, all } from 'mathjs'
import { DateTime } from 'luxon'

const calculate = (
  data,
  input = {
    formula: '',
    vehicleType: '',
    masukanPajak: 0,
    masaLakuPajak: today.toISODate(),
  }
) => {
  const baseWeight = data.baseWeights[input.vehicleType]
  const math = create(all).parser()

  const telatDuration = DateTime.now()
    .startOf('day')
    .diff(DateTime.fromISO(input.masaLakuPajak).startOf('day'), ['days'])
  const telatDay = telatDuration.toObject().days

  math.set('baseWeight', baseWeight)
  math.set('masukanPajak', input.masukanPajak)
  math.set('telatDay', telatDay)

  data.formulas[input.formula].forEach((e) => {
    try {
      math.evaluate(e)
    } catch (err) {
      console.error('invalid formula:', e)
      console.error(err)
    }
  })

  const result = math.getAll()
  math.clear()
  return result
}
// Why? it's need to be same as original, we should follow this... they rounded up... and no use of bigdecimal or money or else
const roundedObjectToNoDecimal = (obj) => {
  for (var key of Object.keys(obj)) {
    if (typeof obj[key] === 'number' && obj[key] !== 0) {
      obj[key] = Math.round(obj[key])
    }
  }
  return obj
}

export { roundedObjectToNoDecimal, calculate }
