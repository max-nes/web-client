/**
 * Create issuance request operation usually not trigger any movements, except
 * of the case when it is auto-approved.
 */
export class CreateIssuanceRequestOp {
  constructor (record) {
    this.reference = record.reference
  }
}
