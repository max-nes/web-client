<template>
  <div class="request-attributes-viewer">
    <p class="request-attributes-viewer__short-description">
      {{ request.shortDescription }}
    </p>

    <div class="request-attributes-viewer__table app__table">
      <table>
        <tbody>
          <tr>
            <td>{{ 'create-sale-requests.name-title' | globalize }}</td>
            <td>{{ request.name }}</td>
          </tr>
          <tr>
            <td>
              {{ 'create-sale-requests.type-title' | globalize }}
            </td>
            <td>{{ localizedSaleTypes[request.saleType] | globalize }}</td>
          </tr>
          <tr>
            <td>
              {{ 'create-sale-requests.start-time-title' | globalize }}
            </td>
            <td>{{ request.startTime | formatCalendar }}</td>
          </tr>
          <tr>
            <td>
              {{ 'create-sale-requests.close-time-title' | globalize }}
            </td>
            <td>
              {{ request.endTime | formatCalendar }}
            </td>
          </tr>
          <tr>
            <td>{{ 'create-sale-requests.soft-cap-title' | globalize }}</td>
            <td>
              <!-- eslint-disable-next-line max-len -->
              {{ { value: request.softCap, currency: request.defaultQuoteAsset } | formatMoney }}
            </td>
          </tr>
          <tr>
            <td>{{ 'create-sale-requests.hard-cap-title' | globalize }}</td>
            <td>
              <!-- eslint-disable-next-line max-len -->
              {{ { value: request.hardCap, currency: request.defaultQuoteAsset } | formatMoney }}
            </td>
          </tr>
          <tr>
            <td>
              <!-- eslint-disable-next-line max-len -->
              {{ 'create-sale-requests.sell-title' | globalize({ asset: request.baseAsset }) }}
            </td>
            <td>
              <!-- eslint-disable-next-line max-len -->
              {{ { value: request.baseAssetForHardCap, currency: request.baseAsset } | formatMoney }}
            </td>
          </tr>
          <tr>
            <td>
              {{ 'create-sale-requests.video-about-sale-title' | globalize }}
            </td>
            <td>
              <a
                v-if="request.youtubeVideoUrl"
                class="request-attributes-viewer__video-btn"
                :href="request.youtubeVideoUrl"
                target="_blank"
              >
                {{ 'create-sale-requests.view-video-btn' | globalize }}
              </a>
              <p v-else>
                {{ 'create-sale-requests.no-video-msg' | globalize }}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              {{ 'create-sale-requests.whitelisted-title' | globalize }}
            </td>
            <td>
              <template v-if="request.isWhitelisted">
                {{ 'create-sale-requests.yes-msg' | globalize }}
              </template>
              <template v-else>
                {{ 'create-sale-requests.no-msg' | globalize }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { SALE_TYPES } from '@tokend/js-sdk'
import { CreateSaleRequest } from '@/js/records/requests/create-sale-request.record'

export default {
  name: 'request-attributes-viewer',
  props: {
    request: { type: CreateSaleRequest, required: true },
  },
  computed: {
    localizedSaleTypes () {
      const keyValue = {}
      keyValue[SALE_TYPES.fixedPrice] = 'sale-overview.fixed-price'
      keyValue[SALE_TYPES.immediate] = 'sale-overview.immediate'
      return keyValue
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@scss/variables';

.request-attributes-viewer__short-description {
  margin-top: 4rem;
  font-size: 1.4rem;
  color: $col-text;
}

.request-attributes-viewer__table {
  margin-top: 2rem;
}

.request-attributes-viewer__table tr td:last-child {
  text-align: right;
}

.request-attributes-viewer__video-btn {
  color: $col-link;
  text-decoration: none;

  &:visited {
    color: $col-link;
  }
}
</style>
