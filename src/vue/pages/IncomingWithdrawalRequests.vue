<template>
  <div class="incoming-withdrawal-requests">
    <template>
      <drawer :is-shown.sync="isDrawerShown">
        <template slot="heading">
          {{ 'incoming-withdrawal-requests.details-title' | globalize }}
        </template>
        <request-viewer
          :request="selectedRequest"
          @request-updated="closeDrawerAndUpdateList()"
        />
      </drawer>

      <requests-table
        :requests="requests"
        :is-loaded="isLoaded"
        @select="showRequestDetails"
      />
    </template>

    <p v-if="isLoadingFailed">
      {{ 'incoming-withdrawal-requests.loading-error-msg' | globalize }}
    </p>

    <collection-loader
      class="incoming-withdrawal-requests__loader"
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

import RequestViewer from '@/vue/pages/requests/incoming-withdrawal-requests/RequestViewer'
import RequestsTable from '@/vue/pages/requests/incoming-withdrawal-requests/RequestsTable'

import { mapActions, mapMutations, mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'
import UpdateList from '@/vue/mixins/update-list.mixin'

export default {
  name: 'incoming-withdrawal-requests',
  components: {
    Drawer,
    CollectionLoader,
    RequestsTable,
    RequestViewer,
  },

  mixins: [UpdateList],

  data: _ => ({
    isLoaded: false,
    isLoadingFailed: false,
    isDrawerShown: false,
    selectedRequest: {},
    firstPageLoader: () => {},
  }),

  computed: {
    ...mapGetters({
      requests: vuexTypes.incomingWithdrawalRequests,
    }),
  },

  created () {
    this.initFirstPageLoader()
    this.listenUpdateList('incomingWithdrawalRequests:updateList', this.initFirstPageLoader)
  },

  beforeDestroy () {
    this.resetUpdateListEvent('incomingWithdrawalRequests:updateList')
  },

  methods: {
    ...mapMutations({
      setRequests: vuexTypes.SET_INCOMING_WITHDRAWAL_REQUESTS,
      concatRequests: vuexTypes.CONCAT_INCOMING_WITHDRAWAL_REQUESTS,
    }),

    ...mapActions({
      // eslint-disable-next-line max-len
      loadIncomingWithdrawalRequests: vuexTypes.LOAD_INCOMING_WITHDRAWAL_REQUESTS,
    }),

    async loadRequests () {
      this.isLoaded = false
      try {
        const response = await this.loadIncomingWithdrawalRequests()
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
      this.selectedRequest = request
      this.isDrawerShown = true
    },

    closeDrawerAndUpdateList () {
      this.isDrawerShown = false
      this.emitUpdateList('incomingWithdrawalRequests:updateList')
    },
  },
}
</script>

<style lang="scss" scoped>
.incoming-withdrawal-requests__loader {
  margin-top: 1rem;
}
</style>
