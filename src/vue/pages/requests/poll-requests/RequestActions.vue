<template>
  <div class="request-actions">
    <button
      v-ripple
      v-if="!formMixin.isConfirmationShown"
      class="
        request-actions__btn
        request-actions__btn--cancel
        app__button-flat
      "
      :disabled="isRequestCanceling || !canBeCanceled"
      @click="showConfirmation"
    >
      {{ 'poll-requests.cancel-btn' | globalize }}
    </button>

    <form-confirmation
      v-if="formMixin.isConfirmationShown"
      message-id="poll-requests.cancellation-msg"
      ok-button-text-id="poll-requests.yes-msg"
      cancel-button-text-id="poll-requests.no-msg"
      @ok="cancelRequest"
      @cancel="hideConfirmation"
    />
  </div>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'

import { PollRequest } from '@/js/records/requests/poll-request.record'

import { mapActions } from 'vuex'
import { vuexTypes } from '@/vuex'

import { Bus } from '@/js/helpers/event-bus'
import { ErrorHandler } from '@/js/helpers/error-handler'

const EVENTS = {
  cancel: 'cancel',
}

export default {
  name: 'request-actions',
  mixins: [FormMixin],

  props: {
    request: { type: PollRequest, required: true },
  },

  data: _ => ({
    isRequestCanceling: false,
    EVENTS,
  }),

  computed: {
    canBeCanceled () {
      return this.request.isPending
    },
  },

  methods: {
    ...mapActions({
      cancelPollRequest: vuexTypes.CANCEL_POLL_REQUEST,
    }),

    async cancelRequest () {
      this.hideConfirmation()
      this.isRequestCanceling = true

      try {
        await this.cancelPollRequest(this.request.id)
        Bus.success('poll-requests.request-canceled-msg')
        this.$emit(EVENTS.cancel)
      } catch (e) {
        this.isRequestCanceling = false
        ErrorHandler.process(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.request-actions {
  display: flex;
  justify-content: flex-end;
}

.request-actions__btn {
  & + & {
    margin-left: auto;
  }
}

.request-actions__btn--update {
  margin-bottom: 2rem;
  width: 18rem;
}

.request-actions__btn--cancel {
  margin-bottom: 2rem;
  font-weight: 400;
}
</style>
