import {NextFunction, Request, Response} from 'express'
import {getBlockByNumber, getTransactionByField, getTransactionByFilters} from 'src/api/controllers'
import * as RPCClient from 'src/indexer/rpc/client'
import {Transaction} from 'src/types'
import {fromHexToNumber} from 'src/utils/fromHexToNumber'
import {
  isAddress,
  isBlockNumber,
  isOneOf,
  isTransactionHash,
  isTransactionIndex,
  isHexValue,
} from 'src/utils/validators'
import {validator} from 'src/utils/validators/validators'

// prettier-ignore
export async function ethBlockNumber(req: Request, res: Response, next: NextFunction) {
  const result = await RPCClient.getBlockNumber(0)
  console.log(result)
  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
export async function ethGetBlockByNumber(req: Request, res: Response, next: NextFunction) {
  const {tag} = req.query

  const result = await getBlockByNumber(0, +fromHexToNumber(tag as string))
  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
export async function ethGetUncleByBlockNumberAndIndex(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {tag, index} = req.query

  let result = await getBlockByNumber(0, +fromHexToNumber(tag as string))

  if (index && index !== '0x0') {
    if (result.uncle[+fromHexToNumber(index as string)]) {
      result.uncles = result.uncle[+fromHexToNumber(index as string)]
    } else {
      result = null
    }
  }
  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
export async function ethGetBlockTransactionCountByNumber(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {tag} = req.query

  const result = (await getTransactionByField(
    0,
    'block_number',
    +fromHexToNumber(tag as string)
  )) as Transaction[]

  next({
    result: result?.length || 0,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
export async function ethGetTransactionByHash(req: Request, res: Response, next: NextFunction) {
  const {txhash} = req.query

  validator({
    txhash: isTransactionHash(txhash as string),
  })

  const result = await RPCClient.getTransactionByHash(0, txhash as string)
  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
export async function ethGetTransactionByBlockNumberAndIndex(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {tag, index} = req.query
  // transaction_index
  // block_number
  validator({
    block_number: isBlockNumber(+fromHexToNumber(tag as string)),
    transaction_index: isTransactionIndex(+fromHexToNumber(index as string)),
  })

  const result = await getTransactionByFilters(0, {
    filters: [
      {
        type: 'eq',
        property: 'block_number',
        value: +fromHexToNumber(tag as string),
      },
      {
        type: 'eq',
        property: 'transaction_index',
        value: +fromHexToNumber(index as string),
      },
    ],
  })
  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
export async function ethGetTransactionCount(req: Request, res: Response, next: NextFunction) {
  const {address, tag} = req.query // tag should be fixed to latest?

  validator({
    address: isAddress(address as string),
    tag: isOneOf(tag, ['ALL', 'RECEIVED', 'SENT']), // etherscan api would support these three properties
  })

  const result = await RPCClient.getTransactionCount(
    0,
    address as string,
    tag as RPCClient.transactionCountType
  )
  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
export async function ethSendRawTransaction(req: Request, res: Response, next: NextFunction) {
  let hex = req.body.hex
  if (!hex) {
    hex = req.query.hex
  }

  const result = await RPCClient.sendRawTransactions(0, hex as string)

  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
export async function ethGetTransactionReceipt(req: Request, res: Response, next: NextFunction) {
  const {txhash} = req.query

  validator({
    txhash: isTransactionHash(txhash as string),
  })

  const result = await RPCClient.getTransactionReceipt(0, txhash as string)
  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

const getParameters = (req: Request) => {
  const {from, to, gas, gasPrice, value, data, tag} = req.query
  const validations: {[key: string]: any} = {}
  const params: RPCClient.Call = {
    to: to as string,
    data: data as string,
  }

  if (from) {
    validations['from'] = isAddress(from)
    params['from'] = from as string
  }

  if (gas) {
    validations['gas'] = isHexValue(gas)
    params['gas'] = gas as string
  }

  if (gasPrice) {
    validations['gasPrice'] = isHexValue(gasPrice)
    params['gasPrice'] = gasPrice as string
  }

  if (value) {
    validations['value'] = isHexValue(value)
  }

  validations['to'] = isAddress(to)
  params['to'] = to as string

  validations['data'] = isHexValue(data)
  params['data'] = data as string

  validations['tag'] = isOneOf(tag as string, ['latest', 'pending', 'earliest'])

  validator(validations)

  return params
}

// prettier-ignore
export async function ethCall(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const result = await RPCClient.call(0, getParameters(req), tag as string)
  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
export async function ethGetCode(req: Request, res: Response, next: NextFunction) {
  const {address, tag} = req.query

  validator({
    address: isAddress(address as string),
  })

  if (tag) {
    validator({
      tag: isOneOf(tag as string, ['latest', 'pending', 'earliest']),
    })
  }

  const result = await RPCClient.getCode(0, address as string, (tag || 'latest') as string)
  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
export async function ethGetStorageAt(req: Request, res: Response, next: NextFunction) {
  const {address, position, tag} = req.query

  validator({
    address: isAddress(address as string),
    position: isHexValue(position as string),
    tag: isOneOf(tag as string, ['latest', 'pending', 'earliest']),
  })

  const result = await RPCClient.getStorageAt(
    0,
    address as string,
    position as string,
    (tag || 'latest') as string
  )

  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
export async function ethGasPrice(req: Request, res: Response, next: NextFunction) {
  const result = await RPCClient.getPrice(0)

  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
export async function ethEstimateGas(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const result = await RPCClient.estimateGas(0, getParameters(req), tag as string)
  next({
    result: result,
    id: '1',
    jsonrpc: '2.0',
  })
}

// prettier-ignore
const supportedActions = {
  eth_blockNumber: ethBlockNumber,
  eth_getBlockByNumber: ethGetBlockByNumber,
  eth_getUncleByBlockNumberAndIndex: ethGetUncleByBlockNumberAndIndex,
  eth_getBlockTransactionCountByNumber: ethGetBlockTransactionCountByNumber,
  eth_getTransactionByHash: ethGetTransactionByHash,
  eth_getTransactionByBlockNumberAndIndex: ethGetTransactionByBlockNumberAndIndex,
  eth_getTransactionCount: ethGetTransactionCount,
  eth_sendRawTransaction: ethSendRawTransaction,
  eth_getTransactionReceipt: ethGetTransactionReceipt,
  eth_call: ethCall,
  eth_getCode: ethGetCode,
  eth_getStorageAt: ethGetStorageAt,
  eth_gasPrice: ethGasPrice,
  eth_estimateGas: ethEstimateGas,
}

// prettier-ignore
export const handler = {
  module: 'proxy',
  supported: supportedActions,
  supportedActions: Object.keys(supportedActions),
}
