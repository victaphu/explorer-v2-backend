/**
 * Harmony Block Explorer API
 * - Blocks
 *   getblockreward
 *   getblockcountdown
 *   getblocknobytime
 */
import {NextFunction, Request, Response} from 'express'
import {getBlocksByTimeRange} from 'src/api/controllers'
import {isOneOf, isTimestamp} from 'src/utils/validators'
import {validator} from 'src/utils/validators/validators'

export async function getblockreward(req: Request, res: Response, next: NextFunction) {
  throw new Error('not implemented')
}

export async function getblockcountdown(req: Request, res: Response, next: NextFunction) {
  throw new Error('not implemented')
}

export async function getblocknobytime(req: Request, res: Response, next: NextFunction) {
  // get block number by timestamp
  const {timestamp, closest} = req.query

  // if before, do range search of timestamp and return the latest
  validator({
    closest: isOneOf(closest as string, ['before', 'after']),
    timestamp: isTimestamp(+(timestamp as string)),
  })

  let start = +(timestamp as string)
  let end = +(timestamp as string)

  if (closest === 'before') {
    start = start -= 60 * 5 // sub 5 minutes
  } else {
    end = end += 60 * 5 // add 5 minutes
  }

  // find blocks between the start and end time; if before return last item, else return first item
  const result = await getBlocksByTimeRange(0, start, end)

  next({
    result: closest === 'before' ? result[result.length - 1] : result[0],
    status: '1',
    message: 'OK',
  })
}

const supportedActions = {getblockreward, getblockcountdown, getblocknobytime}

export const handler = {
  module: 'blocks',
  supported: supportedActions,
  supportedActions: Object.keys(supportedActions),
}
