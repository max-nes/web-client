import { Movement } from '../wrappers/movement'

import { types } from './types'
import { api } from '@/api'
import { vuexTypes } from '@/vuex'

export const state = {
  movements: [],
}

export const mutations = {
  [types.SET_MOVEMENTS] (state, movements) {
    state.movements = movements
  },
  [types.CONCAT_MOVEMENTS] (state, movements) {
    state.movements = state.movements.concat(movements)
  },
}

export const actions = {
  [types.LOAD_MOVEMENTS] ({ rootGetters }, filters) {
    const accountId = filters.accountId
      ? filters.accountId
      : rootGetters[vuexTypes.accountId]

    return api.getWithSignature('/v3/history', {
      page: {
        order: 'desc',
      },
      filter: {
        asset: filters.assetCode,
        account: accountId,
      },
      include: ['effect', 'operation.details'],
    })
  },

  [types.LOAD_SHARE_MOVEMENTS] ({ rootGetters }, assetCode) {
    return api.getWithSignature('/v3/movements', {
      page: {
        order: 'desc',
      },
      filter: {
        asset: assetCode,
      },
      include: ['effect', 'operation.details'],
    })
  },
}

export const getters = {
  [types.movements]: state => state.movements.map(m => new Movement(m)),
}

export const movementsHistoryModule = {
  name: 'movements-history',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
