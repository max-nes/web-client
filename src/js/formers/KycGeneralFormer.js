import { Former } from './Former'
import { base, BLOB_TYPES, Document } from '@tokend/js-sdk'
import { doc, str, reqId } from './op-build-helpers'
import { KycGeneralRecord } from '@/js/records/entities/kyc-general.record'
import { KycRequestRecord } from '@/js/records/requests/kyc-request.record'
import { KycRecoveryRequestRecord } from '@/js/records/requests/kyc-recovery-request.record'
import { BlobRecord } from '@/js/records/entities/blob.record'
import { toRFC3339 } from '@/js/helpers/date-helpers'
import { createPrivateBlob, getCurrentAccId } from '@/js/helpers/api-helpers'
import { isUSResidence, buildKycRecoveryOp } from '@/js/helpers/kyc-helpers'
import { keyValues } from '@/key-values'
import get from 'lodash/get'

/**
 * Collects the attributes for kyc-general operations
 * @class
 * @implements {Former}
 */
export class KycGeneralFormer extends Former {
  attrs = this.attrs || this._defaultAttrs

  get _defaultAttrs () {
    return {
      requestId: '0',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      age: '',
      idDocType: '',
      idDocFace: new Document(),
      idDocBack: new Document(),
      proofOfInvestor: new Document(),
      selfie: new Document(),
      avatar: new Document(),
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      },
    }
  }

  /* eslint-disable max-len */
  _opBuilder = this._opBuilder || this._buildOpUpdate
  get isUpdateOpBuilder () { return this._opBuilder === this._buildOpUpdate }
  get isRecoveryOpBuilder () { return this._opBuilder === this._buildOpRecovery }
  useUpdateOpBuilder () { this._opBuilder = this._buildOpUpdate; return this }
  useRecoveryOpBuilder () { this._opBuilder = this._buildOpRecovery; return this }
  /* eslint-enable max-len */

  get willUpdateRequest () {
    const id = this.attrs.requestId
    return Boolean(id && typeof id === 'string' && id !== '0')
  }

  async buildOps () {
    await Document.uploadDocumentsDeep(this.attrs)
    const op = await this._opBuilder()
    return [op]
  }

  // eslint-disable-next-line max-len
  /** @param {KycGeneralRecord|KycRequestRecord|KycRecoveryRequestRecord} source */
  populate (source) {
    switch (source.constructor) {
      case KycGeneralRecord:
        this._populateFromRecord(source)
        break

      case KycRequestRecord:
        this._populateFromRequest(source)
        break

      case KycRecoveryRequestRecord:
        this._populateFromRecoveryRequest(source)
        break

      default:
        throw new TypeError('Unknown source type')
    }
    return this
  }

  /** @param {KycGeneralRecord} source */
  _populateFromRecord (source) {
    this.useUpdateOpBuilder()
    this.attrs = this.attrs || this._defaultAttrs
    this.attrs.requestId = '0'
    this.attrs.firstName = source.firstName
    this.attrs.lastName = source.lastName
    this.attrs.dateOfBirth = source.dateOfBirth
    this.attrs.age = source.age
    this.attrs.idDocType = source.idDocType
    this.attrs.idDocFace = source.idDocFace
    this.attrs.idDocBack = source.idDocBack
    this.attrs.proofOfInvestor = source.proofOfInvestor
    this.attrs.selfie = source.selfie
    this.attrs.avatar = source.avatar

    this.attrs.address = this.attrs.address || {}
    this.attrs.address.line1 = source.address.line1
    this.attrs.address.line2 = source.address.line2
    this.attrs.address.city = source.address.city
    this.attrs.address.state = source.address.state
    this.attrs.address.postalCode = source.address.postalCode
    this.attrs.address.country = source.address.country
    //  console.dir(this.attrs)
  }

  /** @param {KycRequestRecord|KycRecoveryRequestRecord} source */
  _populateFromRequest (source) {
    if (source.isGeneralKycRecord) {
      this._populateFromRecord(source.kyc)
    }

    this.attrs = this.attrs || this._defaultAttrs
    this.attrs.requestId = source.updatableId
  }

  /** @param {KycRecoveryRequestRecord} source */
  _populateFromRecoveryRequest (source) {
    this._populateFromRequest(source)
    this.useRecoveryOpBuilder()
  }

  async _buildOpUpdate () {
    const blob = await this._createBlob()
    const roleToSet = this._getAccountRoleToSet()

    const opts = {
      requestID: reqId(this.attrs.requestId),
      destinationAccount: getCurrentAccId(),
      accountRoleToSet: str(roleToSet),
      creatorDetails: { blob_id: blob.id },
    }

    return base.CreateChangeRoleRequestBuilder.createChangeRoleRequest(opts)
  }

  async _buildOpRecovery () {
    const blob = await this._createBlob()
    const requestId = this.attrs.requestId
    return buildKycRecoveryOp({ requestId, blobId: blob.id })
  }

  async _createBlob () {
    const attrs = this.attrs
    const address = attrs.address || {}

    const blobValue = JSON.stringify({
      first_name: str(attrs.firstName),
      last_name: str(attrs.lastName),
      date_of_birth: toRFC3339(attrs.dateOfBirth),
      age: str(attrs.age),
      address: {
        line_1: str(address.line1),
        line_2: str(address.line2),
        city: str(address.city),
        country: str(address.country),
        state: str(address.state),
        postal_code: str(address.postalCode),
      },
      documents: {
        kyc_id_document: {
          type: str(attrs.idDocType),
          face: doc(attrs.idDocFace),
          back: doc(attrs.idDocBack),
        },
        kyc_proof_investor: doc(attrs.proofOfInvestor),
        kyc_selfie: doc(attrs.selfie),
        kyc_avatar: doc(attrs.avatar),
      },
    })
    const blob = await createPrivateBlob(BLOB_TYPES.kycGeneral, blobValue)
    return new BlobRecord(blob)
  }

  _getAccountRoleToSet () {
    const isUsResident = isUSResidence(get, this.attrs, 'address.country')
    const isAccredited = Boolean(this.attrs.proofOfInvestor)
    switch (true) {
      case isUsResident && isAccredited:
        return keyValues.usAccreditedRoleId
      case isUsResident && !isAccredited:
        return keyValues.usVerifiedRoleId
      default:
        return keyValues.generalRoleId
    }
  }
}
