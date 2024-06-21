import { CHECK_SALE_STATE_EFFECTS } from '@tokend/js-sdk'

/**
 * Check sale state is an operation that constantly checks sales and updates
 * it's state if it decide the sale should be closed or canceled, and, as it's
 * effect account will be both charged and funded on 2 different balances.
 * Also if the account is the creator of the sale, issued effect will also be
 * triggered on his account
 */
export class CheckSaleStateOp {
  constructor (record) {
    this.effectValue = record.effect.value
    this.saleId = record.sale.id
  }

  get isSaleCanceled () {
    return this.effectValue === CHECK_SALE_STATE_EFFECTS.canceled
  }

  get isSaleClosed () {
    return this.effectValue === CHECK_SALE_STATE_EFFECTS.closed
  }
}
