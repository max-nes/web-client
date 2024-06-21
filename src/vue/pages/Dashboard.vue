<template>
  <div class="dashboard">
    <template v-if="isLoaded">
      <div class="dashboard__toolbar">
        <asset-selector
          class="dashboard__asset-selector"
          :current-asset-code="currentAssetCode"
          @asset-change="currentAssetCode = $event"
          :scale="scale"
        />
        <div class="dashboard__actions">
          <!-- eslint-disable-next-line max-len -->
          <template v-if="isAccountCorporate">
            <button
              class="app__button-raised dashboard__action"
              @click="createIssuanceFormIsShown = true"
            >
              <i class="mdi mdi-plus dashboard__plus-icon" />
              {{ 'dashboard.create-issuance-btn' | globalize }}
            </button>
          </template>

          <!-- eslint-disable-next-line max-len -->
          <button
            v-if="currentAsset.isTransferable"
            class="app__button-raised dashboard__action"
            @click="transferFormIsShown = true"
          >
            <i class="mdi mdi-send mdi-rotate-315 dashboard__send-icon" />
            {{
              'dashboard.send-asset-lbl' | globalize({
                asset: currentAssetCode
              })
            }}
          </button>
        </div>
      </div>
      <template v-if="currentAssetCode">
        <div
          v-if="currentAssetCode !== defaultQuoteAsset"
          class="dashboard__chart"
        >
          <chart
            :base-asset="currentAssetCode"
            :quote-asset="defaultQuoteAsset"
          />
        </div>
        <div
          class="dashboard__activity"
          v-if="currentAssetCode"
        >
          <movements-history
            :asset-code="currentAssetCode"
            :ref="REFS.movementsHistory"
            :latest-activity="true"
          />
        </div>
      </template>

      <drawer :is-shown.sync="showDrawer">
        <template
          v-if="createIssuanceFormIsShown && isAccountCorporate"
        >
          <template slot="heading">
            {{ 'dashboard.create-issuance-title' | globalize }}
          </template>

          <issuance-form
            @issuance-created="closeDrawerAndUpdateList"
          />
        </template>

        <template v-if="transferFormIsShown">
          <template slot="heading">
            {{ 'transfer-form.form-heading' | globalize }}
          </template>
          <transfer
            @operation-submitted="closeDrawerAndUpdateList()"
            :asset-to-transfer="currentAssetCode"
          />
        </template>
      </drawer>
    </template>
  </div>
</template>

<script>
import AssetSelector from '@/vue/pages/dashboard/Dashboard.AssetSelector.vue'
import Transfer from '@/vue/forms/TransferForm'
import IssuanceForm from '@/vue/forms/IssuanceForm'
import Drawer from '@/vue/common/Drawer'
import Chart from '@/vue/common/chart/Chart'
import MovementsHistory from '@/vue/pages/MovementsHistory'

import UpdateList from '@/vue/mixins/update-list.mixin'

import { mapGetters, mapActions } from 'vuex'
import { vuexTypes } from '@/vuex'

const REFS = {
  movementsHistory: 'movements-history',
}

export default {
  name: 'dashboard',
  components: {
    AssetSelector,
    Transfer,
    Drawer,
    IssuanceForm,
    Chart,
    MovementsHistory,
  },

  mixins: [UpdateList],

  data: () => ({
    currentAssetCode: null,
    isLoaded: false,
    createIssuanceFormIsShown: false,
    transferFormIsShown: false,
    showDrawer: false,
    scale: 'day',
    REFS,
  }),

  computed: {
    ...mapGetters([
      vuexTypes.isAccountCorporate,
      vuexTypes.accountBalances,
      vuexTypes.defaultQuoteAsset,
      vuexTypes.assetByCode,
    ]),
    currentAsset () {
      return this.assetByCode(this.currentAssetCode)
    },
  },

  watch: {
    showDrawer (status) {
      if (!status) {
        this.createIssuanceFormIsShown = false
        this.transferFormIsShown = false
      }
    },
    createIssuanceFormIsShown (status) {
      this.showDrawer = status
    },
    transferFormIsShown (status) {
      this.showDrawer = status
    },
    async currentAssetCode (value) {
      await this.$router.push({
        query: { asset: value },
      }, () => {})
      this.loadBalances()
    },
  },
  async created () {
    await this.loadBalances()
    this.setCurrentAsset()
    this.listenUpdateList('dashboard:updateList', this.updateBalancesAndList)
    this.isLoaded = true
  },

  beforeDestroy () {
    this.resetUpdateListEvent('dashboard:updateList')
  },

  methods: {
    ...mapActions({
      loadBalances: vuexTypes.LOAD_ACCOUNT_BALANCES_DETAILS,
    }),
    setCurrentAsset (value) {
      if (value) {
        this.currentAssetCode = value.code
      } else {
        const keys = this.accountBalances.map(i => i.asset.code)
        this.currentAssetCode =
          keys.find(a => a === this.$route.query.asset) || keys[0] || ''
      }
    },

    // TODO: find a better way to execute child’s reload-list method
    updateMovementsHistoryList () {
      if (!this.$refs[REFS.movementsHistory]) {
        return
      }
      return this.$refs[REFS.movementsHistory].$children[0]
        .reloadCollectionLoader()
    },
    closeDrawerAndUpdateList () {
      this.showDrawer = false
      this.emitUpdateList('dashboard:updateList')
    },
    updateBalancesAndList () {
      return Promise.all([
        this.loadBalances(),
        this.updateMovementsHistoryList(),
      ])
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@scss/variables';
@import '~@scss/mixins';

.dashboard {
  flex: 1;
}

.dashboard__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: -1rem;

  @include respond-to($small) {
    flex-direction: column-reverse;
  }
}

.dashboard__actions {
  display: flex;
  margin: 1.8rem 1rem 1rem;
}

.dashboard__plus-icon,
.dashboard__send-icon {
  font-size: 1.6rem;
  margin-right: 0.5rem;
}

.dashboard__send-icon {
  margin-top: -0.6rem;
}

.dashboard__asset-selector {
  margin: 1rem;
}

.dashboard__action {
  &:not(:first-child) {
    margin-left: 0.8rem;
  }
}

.dashboard__chart {
  margin-top: -4rem;
}

.dashboard__activity {
  width: 100%;
  margin-top: 2.4rem;
  overflow-x: auto;
}
</style>
