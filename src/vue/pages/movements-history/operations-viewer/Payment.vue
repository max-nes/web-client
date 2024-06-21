<template>
  <tbody>
    <template v-if="totalFee.value > 0">
      <tr class="attributes-viewer__table-row">
        <td class="attributes-viewer__table-cell">
          {{ 'movements-history.source-fixed-fee-lbl' | globalize }}
        </td>
        <td class="attributes-viewer__table-cell">
          {{ sourceFixedFee | formatMoney }}
        </td>
      </tr>
      <tr class="attributes-viewer__table-row">
        <td class="attributes-viewer__table-cell">
          <!-- eslint-disable-next-line max-len -->
          {{ 'movements-history.source-calculated-percent-fee-lbl' | globalize }}
        </td>
        <td class="attributes-viewer__table-cell">
          {{ sourceCalculatedPercentFee | formatMoney }}
        </td>
      </tr>
      <tr class="attributes-viewer__table-row">
        <td class="attributes-viewer__table-cell">
          {{ 'movements-history.destination-fixed-fee-lbl' | globalize }}
        </td>
        <td class="attributes-viewer__table-cell">
          {{ destinationFixedFee | formatMoney }}
        </td>
      </tr>
      <tr class="attributes-viewer__table-row">
        <td class="attributes-viewer__table-cell">
          <!-- eslint-disable-next-line max-len -->
          {{ 'movements-history.destination-calculated-percent-fee-lbl' | globalize }}
        </td>
        <td class="attributes-viewer__table-cell">
          {{ destinationCalculatedPercentFee | formatMoney }}
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

    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.source-pays-for-destination-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        {{ operationDetails.sourcePayForDestination }}
      </td>
    </tr>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.subject-lbl' | globalize }}
      </td>
      <td
        class="attributes-viewer__table-cell
          attributes-viewer__subject">
        {{ operationDetails.subject }}
      </td>
    </tr>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.payment-sender-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        <email-getter :account-id="operationDetails.fromAccountId" />
      </td>
    </tr>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.payment-recipient-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        <email-getter :account-id="operationDetails.toAccountId" />
      </td>
    </tr>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.payment-sender-id-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        {{ operationDetails.fromAccountId }}
      </td>
    </tr>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.payment-recipient-id-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        {{ operationDetails.toAccountId }}
      </td>
    </tr>
  </tbody>
</template>

<script>
import EmailGetter from '@/vue/common/EmailGetter'

import { PaymentOp } from '@/js/records/operation-details/payment'

import { MathUtil } from '@/js/utils'

export default {
  components: {
    EmailGetter,
  },
  props: {
    operationDetails: {
      type: PaymentOp,
      required: true,
    },
  },
  computed: {
    sourceFixedFee () {
      return {
        currency: this.operationDetails.assetCode,
        value: this.operationDetails.sourceFixedFee,
      }
    },
    sourceCalculatedPercentFee () {
      return {
        currency: this.operationDetails.assetCode,
        value: this.operationDetails.sourceCalculatedPercentFee,
      }
    },
    destinationFixedFee () {
      return {
        currency: this.operationDetails.assetCode,
        value: this.operationDetails.destinationFixedFee,
      }
    },
    destinationCalculatedPercentFee () {
      return {
        currency: this.operationDetails.assetCode,
        value: this.operationDetails.destinationCalculatedPercentFee,
      }
    },
    totalFee () {
      const sourceFee = MathUtil.add(
        this.operationDetails.sourceFixedFee,
        this.operationDetails.sourceCalculatedPercentFee,
      )
      const destinationFee = MathUtil.add(
        this.operationDetails.destinationFixedFee,
        this.operationDetails.destinationCalculatedPercentFee
      )

      return {
        currency: this.operationDetails.assetCode,
        value: MathUtil.add(sourceFee, destinationFee),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '../attributes-viewer';

  .attributes-viewer__subject {
    word-break: break-word;
    white-space: normal;
  }
</style>
