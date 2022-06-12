import {NextFunction, Request, Response} from 'express'
import {getTransactionByField} from 'src/api/controllers'

const getTransactionByHash = async (req: Request) => {
  const {txhash} = req.query
  const result = await getTransactionByField(0, 'hash', txhash as string)

  return result
}

export async function getstatus(req: Request, res: Response, next: NextFunction) {
  const result = await getTransactionByHash(req)

  // @ts-ignore
  const error = result?.error

  next({
    result: {
      isError: error ? '1' : '0',
      errDescription: error,
    },
    status: '1',
    message: 'OK',
  })
}

export async function gettxreceiptstatus(req: Request, res: Response, next: NextFunction) {
  const result = await getTransactionByHash(req)

  // @ts-ignore
  const error = result?.error

  next({
    // @ts-ignore address already validated
    result: {
      status: error ? '0' : '1',
    },
    status: '1',
    message: 'OK',
  })
}

const supportedActions = {getstatus, gettxreceiptstatus}

export const handler = {
  module: 'transaction',
  supported: supportedActions,
  supportedActions: Object.keys(supportedActions),
}
