import { api, loadingDataViaLoop } from '@/api'

class KeyValues {
  generalRoleId = null
  corporateRoleId = null
  unverifiedRoleId = null
  blockedRoleId = null
  usVerifiedRoleId = null
  usAccreditedRoleId = null
  assetTypeDefault = null
  assetTypeKycRequired = null
  assetTypeSecurity = null
  restrictedPollType = null
  unrestrictedPollType = null
  defaultSignerRoleId = null
  issuanceSignerRoleId = null
  bridgesEnabled = null

  async load () {
    const response = await api.get(`/v3/key_values`)
    const kvArray = await loadingDataViaLoop(response)
    const kvGet = this._makeGetter(kvArray)

    this.generalRoleId = kvGet('account_role:general')
    this.corporateRoleId = kvGet('account_role:corporate')
    this.unverifiedRoleId = kvGet('account_role:unverified')
    this.blockedRoleId = kvGet('account_role:blocked')
    this.usVerifiedRoleId = kvGet('account_role:us_verified')
    this.usAccreditedRoleId = kvGet('account_role:us_accredited')
    this.assetTypeDefault = kvGet('asset_type:default')
    this.assetTypeKycRequired = kvGet('asset_type:kyc_required')
    this.assetTypeSecurity = kvGet('asset_type:security')
    this.restrictedPollType = kvGet('poll_type:restricted')
    this.unrestrictedPollType = kvGet('poll_type:unrestricted')
    this.defaultSignerRoleId = kvGet('signer_role:default')
    this.issuanceSignerRoleId = kvGet('signer_role:issuance')
    this.bridgesEnabled = kvGet('bridges_enabled')
  }

  _makeGetter (kvArray) {
    return kvKey => {
      const kvFound = kvArray.find((key) => key.id === kvKey)
      if (!kvFound) return null
      return kvFound.value.u32
    }
  }
}

export const keyValues = new KeyValues()
