
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WeatherDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await WeatherDataSDK.test()
    equal(null !== testsdk, true)
  })

})
