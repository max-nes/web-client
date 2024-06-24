import Vue from 'vue'
import Vuex from 'vuex'

import account from './account.module'
import assets from './assets.module'
import factors from './factors.module'
import wallet from './wallet.module'
import kyc from './kyc.module'
import identities from './identities.module'
import kycRecovery from './kyc-recovery.module'
import assetsModule from '@/vue/modules/assets/shared/store'
import fees from '@/vue/modules/fees/store'
import createAssetRequest from './create-asset-request.module'
import updateAssetRequest from './update-asset-request.module'
import createSaleRequest from './create-sale-request.module'
import preIssuanceRequest from './pre-issuance-request.module'
import incomingWithdrawalRequest from './incoming-withdrawal-request.module'
import pollRequest from './poll-request.module'
import movementsHistory from '@/vue/modules/movements-history/store'
import issuanceExplorer from '@/vue/modules/issuance-explorer/store'
import idleHandler from './idle-handler.module'
import { vuexTypes } from '@/vuex/types'
import { sessionStoragePlugin } from './plugins/session-storage'
import { errors } from '@/js/errors'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { useWallet } from '@/api'
import { Wallet } from '@tokend/js-sdk'

import _isEmpty from 'lodash/isEmpty'

Vue.use(Vuex)

export const rootModule = {
  actions: {
    [vuexTypes.LOG_OUT] ({ commit }) {
      commit(vuexTypes.CLEAR_STATE)
    },
    async [vuexTypes.LOG_IN] ({ getters, dispatch }, { email, password }) {
      await dispatch(vuexTypes.LOAD_WALLET, { email, password })
      await dispatch(vuexTypes.LOAD_ACCOUNT, getters[vuexTypes.walletAccountId])

      const isKycRecoveryInProgress =
        getters[vuexTypes.isAccountKycRecoveryInProgress]
      if (!isKycRecoveryInProgress) {
        await dispatch(vuexTypes.LOAD_KYC)
      }
    },
    async [vuexTypes.RESTORE_SESSION] ({ getters, dispatch }) {
      let walletSeed
      try {
        walletSeed = await dispatch(vuexTypes.DECRYPT_SECRET_SEED)
      } catch (e) {
        if (!(e instanceof errors.NotFoundError)) {
          ErrorHandler.processWithoutFeedback(e)
        }
        dispatch(vuexTypes.LOGOUT_SESSION)
      }

      const wallet = new Wallet(
        getters[vuexTypes.walletEmail],
        walletSeed,
        getters[vuexTypes.walletAccountId],
        getters[vuexTypes.walletId],
      )
      useWallet(wallet)
    },
  },
  mutations: {
    // These mutations are being subscribed by plugins
    [vuexTypes.POP_STATE] () { },
    [vuexTypes.CLEAR_STATE] () { },
  },
  getters: {
    [vuexTypes.isLoggedIn]: (_, getters) => !_isEmpty(
      getters[vuexTypes.account]
    ),
  },
  state: {},
}

let store
function buildStore () {
  store = new Vuex.Store({
    ...rootModule,
    modules: {
      account,
      assets,
      factors,
      wallet,
      kyc,
      identities,
      idleHandler,
      kycRecovery,
      createAssetRequest,
      updateAssetRequest,
      createSaleRequest,
      preIssuanceRequest,
      incomingWithdrawalRequest,
      pollRequest,
      'assets-module': assetsModule,
      'fees': fees,
      'issuance-explorer': issuanceExplorer,
      'movements-history': movementsHistory,
    },
    plugins: [sessionStoragePlugin],
  })

  store.commit(vuexTypes.POP_STATE)

  return store
}
buildStore()

export { store, buildStore }
export { vuexTypes } from './types'
