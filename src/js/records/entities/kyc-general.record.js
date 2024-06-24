import { KycRecord } from './kyc.record'
import { Document } from '@tokend/js-sdk'

export class KycGeneralRecord extends KycRecord {
  constructor (blob) {
    super(blob)
    const kyc = this._blob.valueAsObject
    const kycAddr = kyc.address || {}
    const kycDocs = kyc.documents || {}
    const kycIdDoc = kycDocs.kyc_id_document || {}

    this.firstName = kyc.first_name
    this.lastName = kyc.last_name
    this.dateOfBirth = kyc.date_of_birth
    this.age = kyc.age
    this.address = {
      line1: kycAddr.line_1,
      line2: kycAddr.line_2,
      city: kycAddr.city,
      country: kycAddr.country,
      state: kycAddr.state,
      postalCode: kycAddr.postal_code,
    }
    this.idDocType = kycIdDoc.type
    this.idDocFace = new Document(kycIdDoc.face)
    this.idDocBack = new Document(kycIdDoc.back)
    this.avatar = new Document(kycDocs.kyc_avatar)
    this.proofOfInvestor = new Document(kycDocs.kyc_proof_investor)
    this.selfie = new Document(kycDocs.kyc_selfie)
    //  console.log(blob)
  }
}
