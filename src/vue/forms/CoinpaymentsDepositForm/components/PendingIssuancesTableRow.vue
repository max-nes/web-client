<template>
  <tbody class="pending-issuances-table-row">
    <tr
      class="pending-issuances-table-row__tr"
    >
      <td>
        <timeout-ticker
          v-if="endTime"
          :end-time="endTime"
        />
      </td>
      <td class="pending-issuances-table-row__amount">
        {{ { value: amount, currency: asset } | formatMoney }}
      </td>
      <td class="pending-issuances-table-row__btn">
        <button
          class="app__button-icon"
          @click="requestExpand"
        >
          <i class="mdi mdi-view-dashboard" />
        </button>
      </td>
    </tr>
    <tr
      class="pending-issuances-table-row__key-viewer-wrp"
      v-if="expanded"
    >
      <td colspan="3">
        <key-viewer
          class="pending-issuances-table-row__key-viewer"
          :value="address"
          :label="'coinpayments-deposit.address-lbl' | globalize"
        />
      </td>
    </tr>
  </tbody>
</template>

<script>
import TimeoutTicker from '@/vue/common/TimeoutTicker'
import KeyViewer from '@/vue/common/KeyViewer'

const EVENTS = {
  expandRequested: 'expand-requested',
}

export default {
  name: 'pending-issuances-table-row',
  components: {
    TimeoutTicker,
    KeyViewer,
  },
  props: {
    endTime: { type: Number, required: true }, // unix timeStamp
    amount: { type: [String, Number], required: true },
    asset: { type: String, required: true },
    address: { type: String, required: true },
    expanded: { type: Boolean, required: true },
  },
  methods: {
    requestExpand () {
      this.$emit(EVENTS.expandRequested)
    },
  },
}
</script>

<style lang="scss">
@import '~@scss/variables';

.pending-issuances-table-row {
  width: 100%;
  max-width: 100%;
  overflow: auto;
}

.pending-issuances-table-row td {
  padding: 0.5rem 1rem;
}

.pending-issuances-table-row__tr {
  &:hover {
    background: $col-table-row-selected;
  }
}

.pending-issuances-table-row__amount {
  max-width: 24rem;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}

.pending-issuances-table-row__key-viewer {
  padding: 2rem 0;
}

.pending-issuances-table-row__btn {
  width: 6.4rem;
}

.pending-issuances-table-row__key-viewer-wrp {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.pending-issuances-table-row__key-viewer-wrp td {
  padding: 0.5rem 0;
}
</style>
