<template>
  <div class="movements">
    <movements-top-bar-module
      @asset-updated="updateAsset"
      @movements-update-required="emitUpdateList('movements:updateList')"
    />
    <movements-history
      :asset-code="asset.code"
      :key="`movements-history-state-${historyState}`"
    />
  </div>
</template>

<script>
import MovementsTopBarModule from '@modules/movements-top-bar'
import MovementsHistory from '@/vue/pages/MovementsHistory'

import config from '@/config'
import UpdateList from '@/vue/mixins/update-list.mixin'

export default {
  name: 'movements-page',
  components: {
    MovementsTopBarModule,
    MovementsHistory,
  },

  mixins: [UpdateList],

  data: _ => ({
    asset: {},
    movementsTopBarReitConfig: {
      horizonURL: config.HORIZON_SERVER,
      minAmount: config.MIN_AMOUNT,
      maxAmount: config.MAX_AMOUNT,
      decimalPoints: config.DECIMAL_POINTS,
    },
    historyState: 0,
  }),

  created () {
    this.listenUpdateList('movements:updateList', this.updateMovementsHistoryList)
  },

  beforeDestroy () {
    this.resetUpdateListEvent('movements:updateList')
  },

  methods: {
    updateAsset (asset) {
      this.asset = asset
    },

    withdrawalFiatModuleWithdrawn () {
      this.emitUpdateList('movements:updateList')
    },

    depositFiatModuleDeposited () {
      this.emitUpdateList('movements:updateList')
    },

    redeemModuleSubmitted () {
      this.emitUpdateList('movements:updateList')
    },

    updateMovementsHistoryList () {
      this.historyState++
    },
  },
}
</script>

<style lang="scss">
</style>
