import safeGet from 'lodash/get'

import { ASSET_PAIR_POLICIES } from '@tokend/js-sdk'

export class ManageAssetPairOp {
  constructor (record) {
    this.physicalPrice = safeGet(record, 'physicalPrice')
    this.maxPriceStep = safeGet(record, 'maxPriceStep')
    this.physicalPriceCorrection = safeGet(record, 'physicalPriceCorrection')
    this.policy = safeGet(record, 'policies.value')

    this.baseAssetCode = safeGet(record, 'baseAsset.id')
    this.quoteAssetCode = safeGet(record, 'quoteAsset.id')
  }

  get isTradeable () {
    return Boolean(this.policy & ASSET_PAIR_POLICIES.tradeableSecondaryMarket)
  }

  get isPhysicalPriceRestricted () {
    return Boolean(this.policy & ASSET_PAIR_POLICIES.physicalPriceRestriction)
  }

  get isCurrentPriceRestricted () {
    return Boolean(this.policy & ASSET_PAIR_POLICIES.currentPriceRestriction)
  }
}
