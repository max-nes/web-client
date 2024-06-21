/**
 * Payment is an operation that charges costs from one account and sales with
 * them another account
 */
export class PaymentOp {
  constructor (record) {
    this.sourceFixedFee = record.sourceFee.fixed
    this.sourceCalculatedPercentFee = record.sourceFee.calculatedPercent
    this.destinationFixedFee = record.destinationFee.fixed
    this.destinationCalculatedPercentFee = record.destinationFee
      .calculatedPercent
    this.sourcePayForDestination = record.sourcePayForDestination
    this.subject = record.subject
    this.reference = record.reference

    this.fromAccountId = record.accountFrom.id
    this.toAccountId = record.accountTo.id
    this.fromBalanceId = record.balanceFrom.id
    this.toBalanceId = record.balanceTo.id
    this.assetCode = record.asset.id
  }

  isIncoming (accountId) {
    return this.toAccountId === accountId
  }
}
