import { CreateAssetRequest } from '../wrappers/create-asset-request'

import { base } from '@tokend/js-sdk'

import { types } from './types'
import { api } from '../_api'

const HORIZON_VERSION_PREFIX = 'v3'

export const state = {
  accountId: '',
  requests: [],
  kycRequiredAssetType: null,
}

export const mutations = {
  [types.SET_ACCOUNT_ID] (state, accountId) {
    state.accountId = accountId
  },
  [types.SET_REQUESTS] (state, requests) {
    state.requests = requests
  },
  [types.CONCAT_REQUESTS] (state, requests) {
    state.requests = state.requests.concat(requests)
  },
  [types.SET_KYC_REQUIRED_ASSET_TYPE] (state, assetType) {
    state.kycRequiredAssetType = assetType
  },
}

export const actions = {
  [types.LOAD_REQUESTS] ({ getters }) {
    return api().getWithSignature(`/${HORIZON_VERSION_PREFIX}/create_asset_requests`, {
      page: {
        order: 'desc',
      },
      filter: {
        requestor: getters[types.accountId],
      },
      include: ['request_details'],
    })
  },

  async [types.LOAD_KYC_REQUIRED_ASSET_TYPE] ({ commit }) {
    const endpoint = `/${HORIZON_VERSION_PREFIX}/key_values/asset_type:kyc_required`
    const { data } = await api().get(endpoint)

    commit(types.SET_KYC_REQUIRED_ASSET_TYPE, data.value.u32)
  },

  async [types.CANCEL_REQUEST] (_, requestId) {
    const operation = base.ManageAssetBuilder.cancelAssetRequest({
      requestID: requestId,
    })
    await api().postOperations(operation)
  },
}

export const getters = {
  [types.accountId]: state => state.accountId,
  [types.requests]: state => state.requests
    .map(r => new CreateAssetRequest(r)),
  [types.kycRequiredAssetType]: state => state.kycRequiredAssetType,
}

export const createAssetRequestsModule = {
  name: 'create-asset-requests',
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
