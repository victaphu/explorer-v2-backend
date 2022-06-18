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
  balancemulti: [
    {
      test: 'test-balancemulti-api',
      input: {
        module: 'account',
        action: 'balancemulti',
        address:
          '0xcd19c3c09ad9024cfca6112698494ac247fff976,0xdf9752a0458a7cb6aac74d8183cca66033bfcfa2',
        tag: 'latest',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: ['account', 'balance'],
      }, // test expected output
    },
  ],
  txlist: [
    {
      test: 'test-txlist-api',
      input: {
        module: 'account',
        action: 'txlist',
        address: '0x4e35ff1872a720695a741b00f2fa4d1883440bac',
        startblock: '0',
        endblock: '99999999',
        page: '1',
        offset: '10',
        sort: 'asc',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: [
          'blocknumber',
          'timeStamp',
          'hash',
          'nonce',
          'blockHash',
          'transactionIndex',
          'from',
          'to',
          'value',
          'gas',
          'gasprice',
          'isError',
          'txreceipt_status',
          'input',
          'contactAddress',
          'cumulativeGasUsed',
          'gasUsed',
          'confirmations',
        ],
      }, // test expected output
    },
  ],
  txlistinternal: [
    {
      test: 'test-txlistinternal-api',
      input: {
        module: 'account',
        action: 'txlist',
        address: '0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3',
        startblock: '0',
        endblock: '2702578',
        page: '1',
        offset: '10',
        sort: 'asc',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: [
          'blocknumber',
          'timeStamp',
          'hash',
          'from',
          'to',
          'value',
          'contactAddress',
          'input',
          'type',
          'gas',
          'gasUsed',
          'traceId',
          'IsError',
          'errCode',
        ],
      }, // test expected output
    },
  ],
  txlistinternal: [
    {
      test: 'test-txlistinternal-api',
      input: {
        module: 'account',
        action: 'txlistinternal',
        txhash: '0x40eb908387324f2b575b4879cd9d7188f69c8fc9d87c901b9e2daaea4b442170',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: [
          'blocknumber',
          'timeStamp',
          'from',
          'to',
          'value',
          'contactAddress',
          'input',
          'type',
          'gas',
          'gasUsed',
          'IsError',
          'errCode',
        ],
      }, // test expected output
    },
  ],
  txlistinternal: [
    {
      test: 'test-txlistinternal-api',
      input: {
        module: 'account',
        action: 'txlistinternal',
        startblock: '13481773',
        endblock: '13491773',
        page: '1',
        offset: '10',
        sort: 'asc',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: [
          'blocknumber',
          'timeStamp',
          'hash',
          'from',
          'to',
          'value',
          'contactAddress',
          'input',
          'type',
          'gas',
          'gasUsed',
          'traceId',
          'IsError',
          'errCode',
        ],
      }, // test expected output
    },
  ],
  tokentx: [
    {
      test: 'test-tokentx-api',
      input: {
        module: 'account',
        action: 'tokentx',
        contractaddress: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
        address: '0x4e83362442b8d1bec281594cea3050c8eb01311c',
        page: '1',
        offset: '100',
        startblock: '0',
        endblock: '27025780',
        sort: 'asc',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: [
          'blocknumber',
          'timeStamp',
          'hash',
          'nonce',
          'blockHash',
          'from',
          'contractAddress',
          'to',
          'value',
          'tokenName',
          'tokenSymbol',
          'tokenDecimal',
          'transactionIndex',
          'gas',
          'gasPrice',
          'gasUsed',
          'cumulativeGasUsed',
          'input',
          'confirmations',
        ],
      }, // test expected output
    },
  ],
  tokennfttx: [
    {
      test: 'test-tokenftfx-api',
      input: {
        module: 'account',
        action: 'tokentx',
        contractaddress: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
        address: '0x6975be450864c02b4613023c2152ee0743572325',
        page: '1',
        offset: '100',
        startblock: '0',
        endblock: '27025780',
        sort: 'asc',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: [
          'timeStamp',
          'hash',
          'nonce',
          'blockHash',
          'from',
          'contractAddress',
          'to',
          'tokenID',
          'tokenName',
          'tokenSymbol',
          'tokenDecimal',
          'transactionIndex',
          'gas',
          'gasPrice',
          'gasUsed',
          'cumulativeGasUsed',
          'input',
          'confirmations',
        ],
      }, // test expected output
    },
  ],
  token1155tx: [
    {
      test: 'test-token1155tx-api',
      input: {
        module: 'account',
        action: 'token1155tx',
        contractaddress: '0x76be3b62873462d2142405439777e971754e8e77',
        address: '0x83f564d180b58ad9a02a449105568189ee7de8cb',
        page: '1',
        offset: '100',
        startblock: '0',
        endblock: '99999999',
        sort: 'asc',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: [
          'blocknumber',
          'timeStamp',
          'hash',
          'nonce',
          'blockHash',
          'transactionIndex',
          'gas',
          'gasPrice',
          'gasUsed',
          'cumulativeGasUsed',
          'input',
          'contractAddress',
          'from',
          'to',
          'tokenID',
          'tokenValue',
          'tokenName',
          'tokenSymbol',
          'confirmations',
        ],
      }, // test expected output
    },
  ],
  getminedblocks: [
    {
      test: 'test-getminedblocks-api',
      input: {
        module: 'account',
        action: 'getminedblocks',
        address: '0x9dd134d14d1e65f84b706d6f205cd5b1cd03a46b',
        blocktype: 'blocks',
        page: '1',
        offset: '10',
      },
      output: {
        topLevel: ['status', 'message', 'result'],
        nextLevel: [
          'blockNumber',
          'timeStamp',
          'blockReward',
        ],
      }, // test expected output
    },
  ],

  
}

tester(supportedActions, 'test account')
