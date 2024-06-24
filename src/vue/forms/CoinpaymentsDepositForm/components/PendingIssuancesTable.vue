<template>
  <table class="pending-issuances-table">
    <pending-issuances-table-row
      v-for="(item, index) in pendingIssuances"
      :end-time="item.endTime"
      :amount="item.amount"
      :asset="item.asset"
      :address="item.address"
      :key="index"
      :expanded="selectedIssuance === item.address"
      @expand-requested="selectIssuance(item.address)"
    />
  </table>
</template>

<script>
import PendingIssuancesTableRow from './PendingIssuancesTableRow'

export default {
  name: 'pending-issuances-table',
  components: {
    PendingIssuancesTableRow,
  },
  props: {
    pendingIssuances: { type: Array, required: true },
  },
  data: () => ({
    selectedIssuance: null,
  }),
  methods: {
    resetIssuanceSelection () {
      this.selectedIssuance = null
    },
    selectIssuance (address) {
      if (this.selectedIssuance === address) {
        this.selectedIssuance = null
      } else {
        this.selectedIssuance = address
      }
    },
  },
}
</script>

<style lang="scss">
@import '~@scss/variables';

.pending-issuances-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.pending-issuances-table tbody:nth-child(odd) tr:first-child {
  background: $col-table-alt-row-background;
}
</style>
