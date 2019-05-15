import { mutations, actions, getters } from './index'
import { types } from './types'
import { Fee } from '../wrappers/fee'

import { Wallet } from '@tokend/js-sdk'
import { api, useWallet } from '@/api'

describe('fees.module', () => {
  const fees = [
    {
      fixed: '1.000000',
    },
    {
      percent: '2.000000',
    },
  ]

  describe('mutations', () => {
    it('SET_ACCOUNT_FEES should properly modify state', () => {
      const state = {
        fees: [],
      }

      mutations[types.SET_ACCOUNT_FEES](state, fees)

      expect(state).to.deep.equal({ fees })
    })
  })

  describe('actions', () => {
    const wallet = new Wallet(
      'test@mail.com',
      'SCPIPHBIMPBMGN65SDGCLMRN6XYGEV7WD44AIDO7HGEYJUNDKNKEGVYE',
      'GDIU5OQPAFPNBP75FQKMJTWSUKHTQTBTHXZWIZQR4DG4QRVJFPML6TTJ',
      '4aadcd4eb44bb845d828c45dbd68d5d1196c3a182b08cd22f05c56fcf15b153c'
    )

    let store

    beforeEach(() => {
      store = {
        rootGetters: {
          accountId: 'SOME_ACCOUNT_ID',
        },
        commit: sinon.stub(),
        dispatch: sinon.stub(),
      }

      api.useBaseURL('https://test.api.com')
      useWallet(wallet)
    })

    it('LOAD_ACCOUNT_FEES properly commit its set of mutations', async () => {
      sinon.stub(api, 'getWithSignature').resolves({
        data: {
          fees: [{ foo: 'bar' }],
        },
      })

      const expectedMutations = {
        [types.SET_ACCOUNT_FEES]:
        [{ foo: 'bar' }],
      }

      await actions[types.LOAD_ACCOUNT_FEES](store)

      expect(store.commit.args).to.deep.equal(Object.entries(expectedMutations))

      api.getWithSignature.restore()
    })
  })

  describe('getters', () => {
    it('fees', () => {
      const state = { fees }

      expect(getters[types.fees](state))
        .to.deep.equal(fees.map(f => new Fee(f)))
    })
  })
})
