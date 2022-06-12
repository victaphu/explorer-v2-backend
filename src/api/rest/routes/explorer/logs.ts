import {NextFunction, Request, Response} from 'express'
import {ethGetLogs} from 'src/api/controllers'

export async function getLogs(req: Request, res: Response, next: NextFunction) {
  // limit 100
  // query supported
  // - blocks
  // - address

  const {fromBlock, toBlock, address} = req.query
  const topics: string[] = []
  Object.keys(req.query).forEach(
    (q) => q.startsWith('topic') && q.length === 6 && topics.push(req.query[q] as string)
  )

  const result = await ethGetLogs(0, {
    fromBlock: fromBlock as string,
    toBlock: toBlock as string,
    address: ((address || '') as string).split(','),
    topics,
  })

  next({
    result: result,
    status: '1',
    message: 'OK',
  })
}

const supportedActions = {getLogs}

export const handler = {
  module: 'logs',
  supported: supportedActions,
  supportedActions: Object.keys(supportedActions),
}
