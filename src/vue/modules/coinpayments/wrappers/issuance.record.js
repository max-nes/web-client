import _get from 'lodash/get'
import moment from 'moment'

export class IssuanceRecord {
  constructor (record, detailsOrAccountId) {
    this.id = record.id
    this.txId = _get(record, 'requestDetails.creatorDetails.txnId')
    this.amount = _get(record, 'requestDetails.amount')
    this.asset = _get(record, 'requestDetails.asset.id')
    this.date = _get(record, 'createdAt')
    this.timeout = _get(record, 'requestDetails.creatorDetails.timeout')
    this.address = _get(record, 'requestDetails.creatorDetails.address')

    this.timeLeft = this._calculateTimeout()
  }

  _calculateTimeout () {
    const margin = 600 // seconds
    const now = moment()
    const createdAt = moment(this.date)
    const diff = now.diff(createdAt) / 1000
    return this.timeout - diff - margin
  }
}
