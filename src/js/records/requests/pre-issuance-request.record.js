import { RequestRecord } from '@/js/records/request-record'

import safeGet from 'lodash/get'

export class PreIssuanceRequest extends RequestRecord {
  constructor (record) {
    super(record)

    this.assetCode = safeGet(record, 'requestDetails.asset.id')
    this.amount = safeGet(record, 'requestDetails.amount')
  }
}
