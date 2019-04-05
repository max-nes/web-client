import { vuexTypes } from '@/vuex/types'
import { Api } from '@/api'

const KEY_VALUE_ENTRY_KEYS = Object.freeze({
  general: 'account_role:general',
  corporate: 'account_role:corporate',
  unverified: 'account_role:unverified',
})

export const state = {
  defaultRoleIds: {
    general: null,
    corporate: null,
    unverified: null,
  },
  kvAssetTypeKycRequired: null,
}

export const mutations = {
  [vuexTypes.SET_KV_ENTRY_GENERAL_ROLE_ID] (state, id) {
    state.defaultRoleIds.general = id
  },

  [vuexTypes.SET_KV_ENTRY_CORPORATE_ROLE_ID] (state, id) {
    state.defaultRoleIds.corporate = id
  },

  [vuexTypes.SET_KV_ENTRY_UNVERIFIED_ROLE_ID] (state, id) {
    state.defaultRoleIds.unverified = id
  },
  [vuexTypes.SET_KV_KYC_REQUIRED] (state, kvAssetTypeKycRequired) {
    state.kvAssetTypeKycRequired = kvAssetTypeKycRequired
  },
}

export const actions = {
  async [vuexTypes.LOAD_KV_ENTRIES] ({ dispatch }) {
    await dispatch(vuexTypes.LOAD_KV_ENTRIES_ACCOUNT_ROLE_IDS)
    await dispatch(vuexTypes.LOAD_KV_KYC_REQUIRED)
  },

  async [vuexTypes.LOAD_KV_ENTRIES_ACCOUNT_ROLE_IDS] ({ commit }) {
    const { data } = await Api.api.get(`v3/key_values`)
    const [generalRoleId, corporateRoleId, unverifiedRoleId] = [
      getRole(KEY_VALUE_ENTRY_KEYS.general),
      getRole(KEY_VALUE_ENTRY_KEYS.corporate),
      getRole(KEY_VALUE_ENTRY_KEYS.unverified),
    ]

    function getRole (roleId) {
      const role = data.find((key) => key.id === roleId)
      return role.value.u32
    }

    commit(vuexTypes.SET_KV_ENTRY_GENERAL_ROLE_ID, generalRoleId)
    commit(vuexTypes.SET_KV_ENTRY_CORPORATE_ROLE_ID, corporateRoleId)
    commit(vuexTypes.SET_KV_ENTRY_UNVERIFIED_ROLE_ID, unverifiedRoleId)
  },
  async [vuexTypes.LOAD_KV_KYC_REQUIRED] ({ commit }) {
    const { data } = await Api.api.get(`v3/key_values/asset_type:kyc_required`)
    commit(vuexTypes.SET_KV_KYC_REQUIRED, data.value.u32)
  },
}

export const getters = {
  [vuexTypes.kvEntryGeneralRoleId]: state => state.defaultRoleIds.general,
  [vuexTypes.kvEntryCorporateRoleId]: state => state.defaultRoleIds.corporate,
  [vuexTypes.kvEntryUnverifiedRoleId]: state => state.defaultRoleIds.unverified,
  [vuexTypes.kvAssetTypeKycRequired]: state => state.kvAssetTypeKycRequired,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
