// localhost:3000/v0/api?module=account&action=*
const {default: fetch} = require('node-fetch')
const {tester} = require('../../utils')

/**
 * Harmony Block Explorer API
 * - Blocks
 *   getblockreward
 *   getblockcountdown
 *   getblocknobytime
 */

const supportedActions = {
  getblockreward: [
    {
      test: 'test-getblockreward-api',
      input: {
        module: 'block',
        action: 'getblockreward',
        blockno: '2165403',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: ['blockNumber','timeStamp','blockMiner','blockReward','uncles'],
      }, // test expected output
    },
  ],
  getblockcountdown: [
    {
      test: 'test-getblockcountdown-api',
      input: {
        module: 'block',
        action: 'getblockcountdown',
        blockno: '16701588',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: ['CurrentBlock','CountdownBlock','RemainingBlock','EstimateTimeInSec'],
      }, // test expected output
    },
  ],
  getblocknobytime: [
    {
      test: 'test-getblocknobytime-api',
      input: {
        module: 'block',
        action: 'getblocknobytime',
        timestamp: '1578638524',
        closest: 'before',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ],
}

tester(supportedActions, 'test blocks')
