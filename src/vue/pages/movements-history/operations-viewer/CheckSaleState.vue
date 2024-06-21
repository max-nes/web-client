<template>
  <tbody>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.sale-id-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        {{ operationDetails.saleId }}
      </td>
    </tr>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.sale-state-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        <template v-if="operationDetails.isSaleClosed">
          {{ 'movements-history.sale-closed-msg' | globalize }}
        </template>
        <template v-else-if="operationDetails.isSaleCanceled">
          {{ 'movements-history.sale-canceled-msg' | globalize }}
        </template>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { CheckSaleStateOp } from '@/js/records/operation-details/check-sale-state'

export default {
  name: 'check-sale-state',
  props: {
    operationDetails: {
      type: CheckSaleStateOp,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../attributes-viewer';
</style>
