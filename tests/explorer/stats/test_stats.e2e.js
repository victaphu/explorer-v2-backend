// localhost:3000/v0/api?module=account&action=*
const {default: fetch} = require('node-fetch')
const {tester} = require('../../utils')

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

const supportedActions = {
  balance: [
    {
      test: 'test-balance-api',
      input: {
        module: 'account',
        action: 'balance',
        address: '0x0c004686ad7cd05a7611e432b6955bb540653406',
        tag: 'latest',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ],
}

tester(supportedActions, 'test blocks')
