import {NextFunction, Request, Response} from 'express'

export async function gasestimate(req: Request, res: Response, next: NextFunction) {}

export async function gasoracle(req: Request, res: Response, next: NextFunction) {}

const supportedActions = {gasestimate, gasoracle}

export const handler = {
  module: 'gastracker',
  supported: supportedActions,
  supportedActions: Object.keys(supportedActions),
}
