import {NextFunction, Request, Response} from 'express'

export async function gasestimate(req: Request, res: Response, next: NextFunction) {
  throw new Error('not implemented')
}

export async function gasoracle(req: Request, res: Response, next: NextFunction) {
  throw new Error('not implemented')
}

const supportedActions = {gasestimate, gasoracle}

export const handler = {
  module: 'gastracker',
  supported: supportedActions,
  supportedActions: Object.keys(supportedActions),
}
