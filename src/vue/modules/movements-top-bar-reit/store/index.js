import { Balance } from '../wrappers/balance'

import { types } from './types'
import { api } from '../_api'
import { AssetRecord } from '../wrappers/asset.record'

export const state = {
  accountId: '',
  balances: [],
  assets: [],
}

export const mutations = {
  [types.SET_ACCOUNT_ID] (state, accountId) {
    state.accountId = accountId
  },
  [types.SET_BALANCES] (state, balances) {
    state.balances = balances
  },
  [types.SET_ASSETS] (state, assets) {
    state.assets = assets
  },
}

export const actions = {
  async [types.LOAD_BALANCES] ({ commit, getters }) {
    const endpoint = `/v3/accounts/${getters[types.accountId]}`
    const { data: account } = await api().getWithSignature(endpoint, {
      include: ['balances.state'],
    })

    commit(types.SET_BALANCES, account.balances)
  },
  async [types.LOAD_ASSETS] ({ commit, getters }) {
    let response = await api().get('v3/assets')
    let assets = response.data
    while (response.data.length) {
      response = await response.fetchNext()
      assets = [...assets, ...response.data]
    }

    commit(types.SET_ASSETS, assets)
  },
}

export const getters = {
  [types.accountId]: state => state.accountId,
  [types.balances]: state => state.balances.map(b => new Balance(b)),
  [types.assets]: state => state.assets
    .map(a => new AssetRecord(a, state.balances))
    .filter(i => i.balance.id)
    .sort((firstAsset, secondAsset) => secondAsset.isFiat - firstAsset.isFiat),
}

export const MovementsTopBarReitModule = {
  name: 'movements-top-bar-reit',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
