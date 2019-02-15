import { RequestRecord } from '../request-record'
import _get from 'lodash/get'
import { isValidJSON } from '@/js/helpers/is-valid-json'
import { STATS_OPERATION_TYPES } from '@tokend/js-sdk'

export class LimitsUpdateRequestRecord extends RequestRecord {
  constructor (record) {
    super(record)

    this.requestType = _get(this.limitsUpdate, 'details.requestType')
    this.asset = _get(this.limitsUpdate, 'details.asset')
    this.operationType = _get(this.limitsUpdate, 'details.operationType')
    this.note = _get(this.limitsUpdate, 'details.note')
    this.limits = _get(this.limitsUpdate, 'details.limits')
  }

  get operationTypeI () {
    return STATS_OPERATION_TYPES[this.operationType]
  }

  get requestedDocs () {
    let requestedDocs = []

    // user may have requested docs only when request state is 'rejected'
    if (this.state === 'rejected' && isValidJSON(this._record.rejectReason)) {
      const rejectReason = JSON.parse(this._record.rejectReason)

      if (Object.keys(rejectReason).includes('docsToUpload')) {
        requestedDocs = rejectReason.docsToUpload
        // replace document-types from 'some type' to 'some_type' to make it
        // valid and allow to translations using
        requestedDocs.forEach(item => {
          item.label = item.label.replace(/ /g, '_')
        })
      }
    }
    return requestedDocs
  }
}
