<template>
  <div class="request-actions">
    <button
      v-ripple
      v-if="!formMixin.isConfirmationShown"
      class="request-actions__update-btn app__button-raised"
      :disabled="isRequestCanceling || !canBeUpdated"
      @click="$emit(EVENTS.updateClick)"
    >
      {{ 'update-asset-requests.update-btn' | globalize }}
    </button>

    <button
      v-ripple
      v-if="!formMixin.isConfirmationShown"
      class="request-actions__cancel-btn app__button-flat"
      :disabled="isRequestCanceling || !canBeCanceled"
      @click="showConfirmation"
    >
      {{ 'update-asset-requests.cancel-btn' | globalize }}
    </button>

    <form-confirmation
      v-if="formMixin.isConfirmationShown"
      message-id="update-asset-requests.cancellation-msg"
      ok-button-text-id="update-asset-requests.yes-msg"
      cancel-button-text-id="update-asset-requests.no-msg"
      @ok="cancelRequest"
      @cancel="hideConfirmation"
    />
  </div>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'
import { AssetRequest } from '@/js/records/requests/asset-request.record'
import { mapActions } from 'vuex'
import { vuexTypes } from '@/vuex'
import { Bus } from '@/js/helpers/event-bus'
import { ErrorHandler } from '@/js/helpers/error-handler'
const EVENTS = {
  updateClick: 'update-click',
  cancel: 'cancel',
}
export default {
  name: 'request-actions',
  mixins: [FormMixin],
  props: {
    request: { type: AssetRequest, required: true },
  },
  data: _ => ({
    isRequestCanceling: false,
    EVENTS,
  }),
  computed: {
    canBeUpdated () {
      return this.request.isRejected || this.request.isPending
    },
    canBeCanceled () {
      return this.request.isPending
    },
  },
  methods: {
    ...mapActions({
      cancelUpdateAssetRequest: vuexTypes.CANCEL_UPDATE_ASSET_REQUEST,
    }),
    async cancelRequest () {
      this.hideConfirmation()
      this.isRequestCanceling = true
      try {
        await this.cancelUpdateAssetRequest(this.request.id)
        Bus.success('update-asset-requests.request-canceled-msg')
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
}

.request-actions button + button {
  margin-left: auto;
}

.request-actions__update-btn {
  margin-bottom: 2rem;
  width: 18rem;
}

.request-actions__cancel-btn {
  margin-bottom: 2rem;
  font-weight: 400;
}
</style>
