import { Former } from './Former'
import { base, FEE_TYPES } from '@tokend/js-sdk'
import { calculateFees } from '@/js/helpers/fees-helper'

/**
 * Collects the attributes for withdrawal operations
 * @class
 * @implements {Former}
 */
export class WithdrawalFormer extends Former {
    attrs = this.attrs || this._defaultAttrs

    get _defaultAttrs () {
      return {
        assetCodeForWithdrawal: '',
        amount: '0',
        fees: {
          sourceFee: {
            fixed: '',
            calculatedPercent: '',
          },
        },
        senderAccountId: '',
        selectedAssetBalanceId: '',
        creatorDetails: {
          address: '',
          comment: '',
        },
      }
    }

    buildOps () {
      const operation = base.CreateWithdrawRequestBuilder
        .createWithdrawWithAutoConversion({
          balance: this.attrs.selectedAssetBalanceId,
          amount: this.attrs.amount,
          creatorDetails: this.attrs.creatorDetails,
          destAsset: this.attrs.assetCodeForWithdrawal,
          expectedDestAssetAmount: this.attrs.amount,
          fee: {
            fixed: this.attrs.fees.sourceFee.fixed,
            percent: this.attrs.fees.sourceFee.calculatedPercent,
          },
        })
      return operation
    }

    async calculateFees () {
      const attrs = this.attrs
      const response = await calculateFees({
        assetCode: attrs.assetCodeForWithdrawal,
        amount: attrs.amount || 0,
        senderAccountId: attrs.senderAccountId,
        type: FEE_TYPES.withdrawalFee,
      })
      this.attrs.fees.sourceFee.fixed = response.sourceFee.fixed
      this.attrs.fees.sourceFee.calculatedPercent =
        response.sourceFee.calculatedPercent

      return response
    }
}
