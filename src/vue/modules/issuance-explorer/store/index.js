import { Issuance } from '../wrappers/issuance'

import { types } from './types'

import { api } from '../_api'

export const state = {
  accountId: '',
  issuances: [],
}

export const mutations = {
  [types.SET_ACCOUNT_ID] (state, accountId) {
    state.accountId = accountId
  },
  [types.SET_ISSUANCES] (state, issuances) {
    state.issuances = issuances
  },
  [types.CONCAT_ISSUANCES] (state, issuances) {
    state.issuances = state.issuances.concat(issuances)
  },
}

export const actions = {
  [types.LOAD_ISSUANCES] ({ getters }) {
    return api().getWithSignature('/v3/create_issuance_requests', {
      page: {
        order: 'desc',
      },
      filter: {
        requestor: getters[types.accountId],
      },
      include: ['request_details'],
    })
  },
}

export const getters = {
  [types.accountId]: state => state.accountId,
  [types.issuances]: state => state.issuances.map(i => new Issuance(i)),
}

export const issuanceExplorerModule = {
  name: 'issuance-explorer',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
