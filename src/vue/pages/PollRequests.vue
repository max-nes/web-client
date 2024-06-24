<template>
  <div>
    <template>
      <drawer :is-shown.sync="isDrawerShown">
        <template slot="heading">
          {{ 'poll-requests.details-title' | globalize }}
        </template>
        <request-viewer
          :request="selectedRequest"
          @cancel="closeDrawerAndUpdateList()"
        />
      </drawer>

      <requests-table
        :requests="requests"
        :is-loaded="isLoaded"
        @select="showRequestDetails"
      />
    </template>

    <p v-if="isLoadingFailed">
      {{ 'poll-requests.loading-error-msg' | globalize }}
    </p>

    <collection-loader
      class="poll-requests__loader"
      v-show="requests.length && isLoaded"
      :first-page-loader="firstPageLoader"
      @first-page-load="setRequests"
      @next-page-load="concatRequests"
    />
  </div>
</template>

<script>
import Drawer from '@/vue/common/Drawer'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'
import CollectionLoader from '@/vue/common/CollectionLoader'
import RequestsTable from '@/vue/pages/requests/poll-requests/RequestsTable'
import RequestViewer from '@/vue/pages/requests/poll-requests/RequestViewer'
import UpdateList from '@/vue/mixins/update-list.mixin'

export default {
  name: 'poll-requests',
  components: {
    CollectionLoader,
    RequestsTable,
    Drawer,
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
      requests: vuexTypes.pollRequests,
    }),
  },
  async created () {
    this.initFirstPageLoader()
    this.listenUpdateList('polls:updateList', this.initFirstPageLoader)
  },

  methods: {
    ...mapMutations({
      setRequests: vuexTypes.SET_POLL_REQUESTS,
      concatRequests: vuexTypes.CONCAT_POLL_REQUESTS,
    }),
    ...mapActions({
      loadCreateAssetRequests: vuexTypes.LOAD_POLL_REQUESTS,
    }),
    async loadRequests () {
      this.isLoaded = false
      try {
        const response = await this.loadCreateAssetRequests()
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
      this.emitUpdateList('pollrequests:updateList')
    },
  },
}
</script>

<style scoped lang="scss">
.poll-requests__loader {
  margin-top: 1rem;
}
</style>
