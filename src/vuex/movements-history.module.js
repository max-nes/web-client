import { Movement } from '@/js/records/entities/movement.record'

import { vuexTypes } from './types'
import { api } from '@/api'
import _isEmpty from 'lodash/isEmpty'

export const state = {
  movements: [],
}

export const mutations = {
  [vuexTypes.SET_MOVEMENTS] (state, movements) {
    state.movements = movements
  },
  [vuexTypes.CONCAT_MOVEMENTS] (state, movements) {
    state.movements = state.movements.concat(movements)
  },
}

export const actions = {
  [vuexTypes.LOAD_MOVEMENTS] ({ rootGetters }, assetCode) {
    const balance = rootGetters[vuexTypes.accountBalanceByCode](assetCode)

    if (_isEmpty(balance)) {
      throw new Error(`No balance found for ${assetCode}`)
    }

    return api.getWithSignature('/v3/history', {
      page: {
        order: 'desc',
        limit: 10,
      },
      filter: {
        account: rootGetters[vuexTypes.accountId],
        balance: balance.id,
      },
      include: ['effect', 'operation.details'],
    })
  },

  [vuexTypes.LOAD_SHARE_MOVEMENTS] ({ rootGetters }, assetCode) {
    const balance = rootGetters[vuexTypes.accountBalanceByCode](assetCode)
    if (_isEmpty(balance)) {
      throw new Error(`No balance found for ${assetCode}`)
    }

    return api.getWithSignature('/v3/movements', {
      page: {
        order: 'desc',
        limit: 10,
      },
      filter: {
        asset: assetCode,
      },
      include: ['effect', 'operation.details'],
    })
  },
}

export const getters = {
  [vuexTypes.movements]: state => state.movements.map(m => new Movement(m)),
}

export default {
  state,
  getters,
  actions,
  mutations,
}
