import {NextFunction, Request, Response} from 'express'
import {getERC20} from 'src/api/controllers'
import {isAddress, isBlockNumber, isOffset, isOneOf, isPage} from 'src/utils/validators'
import {validator} from 'src/utils/validators/validators'
import * as RPCClient from 'src/indexer/rpc/client'
import {fromHexToNumber} from 'src/utils/fromHexToNumber'
import fetch from 'node-fetch'

export async function ethsupply(req: Request, res: Response, next: NextFunction) {
  const result = await RPCClient.getTotalSupply(0)

  next({
    result: result,
    status: '1',
    message: 'OK',
  })
}

const oneBTCUrl = 'https://api.binance.com/api/v1/ticker/24hr?symbol=ONEBTC'
const oneUSDUrl = 'https://api.binance.com/api/v1/ticker/24hr?symbol=ONEUSDT'

export async function ethprice(req: Request, res: Response, next: NextFunction) {
  const oneBTC = await (await fetch(oneBTCUrl)).json()
  const oneUSD = await (await fetch(oneUSDUrl)).json()

  next({
    result: {
      onebtc: oneBTC.lastPrice,
      onebtc_timestamp: Math.floor(oneBTC.closeTime / 1000).toString(),
      oneusd: oneUSD.lastPrice,
      oneusd_timestamp: Math.floor(oneUSD.closeTime / 1000).toString(),
    },
    status: '1',
    message: 'OK',
  })
}

export async function chainsize(req: Request, res: Response, next: NextFunction) {}

export async function nodecount(req: Request, res: Response, next: NextFunction) {
  const result = await RPCClient.getNodeCount(0)

  next({
    result: {
      UTCDate: new Date().toUTCString(),
      TotalNodeCount: fromHexToNumber(result),
    },
    status: '1',
    message: 'OK',
  })
}

export async function tokensupply(req: Request, res: Response, next: NextFunction) {
  const {contractaddress} = req.query

  validator({
    address: isAddress(contractaddress),
  })

  const results = await getERC20({
    filters: [
      {
        type: 'eq',
        property: 'address',
        value: `'${contractaddress as string}'`,
      },
    ],
  })

  next({
    // @ts-ignore address already validated
    result: results[0].totalSupply,
    status: '1',
    message: 'OK',
  })
}

const supportedActions = {ethsupply, ethprice, chainsize, nodecount, tokensupply}

export const handler = {
  module: 'stats',
  supported: supportedActions,
  supportedActions: Object.keys(supportedActions),
}
