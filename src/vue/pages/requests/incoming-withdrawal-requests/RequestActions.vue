<template>
  <div class="request-actions">
    <reject-request-form
      v-if="isRejectFormShown"
      class="request-actions__reject-form"
      :request="request"
      @close="isRejectFormShown = false"
      @request-rejected="$emit(EVENTS.requestUpdated)"
    />

    <div
      v-else
      class="request-actions__buttons">
      <template v-if="formMixin.isConfirmationShown">
        <form-confirmation
          :is-pending="isRequestApproving"
          message-id="incoming-withdrawal-requests.approving-msg"
          ok-button-text-id="incoming-withdrawal-requests.yes-msg"
          cancel-button-text-id="incoming-withdrawal-requests.no-msg"
          @ok="approveRequest"
          @cancel="hideConfirmation"
        />
      </template>

      <template v-else>
        <button
          v-ripple
          class="
            request-actions__button
            request-actions__button--approve
            app__button-raised
          "
          :disabled="!canBeReviewed"
          @click="showConfirmation"
        >
          {{ 'incoming-withdrawal-requests.approve-btn' | globalize }}
        </button>

        <button
          v-ripple
          class="
            request-actions__button
            request-actions__button--reject
            app__button-flat
          "
          :disabled="!canBeReviewed"
          @click="isRejectFormShown = true"
        >
          {{ 'incoming-withdrawal-requests.reject-btn' | globalize }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'
import RejectRequestForm from './RejectRequestForm'

import { IncomingWithdrawalRequest } from '@/js/records/requests/incoming-withdrawal-request.record'

import { mapActions } from 'vuex'
import { vuexTypes } from '@/vuex'

import { Bus } from '@/js/helpers/event-bus'
import { ErrorHandler } from '@/js/helpers/error-handler'

const EVENTS = {
  requestUpdated: 'request-updated',
}

export default {
  name: 'request-actions',
  components: {
    RejectRequestForm,
  },
  mixins: [FormMixin],

  props: {
    request: { type: IncomingWithdrawalRequest, required: true },
  },

  data: _ => ({
    isRejectFormShown: false,
    isRequestApproving: false,
    EVENTS,
  }),

  computed: {
    canBeReviewed () {
      return this.request.isPending
    },
  },

  methods: {
    ...mapActions({
      approveWithdrawalRequest: vuexTypes.APPROVE_INCOMING_WITHDRAWAL_REQUEST,
    }),

    async approveRequest () {
      this.isRequestApproving = true
      try {
        await this.approveWithdrawalRequest(this.request)
        Bus.success('incoming-withdrawal-requests.request-approved-msg')
        this.$emit(EVENTS.requestUpdated)
      } catch (e) {
        this.isRequestApproving = false
        ErrorHandler.process(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.request-actions__buttons {
  display: flex;
}

.request-actions__button {
  & + & {
    margin-left: auto;
  }

  &--approve {
    max-width: 18rem;
    width: 100%;
  }

  &--reject {
    font-weight: 400;
  }
}

.request-actions__reject-form {
  margin-top: 2rem;
}
</style>
