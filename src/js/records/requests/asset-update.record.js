import { ASSET_POLICIES } from '@tokend/js-sdk/lib/index'

import { RequestRecord } from '../request-record'

import _get from 'lodash/get'

export class AssetUpdateRequestRecord extends RequestRecord {
  constructor (record, details) {
    super(record)

    this.assetCode = _get(record, 'details.updateAsset.code')
    this.assetName = _get(this._record, 'details.updateAsset.details.name')
    this.preissuedAssetSigner = _get(
      this._record, 'details.updateAsset.preIssuedAssetSigner'
    )
    this.maxIssuanceAmount = _get(
      this._record, 'details.updateAsset.maxIssuanceAmount'
    )
    this.initialPreissuedAmount = _get(
      this._record, 'details.updateAsset.initialPreissuedAmount'
    )
    this.policies = this._policies()
    this.policy = this._policy()

    this.details = _get(this._record, 'details.updateAsset.details')
    this.terms = _get(this._record, 'details.updateAsset.details.terms')
    this.termsKey = _get(this._record, 'details.updateAsset.details.terms.key')
    this.termsName = _get(
      this._record, 'details.updateAsset.details.terms.name'
    )
    this.termsType = _get(
      this._record, 'details.updateAsset.details.terms.type'
    )
    this.logo = _get(this._record, 'details.updateAsset.details.logo')
    this.logoKey = _get(this._record, 'details.updateAsset.details.logo.key')
    this.logoName = _get(this._record, 'details.updateAsset.details.logo.name')
    this.logoType = _get(this._record, 'details.updateAsset.details.logo.type')
    this.externalSystemType = _get(
      this._record, 'details.updateAsset.details.externalSystemType'
    )

    this.attachedDetails = details
  }

  /**
   * Converts AssetRecord to AssetUpdateRequestRecord.
   *
   * @param {AssetRecord} assetRecord AssetRecord to be converted.
   * @return {AssetUpdateRequestRecord} New AssetUpdateRequestRecord instance.
   */
  static fromAssetRecord (assetRecord) {
    return new this({
      details: {
        updateAsset: {
          code: assetRecord.code,
          preIssuedAssetSigner: assetRecord.preissuedAssetSigner,
          maxIssuanceAmount: assetRecord.maxIssuanceAmount,
          initialPreissuedAmount: assetRecord.initialPreissuedAmount,
          policies: assetRecord.policies,
          details: {
            name: assetRecord.name,
            terms: assetRecord.terms,
            logo: assetRecord.logo,
          },
        },
      },
    })
  }

  logoUrl (storageUrl) {
    return this.logoKey ? `${storageUrl}/${this.logoKey}` : ''
  }

  termsUrl (storageUrl) {
    return this.termsKey ? `${storageUrl}/${this.termsKey}` : ''
  }

  _policies () {
    return _get(this._record, 'details.updateAsset.policies', [])
      .map(policy => policy.value)
  }

  _policy () {
    return this._policies().reduce((s, p) => s | p, 0)
  }

  get isBaseAsset () {
    return !!(this.policy & ASSET_POLICIES.baseAsset)
  }

  get isDepositable () {
    return !!this.externalSystemType
  }

  get isIssuanceManualReviewRequired () {
    return !!(this.policy & ASSET_POLICIES.issuanceManualReviewRequired)
  }

  get isStatsQuoteAsset () {
    return !!(this.policy & ASSET_POLICIES.statsQuoteAsset)
  }

  get isTwoStepWithdrawal () {
    return !!(this.policy & ASSET_POLICIES.twoStepWithdrawal)
  }

  get isTransferable () {
    return !!(this.policy & ASSET_POLICIES.transferable)
  }

  get isWithdrawable () {
    return !!(this.policy & ASSET_POLICIES.withdrawable)
  }
}
