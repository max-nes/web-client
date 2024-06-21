<template>
  <tbody>
    <tr
      class="attributes-viewer__table-row"
      v-if="operationDetails.offerId">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.offer-id-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        {{ operationDetails.offerId }}
      </td>
    </tr>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.offer-direction-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        <template v-if="operationDetails.isBuy">
          {{
            'movements-history.offer-buy-asset-msg' | globalize({
              asset: operationDetails.baseAssetCode,
            })
          }}
        </template>
        <template v-else>
          {{
            'movements-history.offer-sell-asset-msg' | globalize({
              asset: operationDetails.baseAssetCode,
            })
          }}
        </template>
      </td>
    </tr>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.order-book-id-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        <template v-if="operationDetails.isSecondaryMarket">
          {{ 'movements-history.secondary-market-msg' | globalize }}
        </template>
        <template v-else>
          {{ operationDetails.orderBookId }}
        </template>
      </td>
    </tr>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.base-amount-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        {{ baseAmount | formatMoney }}
      </td>
    </tr>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.quote-amount-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        {{ quoteAmount | formatMoney }}
      </td>
    </tr>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.price-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        {{ price | formatMoney }}
      </td>
    </tr>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.offer-state-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        <template v-if="operationDetails.isDeleted">
          {{ 'movements-history.offer-deleted-msg' | globalize }}
        </template>
        <template v-else>
          {{ 'movements-history.offer-still-placed-msg' | globalize }}
        </template>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { ManageOfferOp } from '@/js/records/operation-details/manage-offer'

export default {
  props: {
    operationDetails: {
      type: ManageOfferOp,
      required: true,
    },
  },
  computed: {
    quoteAmount () {
      return {
        currency: this.operationDetails.quoteAssetCode,
        value: this.operationDetails.quoteAmount,
      }
    },
    baseAmount () {
      return {
        currency: this.operationDetails.baseAssetCode,
        value: this.operationDetails.baseAmount,
      }
    },
    price () {
      return {
        currency: this.operationDetails.quoteAssetCode,
        value: this.operationDetails.price,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../attributes-viewer';
</style>
