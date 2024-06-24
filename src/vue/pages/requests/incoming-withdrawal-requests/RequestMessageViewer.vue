<template>
  <div class="request-message-viewer">
    <div
      v-if="request.isApproved"
      class="request-message-viewer--approved"
    >
      <p class="request-message-viewer__content">
        {{ 'request-messages.approved-incoming-msg' | globalize }}
      </p>
    </div>

    <div
      v-else-if="request.isPending"
      class="request-message-viewer--pending"
    >
      <p class="request-message-viewer__content">
        {{ 'request-messages.pending-incoming-msg' | globalize }}
      </p>
    </div>

    <div
      v-else-if="request.isRejected"
      class="request-message-viewer--rejected"
    >
      <p class="request-message-viewer__content">
        {{
          'request-messages.rejected-incoming-msg' | globalize({
            reason: request.rejectReason
          })
        }}
      </p>
    </div>

    <div
      v-else-if="request.isCanceled"
      class="request-message-viewer--canceled"
    >
      <p class="request-message-viewer__content">
        {{ 'request-messages.canceled-incoming-msg' | globalize }}
      </p>
    </div>

    <div
      v-else-if="request.isPermanentlyRejected"
      class="request-message-viewer--permanently-rejected"
    >
      <p class="request-message-viewer__content">
        {{
          'request-messages.permanently-rejected-incoming-msg' | globalize({
            reason: request.rejectReason
          })
        }}
      </p>
    </div>
  </div>
</template>

<script>
import { IncomingWithdrawalRequest } from '@/js/records/requests/incoming-withdrawal-request.record'

export default {
  name: 'request-message-viewer',
  props: {
    request: { type: IncomingWithdrawalRequest, required: true },
  },
}
</script>

<style lang="scss" scoped>
@import '~@scss/variables';

.request-message-viewer {
  min-height: 6.4rem;

  &--approved { background-color: $col-request-approved; }
  &--pending { background-color: $col-request-pending; }

  &--rejected,
  &--canceled,
  &--permanently-rejected {
    background-color: $col-request-rejected;
  }
}

.request-message-viewer__content {
  padding: 2.4rem;
  font-size: 1.3rem;
  font-weight: 400;
  color: $col-message-box-text;
}
</style>
