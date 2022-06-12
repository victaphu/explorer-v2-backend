import * as account from './accounts'
import * as block from './blocks'
import * as gastracker from './gastracker'
import * as logs from './logs'
import * as proxy from './proxies'
import * as stats from './stats'
import * as transaction from './transactions'
import {catchAsync} from 'src/api/rest/utils'
import {Response, Request, Router, NextFunction} from 'express'
import {validator} from 'src/utils/validators/validators'
import {isOneOf} from 'src/utils/validators'

export const explorerRouter = Router({mergeParams: true})

const actions: {[key: string]: any} = {
  account,
  block,
  gastracker,
  logs,
  proxy,
  stats,
  transaction,
}

explorerRouter.get(
  '/',
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {module, action} = req.query

    validator({
      module: isOneOf(module, Object.keys(actions)),
    })

    validator({
      action: isOneOf(action, actions[module as string].handler.supportedActions),
    })

    await actions[module as string].handler.supported[action as string](req, res, next)
  })
)

// this is a post request for all our endpoints
explorerRouter.post(
  '/',
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {module, action} = req.query

    validator({
      module: isOneOf(module, Object.keys(actions)),
    })

    validator({
      action: isOneOf(action, actions[module as string].handler.supportedActions),
    })

    await actions[module as string].handler.supported[action as string](req, res, next)
  })
)
export default actions

/**
 * Harmony Block Explorer API
 * - Accounts
 *   balance
 *   balanceMulti
 *   txlist
 *   txlistinternal
 *   tokentx        // @ts-ignore address already validated  

 * 
 * - Transactions
 *   getstatus
 *   gettxreceiptstatus
 * 
 * - Blocks
 *   getblockreward
 *   getblockcountdown
 *   getblocknobytime
 * 
 * - Logs
 *   getLogs
 * 
 * - Proxy
 *   eth_blockNumber
 *   eth_getBlockByNumber
 *   eth_getUncleByBlockNumberAndIndex
 *   eth_getTransactionByHash
 *   eth_getTransactionByBlockNumberAndIndex
 *   eth_getTransactionCount
 *   eth_sendRawTransaction
 *   eth_getTransactionReceipt
 *   eth_call
 *   eth_getCode
 *   eth_getStorageAt
 *   eth_gasPrice
 *   eth_estimateGas
 *  
 * - Tokens
 *   tokensupply
 *   tokenbalance
 * 
 * - Gas Tracker 
 *   gasestimate
 *   gasoracle
 * 
 * - Stats
 *   ethsupply
 *   ethprice
 *   chainsize
 *   nodecount
 * 
 */
