<template>
  <tbody class="movements-skeleton-loader">
    <tr
      class="movements-skeleton-loader__brief
             movements-skeleton-loader__no-data"
    >
      <td
        v-for="item in cells"
        :key="item"
        class="movements-skeleton-loader__cell"
      >
        <skeleton-loader
          :template="getTemplateNameSkeletonLoader(item)"
        />
      </td>
    </tr>
  </tbody>
</template>

<script>
import SkeletonLoader from '@/vue/common/skeleton-loader/SkeletonLoader'

export default {
  name: 'movements-skeleton-loader',
  components: {
    SkeletonLoader,
  },
  data: _ => ({
    cells: 5,
  }),
  methods: {
    getTemplateNameSkeletonLoader (item) {
      return (item === this.cells)
        ? 'smallIcon'
        : 'bigString'
    },
  },
}
</script>

<style scoped lang="scss">
@import '~@scss/mixins';
@import '~@scss/variables';

.movements-skeleton-loader__cell {
  padding: 0.7rem 1.5rem;

  &:last-child {
    display: flex;
    justify-content: flex-end;
  }
}

.movements-skeleton-loader__brief {
  background-color: $col-block-bg;

  @include box-shadow;
}

.movements-skeleton-loader__no-data {
  height: 5.1rem;
}
</style>
