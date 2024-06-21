/**
 * Create AML alert request - moves balance sales to the locked state until the
 * request is either approved or rejected.
 */
export class CreateAMLAlertRequestOp {
  constructor (record) {
    this.creatorDetails = record.creatorDetails
  }
}
