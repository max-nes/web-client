import { vuexTypes } from './types'
import { Sdk } from '../sdk'
import { Wallet } from '@tokend/js-sdk'

export const state = {
  wallet: {}
}

export const mutations = {
  /**
   * @param state
   * @param wallet - valid instance of {Wallet} from {tokend/js-sdk}
   */
  [vuexTypes.SET_WALLET] (state, wallet) {
    if (!(wallet instanceof Wallet)) {
      throw new Error('Wallet should be an instance of sdk/wallet')
    }
    // FIXME All the fields we're copying from wallet are getters here and are
    //  not being properly serialized. Can be resolved later after implementing
    //  custom toJSON in the sdk Wallet class
    state.wallet.email = wallet.email
    state.wallet.secretSeed = wallet.secretSeed
    state.wallet.id = wallet.id
    state.wallet.accountId = wallet.accountId
  }
}

export const actions = {
  async [vuexTypes.LOAD_WALLET] ({ commit }, { email, password }) {
    commit(vuexTypes.SET_WALLET, await Sdk.api.wallets.get(email, password))
  }
}

export const getters = {
  [vuexTypes.wallet]: state => new Wallet(
    state.wallet.email,
    state.wallet.secretSeed,
    state.wallet.accountId,
    state.wallet.id
  ),
  [vuexTypes.walletId]: (state, getters) => getters[vuexTypes.wallet].id,
  [vuexTypes.walletEmail]: (state, getters) => getters[vuexTypes.wallet].email,
  [vuexTypes.walletSeed]: (state, getters) =>
    getters[vuexTypes.wallet].secretSeed,
  [vuexTypes.walletKeypair]: (state, getters) =>
    getters[vuexTypes.wallet].keypair,
  [vuexTypes.walletPublicKey]: (state, getters) =>
    getters[vuexTypes.wallet].keypair
      ? getters[vuexTypes.wallet].keypair.accountId()
      : ''
}

export default {
  state,
  mutations,
  actions,
  getters
}
