module.exports = {
  tester: (supportedActions, testname) => {
    describe(testname, () => {
      Object.keys(supportedActions).forEach((action) => {
        const supported = supportedActions[action]
        describe(`function test - ${action}`, () => {
          supported.forEach((testConfig) => {
            test(testConfig.test, () => {
              const url =
                'http://localhost:3000/v0/api?' +
                Object.keys(testConfig.input)
                  .map((k) => `${k}=${testConfig.input[k]}`)
                  .join('&')
              console.log(url)
              return fetch(url).then(async (result) => {
                const json = await result.json()
                // console.log(verifiedJson);
                const keys = Object.keys(json).sort()
                expect(keys).toStrictEqual(testConfig.output.topLevel.sort())

                if (testConfig.output.nextLevel?.length > 0) {
                  const obj = Object.keys(json.result[0]).sort()
                  expect(obj).toStrictEqual(testConfig.output.nextLevel.sort())
                }
              })
            })
          })
        })
      })
    })
  },
}
