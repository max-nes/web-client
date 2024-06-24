<template>
  <span
    v-if="request.isApproved"
    class="request-state request-state--approved"
    :title="'request-states.approved-state' | globalize"
  >
    {{ 'request-states.approved-state' | globalize }}
  </span>

  <span
    v-else-if="request.isPending"
    class="request-state request-state--pending"
    :title="'request-states.pending-state' | globalize"
  >
    {{ 'request-states.pending-state' | globalize }}
  </span>

  <span
    v-else-if="request.isRejected"
    class="request-state request-state--rejected"
    :title="'request-states.rejected-state' | globalize"
  >
    {{ 'request-states.rejected-state' | globalize }}
  </span>

  <span
    v-else-if="request.isCanceled"
    class="request-state request-state--canceled"
    :title="'request-states.canceled-state' | globalize"
  >
    {{ 'request-states.canceled-state' | globalize }}
  </span>

  <span
    v-else-if="request.isPermanentlyRejected"
    class="request-state request-state--permanently-rejected"
    :title="'request-states.permanently-rejected-state' | globalize"
  >
    {{ 'request-states.permanently-rejected-state' | globalize }}
  </span>
</template>

<script>
import { RequestRecord } from '@/js/records/request-record'

export default {
  name: 'request-state-viewer',

  props: {
    request: {
      type: RequestRecord,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@scss/variables';

.request-state {
  padding-left: 1.5rem;
  position: relative;

  &:after,
  &:before {
    content: '';
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    top: 0.7rem;
    transform: translateY(-50%);
    left: 0;
    border-radius: 100%;
  }

  &--approved:before {
    background-color: $col-success;
  }

  &--pending:before {
    background-color: $col-warning;
  }

  &--rejected:before,
  &--canceled:before,
  &--permanently-rejected:before {
    background-color: $col-error;
  }
}
</style>
