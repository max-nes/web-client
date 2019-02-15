import AssetSelector from './Dashboard.AssetSelector'

import Vue from 'vue'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'

import { createLocalVue, shallowMount } from '@vue/test-utils'
import { globalize } from '@/vue/filters/globalize'
import accountModule from '@/vuex/account.module'
import { vuexTypes } from '@/vuex'
import { MockHelper } from '@/test'
import { ASSET_POLICIES, ACCOUNT_TYPES } from '@tokend/js-sdk'
import { ErrorHandler } from '@/js/helpers/error-handler'
import config from '@/config'
import { AssetRecord } from '@/js/records/entities/asset.record'

Vue.config.silent = true

const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.use(Vuex)
localVue.filter('globalize', globalize)

describe('Dashboard.AssetSelector component', () => {
  let mockHelper
  let store
  let wrapper
  let mockedAccountBalances
  let mockedTokens

  afterEach(() => {
    sinon.restore()
  })

  beforeEach(() => {
    mockHelper = new MockHelper()
    mockedAccountBalances = [
      {
        asset: 'BTC',
        balance: '1',
        assetDetails: new AssetRecord({
          policies: [
            { value: ASSET_POLICIES.transferable },
            { value: ASSET_POLICIES.baseAsset },
          ],
          details: { logo: { key: 'some-key' } },
        }),
      },
      {
        asset: 'USD',
        balance: '3',
        assetDetails: new AssetRecord({
          policies: [
            { value: ASSET_POLICIES.transferable },
            { value: ASSET_POLICIES.baseAsset },
            { value: ASSET_POLICIES.statsQuoteAsset },
          ],
        }),
      },
      {
        asset: 'ETH',
        balance: '0',
        assetDetails: new AssetRecord({
          policies: [
            { value: ASSET_POLICIES.baseAsset },
          ],
        }),
      },
    ]
    mockedTokens = [
      new AssetRecord({
        code: 'USD',
        details: {
          name: 'Dollar',
        },
        policies: [
          {
            value: ASSET_POLICIES.transferable,
          },
          {
            value: ASSET_POLICIES.baseAsset,
          },
          {
            value: ASSET_POLICIES.statsQuoteAsset,
          },
        ],
      }),
      new AssetRecord({
        code: 'BTC',
        details: {
          name: 'Bitcoin',
        },
        policies: [
          {
            value: ASSET_POLICIES.transferable,
          },
          {
            value: ASSET_POLICIES.baseAsset,
          },
        ],
      }),
      new AssetRecord({
        code: 'ETH',
        details: {
          name: 'Ethereum',
        },
        policies: [
          {
            value: ASSET_POLICIES.transferable,
          },
          {
            value: ASSET_POLICIES.baseAsset,
          },
        ],
      }),
    ]
    sinon.stub(accountModule.getters, vuexTypes.accountBalances)
      .returns(mockedAccountBalances)
    sinon.stub(accountModule.getters, vuexTypes.accountTypeI)
      .returns(ACCOUNT_TYPES.syndicate)

    store = new Vuex.Store({
      getters: accountModule.getters,
      actions: accountModule.actions,
    })

    wrapper = shallowMount(AssetSelector, {
      store,
      localVue,
    })
  })

  describe('loadTokens()', () => {
    let assetsResource

    beforeEach(() => {
      assetsResource = mockHelper.getHorizonResourcePrototype('assets')
      sinon.stub(ErrorHandler, 'process')
    })

    it('is called inside created hook', () => {
      sinon.stub(AssetSelector.methods, 'loadTokens')

      shallowMount(AssetSelector, {
        store,
        localVue,
      })

      expect(AssetSelector.methods.loadTokens.calledOnce).to.be.true
    })

    it('works correctly', async () => {
      const expectAssets = { data: [] }
      sinon.stub(assetsResource, 'getAll').resolves(expectAssets)

      await wrapper.vm.loadTokens()

      expect(wrapper.vm.tokens).to.deep.equal(expectAssets.data)
      expect(assetsResource.getAll.calledOnce).to.be.true
      expect(ErrorHandler.process.calledOnce).to.be.false
    })

    it('handle errors', async () => {
      sinon.stub(assetsResource, 'getAll').rejects()

      await wrapper.vm.loadTokens()

      expect(assetsResource.getAll.calledOnce).to.be.true
      expect(wrapper.vm.tokens).to.deep.equal([])
      expect(ErrorHandler.process.calledOnce).to.be.true
    })
  })

  describe('computed properties', () => {
    describe('currentAssetForSelect()', () => {
      it('returns asset name and code if this.tokens list is not empty', () => {
        wrapper.vm.currentAsset = 'ETH'
        wrapper.vm.tokens = mockedTokens

        expect(wrapper.vm.currentAssetForSelect).to.equal('Ethereum (ETH)')
      })

      it('returns empty string if this.tokens list is empty', () => {
        wrapper.vm.currentAsset = 'ETH'
        wrapper.vm.tokens = []

        expect(wrapper.vm.currentAssetForSelect).to.equal('')
      })
    })

    describe('currentAssetBalanceDetails()', () => {
      it('returns balance information when current selected asset exists in balances', () => {
        const expectedResult =
          mockedAccountBalances.find(i => i.asset === 'ETH')

        wrapper.vm.currentAsset = 'ETH'

        expect(wrapper.vm.currentAssetBalanceDetails)
          .to.deep.equal(expectedResult)
      })

      it('returns empty object when current selected asset does not exists in balances', () => {
        wrapper.vm.currentAsset = 'SOME ASSET'

        expect(wrapper.vm.currentAssetBalanceDetails).to.deep.equal({})
      })
    })

    describe('imgUrl()', () => {
      it('returns path to image when logoKey is exists', () => {
        wrapper.vm.currentAsset = 'BTC'

        expect(wrapper.vm.imgUrl).to.equal(`${config.FILE_STORAGE}/some-key`)
      })

      it('returns empty string when logoKey is not exists', () => {
        wrapper.vm.currentAsset = 'USD'

        expect(wrapper.vm.imgUrl).to.equal('')
      })
    })

    it('tokensList()', async () => {
      await wrapper.vm.loadTokens()

      wrapper.vm.tokens = mockedTokens

      expect(wrapper.vm.tokensList)
        .to.deep.equal(['Bitcoin (BTC)', 'Ethereum (ETH)', 'Dollar (USD)'])
    })
  })
})
