<template>
  <tbody>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.amount-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        {{ amount | formatMoney }}
      </td>
    </tr>

    <template v-if="totalFee.value > 0">
      <tr class="attributes-viewer__table-row">
        <td class="attributes-viewer__table-cell">
          {{ 'movements-history.fixed-fee-lbl' | globalize }}
        </td>
        <td class="attributes-viewer__table-cell">
          {{ fixedFee | formatMoney }}
        </td>
      </tr>
      <tr class="attributes-viewer__table-row">
        <td class="attributes-viewer__table-cell">
          {{ 'movements-history.calculated-percent-fee-lbl' | globalize }}
        </td>
        <td class="attributes-viewer__table-cell">
          {{ calculatedPercentFee | formatMoney }}
        </td>
      </tr>
      <tr class="attributes-viewer__table-row">
        <td class="attributes-viewer__table-cell">
          {{ 'movements-history.total-fee-lbl' | globalize }}
        </td>
        <td class="attributes-viewer__table-cell">
          {{ totalFee | formatMoney }}
        </td>
      </tr>
    </template>
  </tbody>
</template>

<script>
import { ParticularBalanceChangeEffect } from '@/js/records/entities/effect.record'

import { MathUtil } from '@/js/utils'

export default {
  props: {
    effect: {
      type: ParticularBalanceChangeEffect,
      required: true,
    },
    isOutgoing: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    amount () {
      const currency = this.effect.assetCode
      let value = this.effect.amount

      if (this.isOutgoing) {
        value = -value
      }

      return { currency, value }
    },
    fixedFee () {
      return {
        currency: this.effect.assetCode,
        value: this.effect.fixedFee,
      }
    },
    calculatedPercentFee () {
      return {
        currency: this.effect.assetCode,
        value: this.effect.calculatedPercentFee,
      }
    },
    totalFee () {
      return {
        currency: this.effect.assetCode,
        value: MathUtil.add(
          this.effect.fixedFee,
          this.effect.calculatedPercentFee
        ),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../attributes-viewer';
</style>
