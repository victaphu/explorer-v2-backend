// localhost:3000/v0/api?module=account&action=*
const {default: fetch} = require('node-fetch')
const {tester} = require('../../utils')

/**
 * Harmony Block Explorer API
 * - Stats
 * Get Total Supply of Ether
 * Get Total Supply of Ether 2
 * Get Ether Last Price
 * Get Ethereum Nodes Size
 * Get Total Nodes Count
 */

const supportedActions = {
  ethsupply: [
    {
      test: 'test-ethsupply-api',
      input: {
        module: 'stats',
        action: 'ethsupply',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ],
  ethsupply2: [
    {
      test: 'test-ethsupply2-api',
      input: {
        module: 'stats',
        action: 'ethsupply2',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: ['EthSupply','Eth2Staking','BurntFees'],
      }, // test expected output
    },
  ],
  ethprice: [
    {
      test: 'test-ethprice-api',
      input: {
        module: 'stats',
        action: 'ethprice',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: ['ethbtc','ethbtc_timestamp','ethusd','ethusd_timestamp'],
      }, // test expected output
    },
  ],
  chainsize: [
    {
      test: 'test-chainsize-api',
      input: {
        module: 'stats',
        action: 'chainsize',
        startdate: '2019-02-01',
        enddate:  '2019-02-28',
        clienttype: 'geth',
        syncmode: 'default',
        sort: 'asc',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: ['blockNumber','chainTimeStamp','chainSize','clientType','syncMode'],
      }, // test expected output
    },
  ],
  nodecount: [
    {
      test: 'test-nodecount-api',
      input: {
        module: 'stats',
        action: 'nodecount',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: ['UTCDate','TotalNodeCount'],
      }, // test expected output
    },
  ],
}

tester(supportedActions, 'test blocks')
