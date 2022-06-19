// localhost:3000/v0/api?module=account&action=*
const {default: fetch} = require('node-fetch')
const {tester} = require('../../utils')

/**
 * Harmony Block Explorer API
 * - Transactions
 *   Check Contract Execution Status
 *   Check Transaction Receipt Status
 */

const supportedActions = {
  getstatus: [
    {
      test: 'test-getstatus-api',
      input: {
        module: 'transaction',
        action: 'getstatus',
        txhash: '0x15f8e5ea1079d9a0bb04a4c58ae5fe7654b5b2b4463375ff7ffb490aa0032f3a',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: ['isError','errDescription'],
      }, // test expected output
    },
  ],
  gettxreceiptstatus: [
    {
      test: 'test-gettxreceiptstatus-api',
      input: {
        module: 'transaction',
        action: 'gettxreceiptstatus',
        txhash: '0x513c1ba0bebf66436b5fed86ab668452b7805593c05073eb2d51d3a52f480a76',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: [],
      }, // test expected output
    },
  ],
}

tester(supportedActions, 'test blocks')
