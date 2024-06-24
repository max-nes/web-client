<template>
  <div class="deposit">
    <template v-if="isLoaded">
      <template v-if="selectedAsset.code">
        <div class="deposit-form__help-message-wrp">
          <p class="deposit-form__help-message">
            {{ 'deposit-form.how-to' | globalize }}
          </p>
        </div>

        <div class="deposit-form__asset-select-wrp">
          <div class="app__form-row">
            <div class="app__form-field">
              <select-field
                :value="selectedAsset.code"
                @input="setAssetByCode"
                :label="'deposit-form.asset' | globalize"
                :disabled="formMixin.isDisabled"
              >
                <option
                  v-for="asset in assets"
                  :key="asset.code"
                  :value="asset.code"
                >
                  {{ asset.nameAndCode }}
                </option>
              </select-field>
            </div>
          </div>
        </div>

        <template v-for="item in assets">
          <template v-if="item === selectedAsset && item.isCoinpayments">
            <coinpayments-deposit-form
              :asset="item"
              :balance-id="balanceId"
              :account-id="accountId"
              :key="item.code"
            />
          </template>
          <address-loader
            @ready="enableForm()"
            :key="item.code"
            v-if="item === selectedAsset && !item.isCoinpayments"
            :asset-code="selectedAsset.code"
            :external-system-type="selectedAsset.externalSystemType"
          />
        </template>
      </template>

      <template v-else>
        <h2 class="app__page-heading">
          {{ 'deposit-form.no-assets-heading' | globalize }}
        </h2>
        <p>
          {{ 'deposit-form.deposit-no-assets' | globalize }}
        </p>
        <router-link
          :to="vueRoutes.assets"
          tag="button"
          class="app__button-raised deposit-form__discover-asset-btn">
          {{ 'deposit-form.discover-assets-btn' | globalize }}
        </router-link>
      </template>
    </template>

    <template v-else-if="isLoadingFailed">
      {{ 'deposit-form.can-not-load-assets' | globalize }}
    </template>

    <template v-else>
      <loader message-id="deposit-form.loading-msg" />
    </template>
  </div>
</template>

<script>
import Loader from '@/vue/common/Loader'
import AddressLoader from './components/AddressLoader'
import CoinpaymentsDepositForm from '@/vue/forms/CoinpaymentsDepositForm'

import FormMixin from '@/vue/mixins/form.mixin'

import { mapGetters, mapActions } from 'vuex'
import { vuexTypes } from '@/vuex/types'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { vueRoutes } from '@/vue-router/routes'

export default {
  name: 'deposit-form',
  components: {
    Loader,
    AddressLoader,
    CoinpaymentsDepositForm,
  },
  mixins: [FormMixin],

  props: {
    assetCode: { type: String, default: '' },
  },

  data () {
    return {
      isLoaded: false,
      isLoadingFailed: false,
      assets: [],
      selectedAsset: {},
      vueRoutes,
    }
  },
  computed: {
    ...mapGetters({
      accountId: vuexTypes.accountId,
      accountBalances: vuexTypes.accountBalances,
    }),
    balanceId () {
      return this.accountBalances.find(item => {
        return item.asset.code === this.selectedAsset.code
      }).id
    },
  },

  async created () {
    try {
      await this.loadBalances()
      this.assets = this.accountBalances
        .map(item => item.asset)
        .filter(item => item.isDepositable)

      if (this.assets.length) {
        this.selectedAsset = this.assets.find(a => a.code === this.assetCode) ||
          this.assets[0]
      }
      this.isLoaded = true
    } catch (e) {
      ErrorHandler.processWithoutFeedback(e)
      this.isLoadingFailed = true
    }
  },

  methods: {
    ...mapActions({
      loadBalances: vuexTypes.LOAD_ACCOUNT_BALANCES_DETAILS,
    }),

    setAssetByCode (code) {
      this.selectedAsset = this.assets.find(item => item.code === code) || {}
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.deposit {
  overflow-x: hidden;
}

.deposit-form__help-message {
  font-size: 1.4rem;
  opacity: 0.7;
  line-height: 1.5;
}

.deposit-form__discover-asset-btn {
  margin-top: 2.5rem;
}

.deposit-form__help-message-wrp,
.deposit-form__asset-select-wrp {
  margin-bottom: 2.5rem;
}
</style>
