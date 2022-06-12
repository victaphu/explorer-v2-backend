/**
 * Harmony Block Explorer API
 * - Accounts
 *   balance -
 *   balanceMulti
 *   txlist
 *   txlistinternal
 *   tokentx
 *   tokennfttx
 *   getminedblocks
 */

import {NextFunction, Request, Response} from 'express'
import {
  getERC1155Events,
  getERC20Balance,
  getERC20Events,
  getERC721Events,
  getInternalTransactions,
  getInternalTransactionsByField,
  getMinedBlocks,
  getTransactions,
  getUserERC20Balances,
} from 'src/api/controllers'
import * as RPCClient from 'src/indexer/rpc/client'
import {
  Filter,
  FilterEntry,
  FilterOrderBy,
  FilterOrderDirection,
  FilterProperty,
  FilterType,
} from 'src/types'
import {isAddress, isBlockNumber, isOffset, isOneOf, isPage} from 'src/utils/validators'
import {validator} from 'src/utils/validators/validators'

const fetchBalances = async (addresses: string, tag: string | number) => {
  const addressList = addresses.split(',')
  const balanceResult: any[] = []
  if (tag) {
    if (isNaN(+tag)) {
      validator({
        tag: isBlockNumber(tag),
      })
    } else {
      validator({
        tag: isOneOf(tag, ['latest', 'pending', 'earliest']),
      })
    }
  }

  for (const address of addressList) {
    // should parallelize?
    validator({
      address: isAddress(address),
    })
    balanceResult.push({balance: await RPCClient.getBalance(0, address, tag), account: address})
  }

  return balanceResult
}

export async function balance(req: Request, res: Response, next: NextFunction) {
  const {address, tag} = req.query

  next({
    // @ts-ignore address already validated
    result: (await fetchBalances(address, tag))[0].balance,
    status: '1',
    message: 'OK',
  })
}

export async function balanceMulti(req: Request, res: Response, next: NextFunction) {
  const {address, tag} = req.query

  next({
    // @ts-ignore address already validated
    result: await fetchBalances(address, tag),
    status: '1',
    message: 'OK',
  })
}

const createTxPagingRequest = (req: Request): Filter => {
  const {address, startblock, endblock, page, offset, sort} = req.query
  validator({
    startblock: isBlockNumber(+(startblock as string)),
    endblock: isBlockNumber(+(endblock as string)),
    page: isPage(+(page as string)),
    offset: isOffset(+(offset as string)),
    sort: isOneOf(sort as string, ['asc', 'desc']),
  })

  const filter = {
    offset: +(page as string),
    limit: +(offset as string),
    orderDirection: sort as FilterOrderDirection,
    orderBy: 'block_number' as FilterOrderBy,
    filters: [
      {
        type: 'gte' as FilterType,
        property: 'block_number' as FilterProperty,
        value: startblock as string,
      } as FilterEntry,
      {
        type: 'lte' as FilterType,
        property: 'block_number' as FilterProperty,
        value: endblock,
      } as FilterEntry,
    ],
  }

  return filter
}

export async function txlist(req: Request, res: Response, next: NextFunction) {
  const filter = createTxPagingRequest(req)

  validator({address: isAddress(req.query.address as string)})

  const result = await getTransactions(0, filter)
  next({
    result: result,
    status: '1',
    message: 'OK',
  })
}

export async function txlistinternal(req: Request, res: Response, next: NextFunction) {
  let result
  if (req.query.txhash) {
    result = await getInternalTransactionsByField(0, 'transaction_hash', req.query.txhash as string)
  } else {
    const filter = createTxPagingRequest(req)
    if (req.query.address) {
      filter.filters.push({
        type: 'eq' as FilterType,
        property: 'api_address' as FilterProperty,
        value: req.query.address as string,
      })
    }
    result = await getInternalTransactions(0, filter)
  }

  next({
    result: result,
    status: '1',
    message: 'OK',
  })
}

const createTokenFilter = (req: Request): Filter => {
  // contract address
  // address
  // paging and block info

  const filter = createTxPagingRequest(req)
  // contract address (optional)

  const {address, contractaddress} = req.query
  const validatorList: {[key: string]: any} = {}

  if (address) {
    validatorList['address'] = isAddress(address as string)
    filter.filters.push({
      type: 'eq',
      property: 'api_address',
      value: address as string,
    })
  }
  if (contractaddress) {
    validatorList['contractaddress'] = isAddress(contractaddress as string)
    filter.filters.push({
      type: 'eq',
      property: 'address',
      value: address as string,
    })
  }

  filter.filters.push({
    type: 'eq',
    property: 'event_type',
    value: `'Transfer'`,
  })

  validator(validatorList)

  return filter
}

export async function tokentx(req: Request, res: Response, next: NextFunction) {
  const filter = createTokenFilter(req)

  filter.filters.push({
    type: 'eq',
    property: 'transaction_type',
    value: `'erc20'`,
  })

  const result = await getERC20Events(filter)
  next({
    result: result,
    status: '1',
    message: 'OK',
  })
}

export async function tokennfttx(req: Request, res: Response, next: NextFunction) {
  const filter = createTokenFilter(req)

  filter.filters.push({
    type: 'eq',
    property: 'transaction_type',
    value: `'erc721'`,
  })
  const result = await getERC721Events(filter)
  next({
    result: result,
    status: '1',
    message: 'OK',
  })
}

export async function token1155tx(req: Request, res: Response, next: NextFunction) {
  const filter = createTokenFilter(req)

  filter.filters.push({
    type: 'eq',
    property: 'transaction_type',
    value: `'erc1155'`,
  })
  const result = await getERC1155Events(filter)
  next({
    result: result,
    status: '1',
    message: 'OK',
  })
}

export async function getminedblocks(req: Request, res: Response, next: NextFunction) {
  const {address, blocktype, page, offset} = req.query

  validator({
    address: isAddress(address),
    blocktype: isOneOf(blocktype, ['blocks', 'uncles']),
    page: isPage(+(page as string)),
    offset: isOffset(+(offset as string)),
  })

  const filter = {
    offset: +(page as string),
    limit: +(offset as string),
    orderDirection: 'asc' as FilterOrderDirection,
    orderBy: 'number' as FilterOrderBy,
    filters: [
      {
        type: 'eq' as FilterType,
        property: 'miner' as FilterProperty,
        value: address as string,
      } as FilterEntry,
    ],
  }

  if (blocktype === 'uncles') {
    filter.filters.push({
      type: 'nn' as FilterType,
      property: 'sha3_uncles' as FilterProperty,
      value: address as string,
    } as FilterEntry)
  }
  // RPCClient.getBlocks

  next({
    result: await getMinedBlocks(0, filter),
    status: '1',
    message: 'OK',
  })
}

export async function tokenbalance(req: Request, res: Response, next: NextFunction) {
  // support only latest balance
  const {address, contractaddress} = req.query

  const result = await getERC20Balance(contractaddress as string, address as string)
  console.log(result)
  next({
    result: result?.balance || '0',
    status: '1',
    message: 'OK',
  })
}

const supportedActions = {
  balance,
  balanceMulti,
  txlist,
  txlistinternal,
  tokentx,
  tokennfttx,
  token1155tx,
  tokenbalance,
  getminedblocks,
}

export const handler = {
  module: 'account',
  supported: supportedActions,
  supportedActions: Object.keys(supportedActions),
}
