import { AssetRequest } from '@/js/records/requests/asset-request.record'

import { base } from '@tokend/js-sdk'

import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  updateAssetRequests: [],
}

export const mutations = {
  [vuexTypes.SET_UPDATE_ASSET_REQUESTS] (state, requests) {
    state.updateAssetRequests = requests
  },
  [vuexTypes.CONCAT_UPDATE_ASSET_REQUESTS] (state, requests) {
    state.updateAssetRequests = state.updateAssetRequests
      .concat(requests)
  },
}

export const actions = {
  [vuexTypes.LOAD_UPDATE_ASSET_REQUESTS] ({ rootGetters }) {
    return api.getWithSignature('/v3/update_asset_requests', {
      page: {
        order: 'desc',
      },
      filter: {
        requestor: rootGetters[vuexTypes.accountId],
      },
      include: ['request_details'],
    })
  },

  async [vuexTypes.CANCEL_UPDATE_ASSET_REQUEST] (_, requestId) {
    const operation = base.ManageAssetBuilder.cancelAssetRequest({
      requestID: requestId,
    })
    await api.postOperations(operation)
  },
}

export const getters = {
  [vuexTypes.updateAssetRequests]: state => state.updateAssetRequests
    .map(r => new AssetRequest(r)),
}

export default {
  state,
  getters,
  actions,
  mutations,
}
