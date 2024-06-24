import { Former } from './Former'
import { base, FEE_TYPES } from '@tokend/js-sdk'
import { calculateFees, getCounterparty } from '@/js/helpers/fees-helper'
import { str } from './op-build-helpers'

/**
 * Collects the attributes for transfer-related operations
 * @class
 * @implements {Former}
 */
export class TransferFormer extends Former {
    attrs = this.attrs || this._defaultAttrs
    get _defaultAttrs () {
      return {
        assetCode: '',
        sourceBalanceId: '',
        destination: '',
        amount: '',
        recipient: '',
        subject: '',
        isPaidFeeForRecipient: false,
        recipientAccountId: '',
        fees: {
          sourceFee: {
            percent: '',
            fixed: '',
          },
          destinationFee: {
            percent: '',
            fixed: '',
          },
        },
      }
    }

    buildOps () {
      const attrs = this.attrs

      return base.PaymentBuilder.payment({
        sourceBalanceId: attrs.sourceBalanceId,
        destination: attrs.recipientAccountId,
        amount: attrs.amount,
        feeData: {
          sourceFee: {
            percent: str(attrs.fees.sourceFee.percent),
            fixed: str(attrs.fees.sourceFee.fixed),
          },
          destinationFee: {
            percent: str(attrs.fees.destinationFee.percent),
            fixed: str(attrs.fees.destinationFee.fixed),
          },
          sourcePaysForDest: attrs.isPaidFeeForRecipient,
        },
        subject: attrs.subject,
        asset: attrs.assetCode,
      })
    }

    async calculateFees (senderAccountId) {
      await this._getCounterparty(this.attrs.recipient)

      const response = await calculateFees({
        assetCode: this.attrs.assetCode,
        amount: this.attrs.amount,
        type: FEE_TYPES.paymentFee,
        recipientAccountId: this.attrs.recipientAccountId,
        senderAccountId: senderAccountId,
      })

      this.attrs.fees.sourceFee.percent =
        response.sourceFee.calculatedPercent
      this.attrs.fees.sourceFee.fixed = response.sourceFee.fixed
      this.attrs.fees.destinationFee.percent =
        response.destinationFee.calculatedPercent
      this.attrs.fees.destinationFee.fixed = response.destinationFee.fixed

      return response
    }

    async _getCounterparty (recipient) {
      const response = await getCounterparty(recipient)
      this.attrs.recipientAccountId = response
      this.attrs.destination = this.attrs.recipientAccountId
      return response
    }
}
