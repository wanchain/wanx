const sinon = require('sinon')
const { expect } = require('chai')

const web3Util = require('../src/lib/web3')

const sandbox = sinon.createSandbox();

let count = 0

const web3 = {
  version: '1.0.0',
  eth: {
    getPastLogs() {
      count++

      if (count <= 3) {
        return new Promise((res, rej) => res([]))
      }

      return new Promise((res, rej) => res([{}]))
    }
  }
}

describe('web3 watchLogs', () => {

  it('should repeatedly call getLogs until res is not empty', (done) => {
    const w = web3Util(web3)
    const opts = { abc: 123 }

    // replace setTimeout for testing
    w.timeout = cb => cb()

    const timeout = sinon.spy(w, 'timeout')

    const call = w.watchLogs(opts)

    call.then(res => {
      expect(res).to.be.a('object')
      expect(timeout.callCount).to.equal(3)
      done();
    })
  })

})
