import { RequestRecord } from '@/js/records/request-record'
import safeGet from 'lodash/get'
import { MathUtil } from '@/js/utils'

export class IncomingWithdrawalRequest extends RequestRecord {
  constructor (record) {
    super(record)

    this.assetCode = safeGet(record, 'requestDetails.asset.id')
    this.amount = safeGet(record, 'requestDetails.amount')
    this.fixedFee = safeGet(record, 'requestDetails.fee.fixed')
    this.calculatedPercentFee = safeGet(
      record, 'requestDetails.fee.calculatedPercent'
    )

    this.comment = safeGet(record, 'requestDetails.creatorDetails.comment')
  }

  get totalFee () {
    return MathUtil.add(this.fixedFee, this.calculatedPercentFee)
  }
}
