import { MathUtil } from '@/js/utils'

const SECONDARY_MARKET_ORDER_BOOK_ID = 0

/**
 * Manage offer is an operation that locks sales once account places an offer
 * and once when the offer is matched
 */
export class ManageOfferOp {
  constructor (record) {
    this.orderBookId = record.orderBookId
    this.baseAmount = record.baseAmount
    this.isDeleted = record.isDeleted
    this.offerId = record.offerId
    this.price = record.price
    this.isBuy = record.isBuy

    this.baseAssetCode = record.baseAsset.id
    this.quoteAssetCode = record.quoteAsset.id
  }

  get isSecondaryMarket () {
    return this.orderBookId === SECONDARY_MARKET_ORDER_BOOK_ID
  }

  get quoteAmount () {
    return MathUtil.multiply(this.baseAmount, this.price)
  }
}
