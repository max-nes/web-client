import { CreateAMLAlertRequestOp } from '../operation-details/create-aml-alert-request'
import { CreateWithdrawRequestOp } from '../operation-details/create-withdrawal-request'
import { CreateIssuanceRequestOp } from '../operation-details/create-issuance-request'
import { CheckSaleStateOp } from '../operation-details/check-sale-state'
import { ReviewRequestOp } from '../operation-details/review-request'
import { ManageAssetPairOp } from '../operation-details/manage-asset-pair'

import { ManageOfferOp } from '../operation-details/manage-offer'
import { PaymentOp } from '../operation-details/payment'

import {
  FundedEffect,
  IssuedEffect,
  LockedEffect,
  ChargedEffect,
  MatchedEffect,
  UnlockedEffect,
  WithdrawnEffect,
  ChargedFromLockedEffect,
} from './effect.record'

const OPERATION_DETAILS_TYPES = Object.freeze({
  payment: 'operations-payment',
  paymentV2: 'operations-payment-v2',
  manageOffer: 'operations-manage-offer',
  reviewRequest: 'operations-review-request',
  checkSaleState: 'operations-check-sale-state',
  createAmlAlert: 'operations-create-aml-alert',
  manageAssetPair: 'operations-manage-asset-pair',
  createIssuanceRequest: 'operations-create-issuance-request',
  createWithdrawalRequest: 'operations-create-withdrawal-request',
})

const EFFECT_TYPES = Object.freeze({
  funded: 'effects-funded',
  issued: 'effects-issued',
  locked: 'effects-locked',
  charged: 'effects-charged',
  matched: 'effects-matched',
  unlocked: 'effects-unlocked',
  withdrawn: 'effects-withdrawn',
  chargedFromLocked: 'effects-charged-from-locked',
})

/**
 * Participant effect is the basic history entry that represent any change to
 * ledger that effected on some account.
 *
 * Inside this module the we're interested only in entries that
 * make an effect on a specific balance, so we can assume that participant
 * effect represents any movements on our user balances. So that's why we'll
 * call it movement.
 *
 * Such entry has 2 important relations:
 *  effect - the entity that defines the exact action happened with balance
 *  operation - the cause of balance movement
 */
export class Movement {
  constructor (record) {
    this.id = record.id
    this.balanceId = record.balance.id
    this.assetCode = record.asset.id

    if (record.operation) {
      this.appliedAt = record.operation.appliedAt
      this.operationDetails = Movement.parseOperationDetails(record.operation)
    }

    if (record.effect) {
      this._effect = Movement.parseEffect(record.effect)
    }
  }

  get effect () {
    if (this._effect instanceof MatchedEffect) {
      if (this.isIncoming) {
        return this._effect.funded
      }

      if (this.isOutgoing) {
        return this._effect.charged
      }

      throw new Error('Unexpected effect')
    }

    return this._effect
  }

  get isIncoming () {
    return (
      this._effect instanceof FundedEffect ||
      this._effect instanceof IssuedEffect ||
      (
        this._effect instanceof MatchedEffect &&
        this._effect.funded.assetCode === this.assetCode
      )
    )
  }

  get isOutgoing () {
    return (
      this._effect instanceof ChargedEffect ||
      this._effect instanceof WithdrawnEffect ||
      this._effect instanceof ChargedFromLockedEffect ||
      (
        this._effect instanceof MatchedEffect &&
        this._effect.charged.assetCode === this.assetCode
      )
    )
  }

  get isLocked () {
    return this._effect instanceof LockedEffect
  }

  get isUnlocked () {
    return this._effect instanceof UnlockedEffect
  }

  static parseOperationDetails (operation) {
    const details = operation.details
    switch (details.type) {
      case OPERATION_DETAILS_TYPES.payment:
        return new PaymentOp(details)
      case OPERATION_DETAILS_TYPES.paymentV2:
        return new PaymentOp(details)
      case OPERATION_DETAILS_TYPES.manageOffer:
        return new ManageOfferOp(details)
      case OPERATION_DETAILS_TYPES.reviewRequest:
        return new ReviewRequestOp(details)
      case OPERATION_DETAILS_TYPES.checkSaleState:
        return new CheckSaleStateOp(details)
      case OPERATION_DETAILS_TYPES.manageAssetPair:
        return new ManageAssetPairOp(details)
      case OPERATION_DETAILS_TYPES.createAmlAlert:
        return new CreateAMLAlertRequestOp(details)
      case OPERATION_DETAILS_TYPES.createIssuanceRequest:
        return new CreateIssuanceRequestOp(details)
      case OPERATION_DETAILS_TYPES.createWithdrawalRequest:
        return new CreateWithdrawRequestOp(details)
      default:
        return {}
    }
  }

  static parseEffect (effect) {
    switch (effect.type) {
      case EFFECT_TYPES.funded:
        return new FundedEffect(effect)
      case EFFECT_TYPES.issued:
        return new IssuedEffect(effect)
      case EFFECT_TYPES.locked:
        return new LockedEffect(effect)
      case EFFECT_TYPES.charged:
        return new ChargedEffect(effect)
      case EFFECT_TYPES.matched:
        return new MatchedEffect(effect)
      case EFFECT_TYPES.unlocked:
        return new UnlockedEffect(effect)
      case EFFECT_TYPES.withdrawn:
        return new WithdrawnEffect(effect)
      case EFFECT_TYPES.chargedFromLocked:
        return new ChargedFromLockedEffect(effect)
      default:
        return {}
    }
  }
}
