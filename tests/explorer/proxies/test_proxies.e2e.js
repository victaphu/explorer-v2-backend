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
  eth_getTransactionCount: [
    {
      test: 'test-eth_getTransactionCount-api',
      input: {
        module: 'proxy',
        action: 'eth_getTransactionCount',
        address: '0x4bd5900Cb274ef15b153066D736bf3e83A9ba44e',
        tag: 'latest',
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ],
  eth_sendRawTransaction: [
    {
      test: 'test-eth_sendRawTransaction-api',
      input: {
        module: 'proxy',
        action: 'eth_sendRawTransaction',
        hex: '0xf904808000831cfde080',
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ], 
  eth_getTransactionReceipt: [
    {
      test: 'test-eth_getTransactionReceipt-api',
      input: {
        module: 'proxy',
        action: 'eth_getTransactionReceipt',
        txhash: '0xadb8aec59e80db99811ac4a0235efa3e45da32928bcff557998552250fa672eb',
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: ['blockHash','blockNumber','contractAddress','cumulativeGasUsed','effectiveGasPrice','from','gasUsed','logs'],
      }, // test expected output
    },
  ],
  eth_call: [
    {
      test: 'test-eth_call-api',
      input: {
        module: 'proxy',
        action: 'eth_call',
        to: '0xAEEF46DB4855E25702F8237E8f403FddcaF931C0',
        data: '0x70a08231000000000000000000000000e16359506c028e51f16be38986ec5746251e9724',
        tag: 'latest',
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ],
  eth_getCode: [
    {
      test: 'test-eth_getCode-api',
      input: {
        module: 'proxy',
        action: 'eth_getCode',
        address: '0xf75e354c5edc8efed9b59ee9f67a80845ade7d0c',
        tag: 'latest',
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ],
  eth_getStorageAt: [
    {
      test: 'test-eth_getStorageAt-api',
      input: {
        module: 'proxy',
        action: 'eth_getStorageAt',
        address: '0x6e03d9cce9d60f3e9f2597e13cd4c54c55330cfd',
        position: '0x0',
        tag: 'latest',
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ],
  eth_gasPrice: [
    {
      test: 'test-eth_gasPrice-api',
      input: {
        module: 'proxy',
        action: 'eth_gasPrice',
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ],
  eth_estimateGas: [
    {
      test: 'test-eth_estimateGas-api',
      input: {
        module: 'proxy',
        action: 'eth_estimateGas',
        data: '0x4e71d92d',
        to: '0xf0160428a8552ac9bb7e050d90eeade4ddd52843',
        value: '0xff22',
        gasPrice: '0x51da038cc',
        gas: '0x5f5e0ff',
      },
      output: {
        topLevel: ['jsonrpc', 'id', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ],
}

tester(supportedActions, 'test blocks')
