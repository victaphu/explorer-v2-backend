import {FilterType, Filter} from 'src/types'
import {mapNamingReverse} from '../queryMapper'

const mapFilterTypeToSQL: Record<FilterType, string> = {
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  eq: '=',
  startsFrom: 'startsFrom',
  nn: 'is not null',
}

const propertyToString = (property: string) => {
  return mapNamingReverse[property] || property
}

export const buildSQLQuery = (query: Filter) => {
  const safeSQL = (value: any) => {
    // todo safe trim value
    return (value + '')
      .split(' ')
      .join('')
      .replace(/[^a-zA-Z0-9 \\'_-]/g, '')
  }

  const whereQuery = query.filters
    .map((f) => {
      if (f.type === 'startsFrom') {
        return `${propertyToString(f.property)} like '${safeSQL(f.value)}%'`
      }

      if (f.property === 'api_address') {
        return `("from" ${mapFilterTypeToSQL[f.type]} '${safeSQL(f.value)}' or "to" ${
          mapFilterTypeToSQL[f.type]
        } '${safeSQL(f.value)}')`
      }

      if (f.property === 'miner') {
        return `(${propertyToString(f.property)} ${mapFilterTypeToSQL[f.type]} '${safeSQL(
          f.value
        )}')`
      }

      if (f.type === 'nn') {
        return `${propertyToString(f.property)} ${mapFilterTypeToSQL[f.type]}`
      }

      return `${propertyToString(f.property)} ${mapFilterTypeToSQL[f.type]} ${safeSQL(f.value)}`
    })
    .join(' and ')

  const where = whereQuery ? `where ${whereQuery}` : ''
  const offset = query.offset ? `offset ${query.offset || 0}` : ''
  const limit = query.limit ? `limit ${query.limit || 10}` : ''

  let order = ''
  if (query.orderBy && query.orderDirection) {
    order = `order by ${query.orderBy || 'number'} ${query.orderDirection || 'desc'}`
  }

  return `${where} ${order} ${offset} ${limit}`
}
