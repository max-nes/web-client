import { CreateSaleRequest } from '@/js/records/requests/create-sale-request.record'

import { base } from '@tokend/js-sdk'

import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  createSaleRequests: [],
  balancesAssets: [],
}

export const mutations = {
  [vuexTypes.SET_CREATE_SALE_REQUESTS] (state, requests) {
    state.createSaleRequests = requests
  },
  [vuexTypes.CONCAT_CREATE_SALE_REQUESTS] (state, requests) {
    state.createSaleRequests = state.createSaleRequests
      .concat(requests)
  },
}

export const actions = {
  [vuexTypes.LOAD_CREATE_SALE_REQUESTS] ({ rootGetters }) {
    return api.getWithSignature('/v3/create_sale_requests', {
      page: {
        order: 'desc',
      },
      filter: {
        requestor: rootGetters[vuexTypes.accountId],
      },
      include: ['request_details', 'request_details.default_quote_asset'],
    })
  },

  async [vuexTypes.CANCEL_CREATE_SALE_REQUESTS] (_, requestId) {
    const operation = base.SaleRequestBuilder.cancelSaleCreationRequest({
      requestID: requestId,
    })
    await api.postOperations(operation)
  },
}

export const getters = {
  [vuexTypes.createSaleRequests]: state => state.createSaleRequests
    .map(r => new CreateSaleRequest(r)),
}

export default {
  state,
  getters,
  actions,
  mutations,
}
