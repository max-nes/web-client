<template>
  <table class="movements-table">
    <thead>
      <tr class="movements-table__head-row">
        <th
          class="movements-table__head-cell"
          :title="'movements-history.type-th' | globalize"
        >
          {{ 'movements-history.type-th' | globalize }}
        </th>
        <th
          class="movements-table__head-cell"
          :title="'movements-history.operation-th' | globalize"
        >
          {{ 'movements-history.operation-th' | globalize }}
        </th>
        <th
          class="movements-table__head-cell"
          :title="'movements-history.date-th' | globalize"
        >
          {{ 'movements-history.date-th' | globalize }}
        </th>
        <th
          class="movements-table__head-cell"
          :title="'movements-history.amount-th' | globalize"
        >
          {{ 'movements-history.amount-th' | globalize }}
        </th>
        <th
          class="movements-table__head-cell
                 movements-table__head-cell--expand-btn-wrp"
        />
      </tr>
    </thead>

    <movements-table-row
      v-for="movement in movements"
      :movement="movement"
      :key="movement.id"
    />
    <empty-tbody-placeholder
      v-if="!movements.length && isMovementsLoaded"
    />
    <template v-for="index in 3">
      <movements-skeleton-loader
        v-if="!isMovementsLoaded && !movements.length"
        :key="index"
      />
    </template>
  </table>
</template>

<script>
import MovementsTableRow from './MovementsTableRow'
import MovementsSkeletonLoader from './MovementsSkeletonLoader.vue'
import EmptyTbodyPlaceholder from './MovementsEmptyListPlaceholder.vue'

export default {
  name: 'movement-list-renderer',
  components: {
    MovementsTableRow,
    MovementsSkeletonLoader,
    EmptyTbodyPlaceholder,
  },
  props: {
    movements: {
      type: Array, /** {@link Movement} **/
      required: true,
    },
    isMovementsLoaded: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@scss/variables';

.movements-table {
  width: 100%;
  table-layout: fixed;
  border-spacing: 0 0.6rem;
  border-color: transparent;
  overflow-x: auto;
  padding: 0.4rem;
}

.movements-table__head-cell {
  padding: 0 $col-movements-table-cell-side-padding 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  font-size: 1.4rem;
  color: $col-text-secondary;
  font-weight: 400;
  width: $col-movements-table-cell-width;

  &--direction {
    padding-right: 0;
    min-width: $col-movements-table-cell-width-direction;
    width: $col-movements-table-cell-width-direction;
  }

  &--expand-btn-wrp {
    text-align: right;
    width: $col-movements-table-cell-width-expand-btn-wrp;
  }
}
</style>
