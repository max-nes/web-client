<template>
  <div class="request-viewer">
    <template v-if="isLoaded">
      <asset-summary-viewer
        :asset-code="baseAsset.code"
        :asset-name="baseAsset.name"
        :asset-logo-url="assetLogoUrl"
      />

      <request-message-viewer
        class="request-viewer__state-message"
        :request="request"
      />

      <request-attributes-viewer
        class="request-viewer__table"
        :request="request"
      />

      <request-actions
        class="request-viewer__actions"
        :request="request"
        @update-click="$emit(EVENTS.updateClick)"
        @cancel="$emit(EVENTS.cancel)"
      />
    </template>

    <p v-else-if="isLoadingFailed">
      {{ 'create-sale-requests.loading-error-msg' | globalize }}
    </p>

    <load-spinner
      v-else
      message-id="create-sale-requests.loading-msg" />
  </div>
</template>

<script>
import LoadSpinner from '@/vue/common/Loader'

import AssetSummaryViewer from '@/vue/pages/requests/shared/AssetSummaryViewer'
import RequestMessageViewer from '@/vue/pages/requests/shared/RequestMessageViewer'
import RequestAttributesViewer from './RequestAttributesViewer'
import RequestActions from './RequestActions'

import { CreateSaleRequest } from '@/js/records/requests/create-sale-request.record'

import { documentsManager } from '@/api'

import { mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'

const EVENTS = {
  updateClick: 'update-click',
  cancel: 'cancel',
}

export default {
  name: 'request-viewer',
  components: {
    LoadSpinner,
    AssetSummaryViewer,
    RequestMessageViewer,
    RequestAttributesViewer,
    RequestActions,
  },

  props: {
    request: { type: CreateSaleRequest, required: true },
  },

  data: _ => ({
    baseAsset: null,
    isLoaded: false,
    isLoadingFailed: false,
    EVENTS,
  }),

  computed: {
    ...mapGetters([
      vuexTypes.accountBalanceByCode,
    ]),
    assetLogoUrl () {
      if (this.baseAsset) {
        return documentsManager.getDocumentUrlByKey(this.baseAsset.logoKey)
      } else {
        return ''
      }
    },
  },

  async created () {
    await this.loadBaseAsset()
  },

  methods: {
    async loadBaseAsset () {
      this.isLoaded = false
      try {
        this.baseAsset = this.accountBalanceByCode(this.request.baseAsset).asset
        this.isLoaded = true
      } catch (e) {
        this.isLoadingFailed = true
        ErrorHandler.processWithoutFeedback(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.request-viewer__state-message {
  margin-top: 2rem;
}

.request-viewer__table {
  margin-top: 2rem;
}

.request-viewer__actions {
  margin-top: 4.9rem;
}
</style>
