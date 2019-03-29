import { mutations, getters, actions } from './index'
import { types } from './types'

import { Wallet } from '@tokend/js-sdk'

import { Movement } from '../wrappers/movement'
import { Balance } from '../wrappers/balance'

import * as ApiImporter from '../_api'
import accountBalancesJSON from '@/test/mocks/account-balances'

describe('movements-history.module', () => {
  const accountId = 'GDIU5OQPAFPNBP75FQKMJTWSUKHTQTBTHXZWIZQR4DG4QRVJFPML6TTJ'
  const balances = [
    {
      id: 'BDPFDXJAL6UY53L52NNWPD7RTAO4EVZL55SWHNYVYJQ44BOEIQKL4FOJ',
      asset: {
        id: 'BTC',
        type: 'assets',
      },
    },
  ]
  const movements = [
    {
      id: '176093659138',
      balance: {
        id: 'BDPFDXJAL6UY53L52NNWPD7RTAO4EVZL55SWHNYVYJQ44BOEIQKL4FOJ',
        type: 'balances',
      },
      asset: {
        id: 'BTC',
        type: 'assets',
      },
    },
  ]

  describe('mutations', () => {
    it('SET_ACCOUNT_ID should properly modify state', () => {
      const state = {
        accountId: '',
      }

      mutations[types.SET_ACCOUNT_ID](state, accountId)

      expect(state).to.deep.equal({
        accountId,
      })
    })

    it('SET_BALANCES should properly modify state', () => {
      const state = {
        balances: [],
      }

      mutations[types.SET_BALANCES](state, balances)

      expect(state).to.deep.equal({
        balances,
      })
    })

    it('SET_MOVEMENTS should properly modify state', () => {
      const state = {
        movements: [],
      }

      mutations[types.SET_MOVEMENTS](state, movements)

      expect(state).to.deep.equal({
        movements,
      })
    })

    it('CONCAT_MOVEMENTS should properly modify state', () => {
      const state = {
        movements,
      }

      mutations[types.CONCAT_MOVEMENTS](state, movements)

      expect(state).to.deep.equal({
        movements: movements.concat(movements),
      })
    })
  })

  describe('actions', () => {
    const wallet = new Wallet(
      'test@mail.com',
      'SCPIPHBIMPBMGN65SDGCLMRN6XYGEV7WD44AIDO7HGEYJUNDKNKEGVYE',
      'GDIU5OQPAFPNBP75FQKMJTWSUKHTQTBTHXZWIZQR4DG4QRVJFPML6TTJ',
      '4aadcd4eb44bb845d828c45dbd68d5d1196c3a182b08cd22f05c56fcf15b153c'
    )
    const config = {
      horizonURL: 'https://test.api.com',
    }

    let store

    beforeEach(() => {
      store = {
        state: {},
        getters: {
          accountId,
        },
        commit: sinon.stub(),
        dispatch: sinon.stub(),
      }

      ApiImporter.initApi(wallet, config)
    })

    describe('LOAD_MOVEMENTS', () => {
      it('calls Api.getWithSignature method with provided params', async () => {
        const assetCode = 'BTC'
        const expectedParams = {
          page: {
            order: 'desc',
          },
          filter: {
            account: 'GDIU5OQPAFPNBP75FQKMJTWSUKHTQTBTHXZWIZQR4DG4QRVJFPML6TTJ',
            balance: 'BDPFDXJAL6UY53L52NNWPD7RTAO4EVZL55SWHNYVYJQ44BOEIQKL4FOJ',
          },
          include: ['effect', 'operation.details'],
        }

        sinon.stub(ApiImporter.api(), 'getWithSignature').resolves()

        await actions[types.LOAD_MOVEMENTS](
          {
            getters: {
              accountId,
              getBalanceByAssetCode: () => ({
                id: 'BDPFDXJAL6UY53L52NNWPD7RTAO4EVZL55SWHNYVYJQ44BOEIQKL4FOJ',
                assetCode: 'BTC',
              }),
            },
          },
          assetCode
        )

        expect(ApiImporter.api().getWithSignature)
          .to.have.been.calledOnceWithExactly(
            '/v3/history',
            expectedParams
          )

        ApiImporter.api().getWithSignature.restore()
      })
    })
    describe('LOAD_BALANCES', () => {
      it('calls Api.getWithSignature method with provided params', async () => {
        sinon.stub(ApiImporter.api(), 'getWithSignature')
          .resolves({
            data: {
              balances: accountBalancesJSON,
            },
          })

        const expectedMutations = {
          [types.SET_BALANCES]: accountBalancesJSON,
        }

        await actions[types.LOAD_BALANCES](store)

        expect(store.commit.args)
          .to
          .deep
          .equal(Object.entries(expectedMutations))

        ApiImporter.api().getWithSignature.restore()
      })
    })
  })

  describe('getters', () => {
    it('accountId', () => {
      const state = { accountId }

      expect(getters[types.accountId](state))
        .to.equal(accountId)
    })

    it('movements', () => {
      const state = { movements }

      expect(getters[types.movements](state))
        .to.deep.equal(movements.map(m => new Movement(m)))
    })
    it('balances', () => {
      const state = { balances }

      expect(getters[types.balances](state))
        .to.deep.equal(balances.map(b => new Balance(b)))
    })
    it('getBalanceByAssetCode', () => {
      const balances = [
        { id: 'BDPFDXJAL6UY53L52NNWPD7RTAO4EVZL55SWHNYVYJQ44BOEIQKL4FOJ',
          assetCode: 'BTC',
        },
        { id: 'BDPFDXJAL6UY53L52NNWPD7RTAO4EVZL55SWHNYVYJQ44BOEIQKL4FFD',
          assetCode: 'ETH',
        },
      ]
      const expectedResult = {
        id: 'BDPFDXJAL6UY53L52NNWPD7RTAO4EVZL55SWHNYVYJQ44BOEIQKL4FOJ',
        assetCode: 'BTC',
      }
      const assetCode = 'BTC'
      const _getters = { balances }

      expect(getters[types.getBalanceByAssetCode]({}, _getters)(assetCode))
        .to
        .deep
        .equal(expectedResult)
    })
  })
})
