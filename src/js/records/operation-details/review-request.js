import { REVIEW_REQUEST_OP_ACTION } from '@tokend/js-sdk'

/**
 * Review request operation can trigger such effects:
 *  * approving/rejecting withdraw request will trigger withdrawn/unlocked
 *  * approving/rejecting issuance request will trigger issued/unlocked
 *  * approving/rejecting aml alert request will trigger withdrawn/unlocked
 */
export class ReviewRequestOp {
  constructor (record) {
    this.reason = record.reason
    this.isFulfilled = record.isFulfilled
    this.actionValue = record.action.value

    this.creatorDetails = record.creatorDetails
  }

  get isApprove () {
    return this.actionValue === REVIEW_REQUEST_OP_ACTION.approve
  }

  get isReject () {
    return this.actionValue === REVIEW_REQUEST_OP_ACTION.reject
  }

  get isPermanentReject () {
    return this.actionValue === REVIEW_REQUEST_OP_ACTION.permanentReject
  }
}
