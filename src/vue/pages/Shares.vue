<template>
  <div class="register-of-shares">
    <movements-top-bar-module
      @asset-updated="updateAsset"
      @movements-update-required="updateList"
      @show-no-data-message="showNoDataMessage = true"
    />

    <movements-history
      v-if="asset.code"
      :asset-code="asset.code"
      :key="`movements-history-state-${historyState}`"
    >
      <loader
        slot="loader"
        message-id="op-pages.assets-loading-msg"
      />
    </movements-history>

    <no-data-message
      v-else-if="showNoDataMessage"
      icon-name="trending-up"
      :title="'op-pages.no-data-title' | globalize"
      :message="'op-pages.no-data-msg' | globalize"
    />

    <loader
      v-else
      message-id="op-pages.assets-loading-msg"
    />
  </div>
</template>

<script>
import NoDataMessage from '@/vue/common/NoDataMessage'
import Loader from '@/vue/common/Loader'
import MovementsTopBarModule from '@modules/movements-top-bar'
import MovementsHistory from '@/vue/pages/MovementsHistory'

export default {
  name: 'register-of-shares-page',
  components: {
    NoDataMessage,
    Loader,
    MovementsTopBarModule,
    MovementsHistory,
  },

  data: _ => ({
    asset: {},
    historyState: 0,
    showNoDataMessage: false,
  }),

  methods: {
    updateAsset (asset) {
      this.asset = asset
    },

    // MovementsHistoryModule uses these 3 methods below
    withdrawalFiatModuleWithdrawn () {
      this.updateList()
    },

    depositFiatModuleDeposited () {
      this.updateList()
    },

    redeemModuleSubmitted () {
      this.updateList()
    },

    updateList () {
      this.historyState++
    },
  },
}
</script>
