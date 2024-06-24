import { RequestRecord } from '@/js/records/request-record'
import safeGet from 'lodash/get'

export class PollRequest extends RequestRecord {
  constructor (record) {
    super(record)

    this.endTime = safeGet(record, 'requestDetails.endTime')
    this.numberOfChoices = safeGet(record, 'requestDetails.numberOfChoices')
    this.permissionType = safeGet(record, 'requestDetails.permissionType')
    this.pollData = safeGet(record, 'requestDetails.pollData')
    this.startTime = safeGet(record, 'requestDetails.startTime')
    this.voteConfirmationRequired = safeGet(record, 'requestDetails.voteConfirmationRequired')
    this.resultProvider = safeGet(record, 'requestDetails.resultProvider.id')
    this.creatorDetails = safeGet(record, 'requestDetails.creatorDetails')
    this.question = safeGet(record, 'requestDetails.creatorDetails.question')
    this.choices = safeGet(record, 'requestDetails.creatorDetails.choices')
  }
}
