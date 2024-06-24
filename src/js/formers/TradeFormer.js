import { Former } from './Former'
import { calculateFees } from '@/js/helpers/fees-helper'
import { MathUtil } from '@/js/utils/math.util'
import { FEE_TYPES, base } from '@tokend/js-sdk'
import { SECONDARY_MARKET_ORDER_BOOK_ID } from '@/js/const/offers'

/**
 * Collects the attributes for trade operations
 * @class
 * @implements {Former}
 */
export class TradeFormer extends Former {
    attrs = this.attrs || this._defaultAttrs
    get _defaultAttrs () {
      return {
        isBuy: false,
        baseAssetCode: '',
        quoteAssetCode: '',
        baseAmount: '',
        quoteAmount: '',
        baseBalanceId: '',
        quoteBalanceId: '',
        creatorAccountId: '',
        fees: {
          totalFeePercent: '',
        },
      }
    }

    async buildOpCreate () {
      const operation = {
        amount: this.attrs.baseAmount,
        price: String(MathUtil.divide(
          +this.attrs.quoteAmount,
          +this.attrs.baseAmount
        )),
        orderBookID: SECONDARY_MARKET_ORDER_BOOK_ID,
        isBuy: this.attrs.isBuy,
        baseBalance: this.attrs.baseBalanceId,
        quoteBalance: this.attrs.quoteBalanceId,
        fee: this.attrs.fees.totalFeePercent,
      }
      return base.ManageOfferBuilder.manageOffer(operation)
    }

    async calculateFees () {
      const fee = await calculateFees({
        assetCode: this.attrs.quoteAssetCode,
        amount: this.attrs.quoteAmount || 0,
        senderAccountId: this.attrs.creatorAccountId,
        type: FEE_TYPES.offerFee,
      })
      this.attrs.fees.totalFeePercent = fee.totalFee.calculatedPercent

      return fee
    }

    /** @param {OfferRecord} source */
    populate (source) {
      this.attrs = this._defaultAttrs

      this.attrs.baseAmount = source.baseAmount
      this.attrs.quoteAmount = source.quoteAmount
      this.attrs.baseAssetCode = source.baseAssetCode
      this.attrs.quoteAssetCode = source.quoteAssetCode
      this.attrs.baseBalanceId = source.baseBalanceId
      this.attrs.quoteBalanceId = source.quoteBalanceId
      this.attrs.isBuy = source.isBuy
    }
}
