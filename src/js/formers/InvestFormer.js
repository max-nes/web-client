import { Former } from './Former'
import { FEE_TYPES, base } from '@tokend/js-sdk'
import { calculateFees } from '@/js/helpers/fees-helper'
import { MathUtil } from '@/js/utils'

/**
 * Collects the attributes for invest operations
 * @class
 * @implements {Former}
 */
export class InvestFormer extends Former {
    attrs = this.attrs || this._defaultAttrs

    get _defaultAttrs () {
      return {
        senderAccountId: '',
        investedAssetCode: '',
        amount: '0',
        fees: {
          totalFeePercent: '',
        },
        baseBalanceId: '',
        quoteBalanceId: '',
        saleId: '',
        saleBaseAssetCode: '',
        saleQuoteAssetPrices: '',
        currentInvestmentId: '0',
      }
    }

    buildOps () {
      let operations = []

      if (this.attrs.currentInvestmentId) {
        operations.push(this.buildOpCancelOffer())
      }
      this.attrs.currentInvestmentId = '0'
      operations.push(base.ManageOfferBuilder.manageOffer(
        this._getOfferOpts(
          this.attrs.currentInvestmentId,
          this.attrs.fees.totalFeePercent)
      ))

      return operations
    }

    buildOpCancelOffer () {
      const fees = '0'
      const operation = base.ManageOfferBuilder.cancelOffer(
        this._getOfferOpts(
          this.attrs.currentInvestmentId,
          fees
        )
      )
      return operation
    }

    _getOfferOpts (id, offerFee) {
      const attrs = this.attrs
      const defaultQuotePrice = '1'
      const opts = {
        offerID: id,
        baseBalance: attrs.baseBalanceId,
        quoteBalance: attrs.quoteBalanceId,
        isBuy: true,
        amount: MathUtil.divide(
          attrs.amount,
          attrs.saleQuoteAssetPrices ||
          defaultQuotePrice,
          1
        ),
        price: attrs.saleQuoteAssetPrices ||
        defaultQuotePrice,
        fee: offerFee,
        orderBookID: attrs.saleId,
      }
      return opts
    }

    async calculateFees () {
      const response = await calculateFees({
        assetCode: this.attrs.investedAssetCode,
        amount: this.attrs.amount || 0,
        senderAccountId: this.attrs.senderAccountId,
        type: FEE_TYPES.investFee,
      })
      this.attrs.fees.totalFeePercent = response.totalFee.calculatedPercent

      return response
    }
}
