// localhost:3000/v0/api?module=account&action=*
const {default: fetch} = require('node-fetch')
const {tester} = require('../../utils')

/**
 * Harmony Block Explorer API
 * - eth_blockNumber
 *   eth_getBlockByNumber -
 *   eth_getUncleByBlockNumberAndIndex
 *   eth_getBlockTransactionCountByNumber
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
 */

const supportedActions = {
  eth_blockNumber: [
    {
      test: 'test-eth_blockNumber-api',
      input: {
        module: 'proxy',
        action: 'eth_blockNumber',
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ],
  eth_getBlockByNumber: [
    {
      test: 'test-eth_getBlockByNumber-api',
      input: {
        module: 'proxy',
        action: 'eth_getBlockByNumber',
        tag: '0x10d4f',
        boolean: 'true'
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: ['baseFeePerGas','difficulty','extraData','gasLimit','gasUsed','hash','logsBloom','miner','mixHash','nonce','number','parentHash','receiptsRoot','sha3Uncles','size','stateRoot','timestamp','totalDifficulty','transactions','transactionsRoot','uncles'],
      }, // test expected output
    },
  ],
  eth_getUncleByBlockNumberAndIndex: [
    {
      test: 'test-eth_getUncleByBlockNumberAndIndex-api',
      input: {
        module: 'proxy',
        action: 'eth_getUncleByBlockNumberAndIndex',
        tag: '0xC63276',
        index: '0x0'
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: ['baseFeePerGas','difficulty','extraData','gasLimit','gasUsed','hash','logsBloom','miner','mixHash','nonce','number','parentHash','receiptsRoot','sha3Uncles','size','stateRoot','timestamp','transactionsRoot','uncles'],
      }, // test expected output
    },
  ],
  eth_getBlockTransactionCountByNumber: [
    {
      test: 'test-eth_getBlockTransactionCountByNumber-api',
      input: {
        module: 'proxy',
        action: 'eth_getBlockTransactionCountByNumber',
        tag: '0x10FB78',
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ],
  eth_getTransactionByHash: [
    {
      test: 'test-eth_getTransactionByHash-api',
      input: {
        module: 'proxy',
        action: 'eth_getTransactionByHash',
        txhash: '0xbc78ab8a9e9a0bca7d0321a27b2c03addeae08ba81ea98b03cd3dd237eabed44',
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: ['blockHash','blockNumber','from','gas','gasPrice','maxFeePerGas','maxPriorityFeePerGas','hash','input','nonce','to','transactionIndex','value','type','accessList','chainId','v','r','s'],
      }, // test expected output
    },
  ],
  eth_getTransactionByBlockNumberAndIndex: [
    {
      test: 'test-eth_getTransactionByBlockNumberAndIndex-api',
      input: {
        module: 'proxy',
        action: 'eth_getTransactionByBlockNumberAndIndex',
        tag: '0xC6331D',
        index: '0x11A',
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: ['blockHash','blockNumber','chainId','condition','creates','from','gas','gasPrice','hash','input','maxFeePerGas','maxPriorityFeePerGas','nonce','publicKey','r','raw','s','to','transactionIndex','type','v','value','id'],
      }, // test expected output
    },
  ],
}

tester(supportedActions, 'test blocks')
