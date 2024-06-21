<template>
  <tbody>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.reference-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        {{ operationDetails.reference }}
      </td>
    </tr>
  </tbody>
</template>

<script>
import { CreateIssuanceRequestOp } from '@/js/records/operation-details/create-issuance-request'

export default {
  props: {
    operationDetails: {
      type: CreateIssuanceRequestOp,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../attributes-viewer';
</style>
