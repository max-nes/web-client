import { AssetRequest } from '@/js/records/requests/asset-request.record'

import { base } from '@tokend/js-sdk'

import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  createAssetRequests: [],
  kycRequiredAssetType: null,
  securityAssetType: null,
}

export const mutations = {
  [vuexTypes.SET_CREATE_ASSET_REQUESTS] (state, requests) {
    state.createAssetRequests = requests
  },
  [vuexTypes.CONCAT_CREATE_ASSET_REQUESTS] (state, requests) {
    state.createAssetRequests = state.createAssetRequests.concat(requests)
  },
  [vuexTypes.SET_SECURITY_ASSET_TYPE] (state, assetType) {
    state.securityAssetType = assetType
  },
  [vuexTypes.SET_KYC_REQUIRED_ASSET_TYPE] (state, assetType) {
    state.kycRequiredAssetType = assetType
  },
}

export const actions = {
  [vuexTypes.LOAD_CREATE_ASSET_REQUESTS] ({ rootGetters }) {
    return api.getWithSignature('/v3/create_asset_requests', {
      page: {
        order: 'desc',
      },
      filter: {
        requestor: rootGetters[vuexTypes.accountId],
      },
      include: ['request_details'],
    })
  },

  async [vuexTypes.LOAD_KYC_REQUIRED_ASSET_TYPE] ({ commit }) {
    const endpoint = '/v3/key_values/asset_type:kyc_required'
    const { data } = await api.get(endpoint)

    commit(vuexTypes.SET_KYC_REQUIRED_ASSET_TYPE, data.value.u32)
  },

  async [vuexTypes.LOAD_SECURITY_ASSET_TYPE] ({ commit }) {
    const endpoint = `/v3/key_values/asset_type:security`
    const { data } = await api.get(endpoint)

    commit(vuexTypes.SET_SECURITY_ASSET_TYPE, data.value.u32)
  },

  async [vuexTypes.CANCEL_CREATE_ASSET_REQUEST] (_, requestId) {
    const operation = base.ManageAssetBuilder.cancelAssetRequest({
      requestID: requestId,
    })
    await api.postOperations(operation)
  },
}

export const getters = {
  [vuexTypes.createAssetRequests]: state => state.createAssetRequests
    .map(r => new AssetRequest(r)),
  [vuexTypes.kycRequiredAssetType]: state => state.kycRequiredAssetType,
  [vuexTypes.securityAssetType]: state => state.securityAssetType,
}

export default {
  state,
  getters,
  actions,
  mutations,
}
