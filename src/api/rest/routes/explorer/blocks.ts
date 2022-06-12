/**
 * Harmony Block Explorer API
 * - Blocks
 *   getblockreward
 *   getblockcountdown
 *   getblocknobytime
 */
import {NextFunction, Request, Response} from 'express'

export async function getblockreward(req: Request, res: Response, next: NextFunction) {}

export async function getblockcountdown(req: Request, res: Response, next: NextFunction) {}

export async function getblocknobytime(req: Request, res: Response, next: NextFunction) {}

const supportedActions = {getblockreward, getblockcountdown, getblocknobytime}

export const handler = {
  module: 'blocks',
  supported: supportedActions,
  supportedActions: Object.keys(supportedActions),
}
