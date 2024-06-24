<template>
  <div class="coinpayments-deposit">
    <coinpayments-form
      :asset="asset"
      :balance-id="balanceId"
      @submitted="handleCoinpaymentsFormSubmitted"
    />
    <div class="coinpayments-deposit__pending-issuances-table-wrp">
      <pending-issuances-table
        v-if="!isLoading"
        :pending-issuances="pendingIssuances"
        ref="table"
      />
      <template v-else-if="isFailed">
        <p>
          {{ 'coinpayments-deposit.load-failed-msg' | globalize }}
        </p>
      </template>
      <template v-else>
        <loader message-id="coinpayments-deposit.loading-msg" />
      </template>
      <collection-loader
        v-show="pendingIssuances.length"
        :first-page-loader="firstPageLoader"
        @first-page-load="setPendingIssuances"
        @next-page-load="concatPendingIssuances"
      />
    </div>
  </div>
</template>

<script>
import CoinpaymentsForm from './components/CoinpaymentsForm'
import PendingIssuancesTable from './components/PendingIssuancesTable'
import CollectionLoader from '@/vue/common/CollectionLoader'
import Loader from '@/vue/common/Loader'

import { api } from '@/api'
import { IssuanceRecord } from '@/js/records/entities/issuance.record'
import { ErrorHandler } from '@/js/helpers/error-handler'

export default {
  name: 'coinpayments-deposit-form',
  components: {
    CoinpaymentsForm,
    PendingIssuancesTable,
    CollectionLoader,
    Loader,
  },
  props: {
    asset: { type: Object, required: true },
    balanceId: { type: String, required: true },
    accountId: { type: String, required: true },
  },
  data () {
    return {
      isLoading: true,
      isFailed: false,
      pendingIssuances: [],
    }
  },
  computed: {
    firstPageLoader () {
      return _ => this.loadFirstPage()
    },
  },
  methods: {
    setPendingIssuances (records) {
      this.pendingIssuances = records.map(item => new IssuanceRecord(item))
    },
    concatPendingIssuances (records) {
      this.pendingIssuances = this.pendingIssuances.concat(records
        .map(item => new IssuanceRecord(item))
      )
    },
    async loadFirstPage () {
      try {
        const response = await this.loadPendingIssuances(this.balanceId)
        this.isLoading = false
        return response
      } catch (e) {
        ErrorHandler.processWithoutFeedback(e)
        this.isFailed = true
      }
    },
    async loadPendingIssuances (balanceId) {
      const params = {
        filter: {
          state: 1,
          'request_details.receiver': balanceId,
        },
        page: {
          order: 'desc',
        },
        include: ['request_details'],
      }
      const endpoint = '/v3/create_issuance_requests'
      const response = await api.getWithSignature(endpoint, params)
      return response
    },
    handleCoinpaymentsFormSubmitted () {
      this.$refs.table.resetIssuanceSelection()
    },
  },
}
</script>

<style lang="scss" scoped>
  .coinpayments-deposit__pending-issuances-table-wrp {
    width: 100%;
    max-width: 100%;
    margin-top: 5rem;
  }
</style>
