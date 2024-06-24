import { PreIssuanceRequest } from '@/js/records/requests/pre-issuance-request.record'

import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  preIssuanceRequests: [],
}

export const mutations = {
  [vuexTypes.SET_PRE_ISSUANCE_REQUESTS] (state, requests) {
    state.preIssuanceRequests = requests
  },
  [vuexTypes.CONCAT_PRE_ISSUANCE_REQUESTS] (state, requests) {
    state.preIssuanceRequests = state.preIssuanceRequests
      .concat(requests)
  },
}

export const actions = {
  [vuexTypes.LOAD_PRE_ISSUANCE_REQUESTS] ({ rootGetters }) {
    const endpoint = '/v3/create_pre_issuance_requests'
    return api.getWithSignature(endpoint, {
      page: {
        order: 'desc',
      },
      filter: {
        requestor: rootGetters[vuexTypes.accountId],
      },
      include: ['request_details'],
    })
  },
}

export const getters = {
  [vuexTypes.preIssuanceRequests]: state => state.preIssuanceRequests
    .map(r => new PreIssuanceRequest(r)),
}

export default {
  state,
  getters,
  actions,
  mutations,
}
