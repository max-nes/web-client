<template>
  <div class="request-viewer">
    <asset-summary-viewer
      :asset-code="requestAsset.code"
      :asset-name="requestAsset.name"
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
      @request-updated="$emit(EVENTS.requestUpdated)"
    />
  </div>
</template>

<script>
import AssetSummaryViewer from '@/vue/pages/requests/shared/AssetSummaryViewer'

import RequestMessageViewer from './RequestMessageViewer'
import RequestAttributesViewer from './RequestAttributesViewer'
import RequestActions from './RequestActions'

import { IncomingWithdrawalRequest } from '@/js/records/requests/incoming-withdrawal-request.record'

import { documentsManager } from '@/api'

import { mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'

const EVENTS = {
  requestUpdated: 'request-updated',
}

export default {
  name: 'request-viewer',
  components: {
    AssetSummaryViewer,
    RequestMessageViewer,
    RequestAttributesViewer,
    RequestActions,
  },

  props: {
    request: { type: IncomingWithdrawalRequest, required: true },
  },

  data: _ => ({
    EVENTS,
  }),

  computed: {
    ...mapGetters({
      assetByCode: vuexTypes.assetByCode,
    }),
    requestAsset () {
      return this.assetByCode(this.request.assetCode)
    },

    assetLogoUrl () {
      if (this.requestAsset) {
        return documentsManager.getDocumentUrlByKey(this.requestAsset.logoKey)
      } else {
        return ''
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
