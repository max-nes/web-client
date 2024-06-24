<template>
  <div class="request-attributes-viewer app__table">
    <table>
      <tbody>
        <tr>
          <td>{{ 'update-asset-requests.terms-title' | globalize }}</td>
          <td>
            <a
              v-if="request.termsKey"
              class="request-attributes-viewer__terms"
              :href="assetTermsUrl"
            >
              {{ 'update-asset-requests.download-terms-btn' | globalize }}
            </a>

            <p v-else>
              {{ 'update-asset-requests.no-terms-msg' | globalize }}
            </p>
          </td>
        </tr>

        <tr>
          <td>{{ 'update-asset-requests.transferable-title' | globalize }}</td>
          <td>
            <template v-if="request.isTransferable">
              {{ 'update-asset-requests.yes-msg' | globalize }}
            </template>

            <template v-else>
              {{ 'update-asset-requests.no-msg' | globalize }}
            </template>
          </td>
        </tr>

        <tr>
          <td>{{ 'update-asset-requests.withdrawable-title' | globalize }}</td>
          <td>
            <template v-if="request.isWithdrawable">
              {{ 'update-asset-requests.yes-msg' | globalize }}
            </template>

            <template v-else>
              {{ 'update-asset-requests.no-msg' | globalize }}
            </template>
          </td>
        </tr>

        <tr>
          <td>
            <!-- eslint-disable-next-line max-len -->
            {{ 'update-asset-requests.can-be-base-in-atomic-swap-title' | globalize }}
          </td>
          <td>
            <template v-if="request.isBaseInAtomicSwap">
              {{ 'update-asset-requests.yes-msg' | globalize }}
            </template>

            <template v-else>
              {{ 'update-asset-requests.no-msg' | globalize }}
            </template>
          </td>
        </tr>

        <tr>
          <td>
            <!-- eslint-disable-next-line max-len -->
            {{ 'update-asset-requests.can-be-quote-in-atomic-swap-title' | globalize }}
          </td>
          <td>
            <template v-if="request.isQuoteInAtomicSwap">
              {{ 'update-asset-requests.yes-msg' | globalize }}
            </template>

            <template v-else>
              {{ 'update-asset-requests.no-msg' | globalize }}
            </template>
          </td>
        </tr>

        <template v-if="request.stellarAssetCode">
          <!-- eslint-disable-next-line max-len -->
          <tr :title="'update-asset-requests.stellar-asset-code-title' | globalize">
            <td>
              {{ 'update-asset-requests.stellar-asset-code-title' | globalize }}
            </td>
            <td>
              {{ request.stellarAssetCode }}
            </td>
          </tr>

          <!-- eslint-disable-next-line max-len -->
          <tr :title="'update-asset-requests.stellar-asset-type-title' | globalize">
            <td>
              {{ 'update-asset-requests.stellar-asset-type-title' | globalize }}
            </td>
            <td>
              {{ stellarAssetTypeTranslated }}
            </td>
          </tr>

          <!-- eslint-disable-next-line max-len -->
          <tr :title="'update-asset-requests.stellar-withdraw-title' | globalize">
            <td>
              {{ 'update-asset-requests.stellar-withdraw-title' | globalize }}
            </td>
            <td>
              <template v-if="request.stellarWithdraw">
                {{ 'update-asset-requests.yes-msg' | globalize }}
              </template>
              <template v-else>
                {{ 'update-asset-requests.no-msg' | globalize }}
              </template>
            </td>
          </tr>

          <!-- eslint-disable-next-line max-len -->
          <tr :title="'update-asset-requests.stellar-deposit-title' | globalize">
            <td>
              {{ 'update-asset-requests.stellar-deposit-title' | globalize }}
            </td>
            <td>
              <template v-if="request.stellarDeposit">
                {{ 'update-asset-requests.yes-msg' | globalize }}
              </template>
              <template v-else>
                {{ 'update-asset-requests.no-msg' | globalize }}
              </template>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { AssetRequest } from '@/js/records/requests/asset-request.record'
import { STELLAR_TYPES } from '@/js/const/asset-subtypes.const'
import { documentsManager } from '@/api'

export default {
  name: 'request-attributes-viewer',
  props: {
    request: { type: AssetRequest, required: true },
  },

  computed: {
    assetTermsUrl () {
      return documentsManager.getDocumentUrlByKey(this.request.termsKey)
    },

    stellarAssetTypeTranslated () {
      let translationId

      switch (this.request.stellarAssetType) {
        case STELLAR_TYPES.creditAlphanum4:
          translationId = 'update-asset-requests.credit-alphanum4-stellar-asset-type-lbl'
          break

        case STELLAR_TYPES.creditAlphanum12:
          translationId = 'update-asset-requests.credit-alphanum12-stellar-asset-type-lbl'
          break

        case STELLAR_TYPES.native:
          translationId = 'update-asset-requests.native-stellar-asset-type-lbl'
          break

        default:
          translationId = '[UNKNOWN_STELLAR_ASSET_TYPE]'
          break
      }

      return this.$options.filters.globalize(translationId)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@scss/variables';

.request-attributes-viewer tr td:last-child {
  text-align: right;
}

.request-attributes-viewer__terms {
  font-size: 1.4rem;
  color: $col-primary-lighten;
  text-decoration: none;

  &:visited {
    color: $col-primary-lighten;
  }
}
</style>
