<template>
  <tbody>
    <tr class="attributes-viewer__table-row">
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.request-state-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        <template
          v-if="
            operationDetails.isReject ||
              operationDetails.isPermanentReject
          "
        >
          {{ 'movements-history.request-rejected-msg' | globalize }}
        </template>
        <template
          v-else-if="
            operationDetails.isFulfilled &&
              operationDetails.isApproved
          "
        >
          {{ 'movements-history.request-approved-msg' | globalize }}
        </template>
        <template v-else>
          {{ 'movements-history.request-reviewed-msg' | globalize }}
        </template>
      </td>
    </tr>
    <tr
      v-if="operationDetails.isReject || operationDetails.isPermanentReject"
      class="attributes-viewer__table-row"
    >
      <td class="attributes-viewer__table-cell">
        {{ 'movements-history.reason-lbl' | globalize }}
      </td>
      <td class="attributes-viewer__table-cell">
        {{ operationDetails.reason }}
      </td>
    </tr>
  </tbody>
</template>

<script>
import { ReviewRequestOp } from '@/js/records/operation-details/review-request'

export default {
  props: {
    operationDetails: {
      type: ReviewRequestOp,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '../attributes-viewer';
</style>
