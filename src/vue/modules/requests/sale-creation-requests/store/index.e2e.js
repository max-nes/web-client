import { types } from './types'
import { saleCreationRequestsModule } from './index'

import { Wallet } from '@tokend/js-sdk'
import * as Api from '../_api'

import Vuex from 'vuex'
import Vue from 'vue'

import { Asset } from '../wrappers/asset'

Vue.use(Vuex)

describe('sale creation requests module end-to-end test', () => {
  const accountId = 'GDIU5OQPAFPNBP75FQKMJTWSUKHTQTBTHXZWIZQR4DG4QRVJFPML6TTJ'
  const config = {
    horizonURL: 'https://test.api.com',
  }
  const wallet = new Wallet(
    'test@mail.com',
    'SCPIPHBIMPBMGN65SDGCLMRN6XYGEV7WD44AIDO7HGEYJUNDKNKEGVYE',
    'GDIU5OQPAFPNBP75FQKMJTWSUKHTQTBTHXZWIZQR4DG4QRVJFPML6TTJ',
    '4aadcd4eb44bb845d828c45dbd68d5d1196c3a182b08cd22f05c56fcf15b153c'
  )
  const balances = [
    {
      asset: {
        id: 'USD',
        owner: { id: accountId },
      },
    },
    {
      asset: {
        id: 'BTC',
      },
    },
  ]

  let store

  beforeEach(async () => {
    store = new Vuex.Store(saleCreationRequestsModule)

    Api.initApi(wallet, config)
    sinon.stub(Api.api(), 'getWithSignature').resolves({ data: { balances } })

    store.commit(types.SET_ACCOUNT_ID, accountId)
    await store.dispatch(types.LOAD_ACCOUNT_BALANCES)
  })

  afterEach(() => {
    Api.api().getWithSignature.restore()
  })

  it('accountOwnedAssets', () => {
    const expectedAssets = [
      new Asset({
        id: 'USD',
        owner: { id: accountId },
      }),
    ]

    expect(store.getters[types.accountOwnedAssets])
      .to.deep.equal(expectedAssets)
  })
})
