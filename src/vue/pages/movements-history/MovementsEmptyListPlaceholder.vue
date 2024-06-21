<template>
  <tbody class="movements-empty-list-placeholder">
    <tr
      class="movements-empty-list-placeholder__brief
             movements-empty-list-placeholder__no-data"
    >
      <td
        colspan="5"
        class="movements-empty-list-placeholder__cell--align-center"
      >
        {{ 'movements-history.no-movements-msg' | globalize }}
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'movements-empty-list-placeholder',
}
</script>

<style scoped lang="scss">
  @import '~@scss/mixins';
  @import '~@scss/variables';

  .movements-empty-list-placeholder__brief {
    background-color: $col-block-bg;

    @include box-shadow;
  }

  .movements-empty-list-placeholder__no-data {
    height: 5.1rem;
  }

  .movements-empty-list-placeholder__cell--align-center {
    text-align: center;
    color: $col-text;
  }
</style>
