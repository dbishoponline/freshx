import { pipe, allPass, has, isEmpty, isNil } from 'ramda'
import { capitalize } from './helpers'

let quickbooksColumns = [
  ['Name', ''],
  ['Company', ''],
  ['Customer Type', ''],
  ['Email', ''],
  ['Phone', ''],
  ['Mobile', ''],
  ['Fax', ''],
  ['Website', ''],
  ['Street', ''],
  ['City', ''],
  ['State', ''],
  ['ZIP', ''],
  ['Country', ''],
  ['Opening Balance', ''],
  ['Date', ''],
  ['Resale Number', ''],
]

// TODO: add more validation
const Record = record => {
  if(!allPass([true, true])) {
    throw new Error(`CSV columns are not valid.`)

    return record
  }

  return record
}


export const headerRow = columns =>
  columns.map(val => val.slice(0, 1).toString())

export const bodyRow = record => {
  return transformRow(record)
}

export const transformRow = record => {

  const organization = record[0]
  const firstName = record[1]
  const lastName = record[2]
  const email = record[3]
  const phone = record[4]
  const street = record[5]
  const city = record[6]
  const state = record[7]
  const country = record[8]
  const postalCode = record[9]
  const notes = record[10]

  return quickbooksColumns
    .map(val => {

      const update = {
        Name: `${firstName} ${lastName}`,
        Company: `${organization}`,
        Email: `${email}`,
        Phone: `${phone}`,
        Street: `${street}`,
        City: `${city}`,
        State: `${state}`,
        ZIP: `${postalCode}`,
        Country: `${country}`,
      }

      return update[val.slice(0, 1)]
    })
}

let count = 0

export const transform = record => {
  let newRecord = !count
    ? headerRow(quickbooksColumns)
    : bodyRow(Record(record))

  count++

  return newRecord
}

export default {
  transform,
}
