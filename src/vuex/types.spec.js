import { vuexTypes, rootModule } from './index'

import account from './account.module'
import assets from './assets.module'
import factors from './factors.module'
import kyc from './kyc.module'
import wallet from './wallet.module'
import idleHandler from './idle-handler.module'
import kycRecovery from './kyc-recovery.module'
import identities from './identities.module'
import createAssetRequest from './create-asset-request.module'
import updateAssetRequest from './update-asset-request.module'
import createSaleRequest from './create-sale-request.module'
import preIssuanceRequest from './pre-issuance-request.module'
import incomingWithdrawalRequest from './incoming-withdrawal-request.module'
import pollRequest from './poll-request.module'

describe('vuex types unit tests', () => {
  const getModuleKeys = (module) => {
    return Object.keys({
      ...module.actions,
      ...module.mutations,
      ...module.getters,
    })
  }

  it('every entity in modules should be mentioned in vuex-types', () => {
    for (const key of getModuleKeys(rootModule)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(account)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(assets)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(kyc)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(factors)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(wallet)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(identities)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(idleHandler)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(kycRecovery)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(createAssetRequest)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(updateAssetRequest)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(createSaleRequest)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(preIssuanceRequest)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(incomingWithdrawalRequest)) {
      expect(vuexTypes).to.have.property(key)
    }
    for (const key of getModuleKeys(pollRequest)) {
      expect(vuexTypes).to.have.property(key)
    }
  })

  it('every key described in vuex-types should be a real vuex-entity', () => {
    const moduleKeys = [
      ...getModuleKeys(rootModule),
      ...getModuleKeys(account),
      ...getModuleKeys(assets),
      ...getModuleKeys(kyc),
      ...getModuleKeys(factors),
      ...getModuleKeys(wallet),
      ...getModuleKeys(identities),
      ...getModuleKeys(idleHandler),
      ...getModuleKeys(kycRecovery),
      ...getModuleKeys(createAssetRequest),
      ...getModuleKeys(updateAssetRequest),
      ...getModuleKeys(createSaleRequest),
      ...getModuleKeys(preIssuanceRequest),
      ...getModuleKeys(incomingWithdrawalRequest),
      ...getModuleKeys(pollRequest),
    ]

    for (const key of Object.keys(vuexTypes)) {
      expect(moduleKeys).to.include(key)
    }
  })

  it('every key described in vuex-types should be equal to it\'s value', () => {
    for (const [key, value] of Object.entries(vuexTypes)) {
      expect(key).to.equal(value)
    }
  })
})
