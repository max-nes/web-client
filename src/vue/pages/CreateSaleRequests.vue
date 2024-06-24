<template>
  <div class="create-sale-requests">
    <template>
      <drawer :is-shown.sync="isDrawerShown">
        <template v-if="isUpdateMode">
          <template slot="heading">
            {{ 'create-sale-requests.update-sale-title' | globalize }}
          </template>
          <sale-form
            :former="new SaleFormer(selectedRequest)"
            @submitted="isDrawerShown = false"
            @request-updated="emitUpdateList('createSaleRequests:updateList')"
          />
        </template>

        <template v-else>
          <template slot="heading">
            {{ 'create-sale-requests.details-title' | globalize }}
          </template>
          <request-viewer
            :request="selectedRequest"
            @update-click="isUpdateMode = true"
            @cancel="closeDrawerAndUpdateList()"
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
      {{ 'create-sale-requests.loading-error-msg' | globalize }}
    </p>

    <collection-loader
      class="create-sale-requests__loader"
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

import RequestsTable from './requests/create-sale-requests/RequestsTable'
import RequestViewer from './requests/create-sale-requests/RequestViewer'

import SaleForm from '@/vue/forms/SaleForm'
import { SaleFormer } from '@/js/formers/SaleFormer'

import { mapGetters, mapMutations, mapActions } from 'vuex'
import { vuexTypes } from '@/vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'
import UpdateList from '@/vue/mixins/update-list.mixin'

export default {
  name: 'create-sale-requests',
  components: {
    Drawer,
    CollectionLoader,
    RequestsTable,
    RequestViewer,
    SaleForm,
  },

  mixins: [UpdateList],

  data: _ => ({
    isLoaded: false,
    isLoadingFailed: false,
    isDrawerShown: false,
    isUpdateMode: false,
    selectedRequest: {},
    firstPageLoader: () => {},
  }),

  computed: {
    ...mapGetters({
      requests: vuexTypes.createSaleRequests,
    }),
  },

  async created () {
    this.initFirstPageLoader()
    this.listenUpdateList('createSaleRequests:updateList', this.initFirstPageLoader)
  },

  beforeDestroy () {
    this.resetUpdateListEvent('createSaleRequests:updateList')
  },

  methods: {
    SaleFormer,
    ...mapMutations({
      setRequests: vuexTypes.SET_CREATE_SALE_REQUESTS,
      concatRequests: vuexTypes.CONCAT_CREATE_SALE_REQUESTS,
    }),

    ...mapActions({
      loadCreateSaleRequests: vuexTypes.LOAD_CREATE_SALE_REQUESTS,
    }),

    async loadRequests () {
      this.isLoaded = false
      try {
        const response = await this.loadCreateSaleRequests()
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
      this.isUpdateMode = false
      this.selectedRequest = request
      this.isDrawerShown = true
    },

    closeDrawerAndUpdateList () {
      this.isDrawerShown = false
      this.emitUpdateList('createSaleRequests:updateList')
    },
  },
}
</script>

<style lang="scss" scoped>
.create-sale-requests__asset-list {
  width: fit-content;
}

.create-sale-requests__renderer {
  margin-top: 2.1rem;
}

.create-sale-requests__loader {
  margin-top: 1rem;
}
</style>
