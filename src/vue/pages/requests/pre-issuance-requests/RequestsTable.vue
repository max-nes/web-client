<template>
  <div class="requests-table">
    <div
      class="app__table app__table--with-shadow"
    >
      <table>
        <thead>
          <tr>
            <th :title="'pre-issuance-requests.asset-code-header' | globalize">
              {{ 'pre-issuance-requests.asset-code-header' | globalize }}
            </th>
            <th :title="'pre-issuance-requests.amount-header' | globalize">
              {{ 'pre-issuance-requests.amount-header' | globalize }}
            </th>
            <!-- eslint-disable-next-line max-len -->
            <th :title="'pre-issuance-requests.request-state-header' | globalize">
              {{ 'pre-issuance-requests.request-state-header' | globalize }}
            </th>
            <th :title="'pre-issuance-requests.created-header' | globalize">
              {{ 'pre-issuance-requests.created-header' | globalize }}
            </th>
          </tr>
        </thead>

        <tbody
          v-if="requests.length && isLoaded"
        >
          <tr
            v-for="request in requests"
            :key="request.id"
          >
            <td :title="request.assetCode">
              {{ request.assetCode }}
            </td>

            <td :title="request.amount | formatMoney">
              {{ request.amount | formatMoney }}
            </td>

            <td>
              <request-state-viewer :request="request" />
            </td>

            <td :title="request.createdAt | formatCalendar">
              {{ request.createdAt | formatCalendar }}
            </td>
          </tr>
        </tbody>
        <empty-tbody-placeholder
          v-else-if="!requests.length && isLoaded"
          :colspan="4"
          :message="'pre-issuance-requests.no-request-history-desc' | globalize"
        />
        <skeleton-loader-table-body
          v-else
          :cells="4"
        />
      </table>
    </div>
  </div>
</template>

<script>
import RequestStateViewer from '@/vue/pages/requests/shared/RequestStateViewer'
import SkeletonLoaderTableBody from '@/vue/common/skeleton-loader/SkeletonLoaderTableBody'
import EmptyTbodyPlaceholder from '@/vue/common/EmptyTbodyPlaceholder'

const EVENTS = {
  select: 'select',
}

export default {
  name: 'requests-table',
  components: {
    RequestStateViewer,
    SkeletonLoaderTableBody,
    EmptyTbodyPlaceholder,
  },

  props: {
    requests: {
      type: Array,
      required: true,
    },
    isLoaded: {
      type: Boolean,
      required: true,
    },
  },

  data: _ => ({
    EVENTS,
  }),
}
</script>
