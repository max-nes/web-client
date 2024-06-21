/**
 * @class BalanceChangedEffect
 *
 * Represents effect caused the change to the account balance
 */
export class BalanceChangedEffect {
  constructor (record) {
    this.amount = record.amount
    this.fixedFee = record.fee.fixed
    this.calculatedPercentFee = record.fee.calculatedPercent
  }
}

/**
 * @class FundedEffect
 *
 * Represents effect that is triggered when balance was funded from another
 * balance in system
 */
export class FundedEffect extends BalanceChangedEffect {}

/**
 * @class LockedEffect
 *
 * Represents effect that is triggered when sales on balance were moved from
 * `available` to `locked`
 */
export class LockedEffect extends BalanceChangedEffect {}

/**
 * @class IssuedEffect
 *
 * Represents effect that is triggered when balance become funded by issuing
 * costs that wasn't in circulation before
 */
export class IssuedEffect extends BalanceChangedEffect {}

/**
 * @class ChargedEffect
 *
 * Represents effect that is triggered when sales from balance were charged to
 * another balance in system
 */
export class ChargedEffect extends BalanceChangedEffect {}

/**
 * @class UnlockedEffect
 *
 * Represents effect that is triggered when sales on balance were moved from
 * `locked` to `available`
 */
export class UnlockedEffect extends BalanceChangedEffect {}

/**
 * @class WithdrawnEffect
 *
 * Represents effect that is triggered when sales from balance were charged and
 * destroyed in the system
 */
export class WithdrawnEffect extends BalanceChangedEffect {}

/**
 * @class ChargedFromLockedEffect
 *
 * Represents effect that is triggered when
 */
export class ChargedFromLockedEffect extends BalanceChangedEffect {}

/**
 * @class MatchedEffect
 *
 * Represents effect that is triggered when offer (no matter, secondary market
 * or primary). Has both charged and funded effects
 * inside {@link ParticularBalanceChangeEffect}
 */
export class MatchedEffect {
  constructor (record) {
    this.orderBookId = record.orderBookId
    this.offerId = record.offerId
    this.price = record.price

    if (record.charged) {
      this.charged = new ParticularBalanceChangeEffect(record.charged)
    }

    if (record.funded) {
      this.funded = new ParticularBalanceChangeEffect(record.funded)
    }
  }
}

/**
 * @class ParticularBalanceChangeEffect
 *
 * Represents one of the effects encapsulated in the {@link MatchedEffect} e
 */
export class ParticularBalanceChangeEffect {
  constructor (record) {
    this.amount = record.amount
    this.fixedFee = record.fee.fixed
    this.calculatedPercentFee = record.fee.calculatedPercent
    this.balanceId = record.balanceAddress
    this.assetCode = record.assetCode
  }
}
