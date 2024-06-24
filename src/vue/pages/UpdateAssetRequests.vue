<template>
  <div class="update-asset-requests">
    <template>
      <drawer :is-shown.sync="isDrawerShown">
        <template v-if="isAssetFormShown">
          <template slot="heading">
            {{ 'update-asset-requests.update-asset-title' | globalize }}
          </template>
          <asset-form
            :former="former"
            @submitted="onRequestUpdate()"
          />
        </template>

        <template v-else>
          <template slot="heading">
            {{ 'update-asset-requests.details-title' | globalize }}
          </template>
          <request-viewer
            :request="selectedRequest"
            @update-click="showUpdateForm"
            @cancel="onRequestUpdate()"
          />
        </template>
      </drawer>

      <requests-table
        :requests="requests"
        :is-loaded="isLoaded"
        @select="showRequestDetails"
      />
    </template>

    <p v-if="isLoadingFailed">
      {{ 'update-asset-requests.loading-error-msg' | globalize }}
    </p>

    <collection-loader
      class="update-asset-requests__loader"
      v-show="requests.length && isLoaded"
      :first-page-loader="firstPageLoader"
      @first-page-load="setRequests"
      @next-page-load="concatRequests"
    />
  </div>
</template>

<script>
import Drawer from '@/vue/common/Drawer'
import CollectionLoader from '@/vue/common/CollectionLoader'

import RequestViewer from '@/vue/pages/requests/update-asset-requests/RequestViewer'
import RequestsTable from '@/vue/pages/requests/update-asset-requests/RequestsTable'

import AssetForm from '@/vue/forms/AssetForm'

import { mapActions, mapMutations, mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'
import UpdateList from '@/vue/mixins/update-list.mixin'
import { AssetFormer } from '@/js/formers/AssetFormer'

export default {
  name: 'update-asset-requests',
  components: {
    Drawer,
    CollectionLoader,
    RequestsTable,
    RequestViewer,
    AssetForm,
  },

  mixins: [UpdateList],

  data: _ => ({
    isLoaded: false,
    isLoadingFailed: false,
    isDrawerShown: false,
    isAssetFormShown: false,
    selectedRequest: {},
    former: new AssetFormer(),
    firstPageLoader: () => {},
  }),

  computed: {
    ...mapGetters({
      requests: vuexTypes.updateAssetRequests,
    }),
  },

  created () {
    this.initFirstPageLoader()
    this.listenUpdateList('updateAssetRequests:updateList', this.initFirstPageLoader)
  },

  beforeDestroy () {
    this.resetUpdateListEvent('updateAssetRequests:updateList')
  },

  methods: {
    ...mapMutations({
      setRequests: vuexTypes.SET_UPDATE_ASSET_REQUESTS,
      concatRequests: vuexTypes.CONCAT_UPDATE_ASSET_REQUESTS,
    }),

    ...mapActions({
      loadUpdateAssetRequests: vuexTypes.LOAD_UPDATE_ASSET_REQUESTS,
    }),

    async loadRequests () {
      this.isLoaded = false
      try {
        const response = await this.loadUpdateAssetRequests()
        this.isLoaded = true
        return response
      } catch (e) {
        this.isLoadingFailed = true
        ErrorHandler.processWithoutFeedback(e)
      }
    },

    initFirstPageLoader () {
      this.firstPageLoader = _ => this.loadRequests()
    },

    showRequestDetails (request) {
      this.isAssetFormShown = false
      this.selectedRequest = request
      this.isDrawerShown = true
    },

    showUpdateForm () {
      this.former = new AssetFormer(this.selectedRequest)
      this.isAssetFormShown = true
    },

    onRequestUpdate () {
      this.isDrawerShown = false
      this.emitUpdateList('updateAssetRequests:updateList')
    },
  },
}
</script>

<style lang="scss" scoped>
.update-asset-requests__loader {
  margin-top: 1rem;
}
</style>
