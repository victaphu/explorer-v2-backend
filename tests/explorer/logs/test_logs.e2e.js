// localhost:3000/v0/api?module=account&action=*
const {default: fetch} = require('node-fetch')
const {tester} = require('../../utils')

/**
 * Harmony Block Explorer API
 * - Sample Log API Queries
 */

const supportedActions = {
  getLogs: [
    {
      test: 'test-getLogs-api',
      input: {
        module: 'logs',
        action: 'getLogs',
        fromBlock: '379224',
        toBlock: 'latest',
        address: '0x33990122638b9132ca29c723bdf037f1a891a70c',
        topic0: '0xf63780e752c6a54a94fc52715dbc5518a3b4c3c2833d301a204226548a2a8545',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: ['address','topics','data','blockNumber','timeStamp','gasPrice','gasUsed','logIndex','transactionHash','transactionIndex'],
      }, // test expected output
    },
  ],
}

tester(supportedActions, 'test blocks')
