<template>
  <tbody class="movements-table-row">
    <tr class="movements-table-row__brief">
      <td
        class="movements-table-row__cell
               movements-table-row__cell--bold
               movements-table-row__cell--iconed"
        :title="movement.effect | effectTypeTranslationId | globalize"
      >
        <movement-direction-mark :movement="movement" />
        {{ movement.effect | effectTypeTranslationId | globalize }}
      </td>
      <td
        class="movements-table-row__cell"
        :title="movement.operationDetails
          | operationTypeTranslationId
          | globalize
        "
      >
        {{ movement.operationDetails | operationTypeTranslationId | globalize }}
      </td>
      <td
        class="movements-table-row__cell"
        :title="movement.appliedAt | formatCalendar"
      >
        {{ movement.appliedAt | formatCalendar }}
      </td>
      <td
        class="movements-table-row__cell"
        :title="movement | movementAmount | formatMoney"
      >
        {{ movement | movementAmount | formatMoney }}
      </td>

      <td
        class="movements-table-row__cell
               movements-table-row__cell--expand-btn-wrp"
      >
        <button
          class="movements-table-row__btn"
          @click="isAttributesViewerShown = !isAttributesViewerShown"
        >
          <i
            class="mdi mdi-chevron-down movements-table-row__toggle-icon"
            :class="{ 'mdi-rotate-180': isAttributesViewerShown }"
          />
        </button>
      </td>
    </tr>

    <tr
      v-if="isAttributesViewerShown"
      class="movements-table-row__attributes"
    >
      <td colspan="5">
        <div class="movements-table-row__attributes-viewer-wrp">
          <movement-attributes-viewer :movement="movement" />
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import { Movement } from '@/js/records/entities/movement.record'

import TranslationFiltersMixin from '@/vue/mixins/movements-translation-filters.mixin'

import MovementAttributesViewer from './MovementAttributesViewer'
import MovementDirectionMark from './MovementDirectionMark'
import { MathUtil } from '@/js/utils'

export default {
  name: 'movement-table-row',
  components: {
    MovementAttributesViewer,
    MovementDirectionMark,
  },
  filters: {
    movementAmount (movement) {
      let currency = movement.assetCode
      let value
      const fee = MathUtil.add(
        movement.effect.calculatedPercentFee,
        movement.effect.fixedFee
      )
      if (movement.isIncoming) {
        value = MathUtil.subtract(movement.effect.amount, fee)
      }
      if (movement.isUnlocked) {
        value = MathUtil.add(movement.effect.amount, fee)
      }
      if (movement.isOutgoing || movement.isLocked) {
        value = -MathUtil.add(movement.effect.amount, fee)
      }

      return { currency, value }
    },
  },
  mixins: [TranslationFiltersMixin],

  props: {
    movement: { type: Movement, required: true },
  },

  data: () => ({
    isAttributesViewerShown: false,
  }),
}
</script>

<style lang="scss">
@import '~@scss/mixins';
@import '~@scss/variables';

.movements-table-row__brief {
  background-color: $col-block-bg;

  @include box-shadow;
}

.movements-table-row__cell {
  padding: 0.7rem $col-movements-table-cell-side-padding;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: none;
  color: $col-text;

  &--bold {
    font-weight: 600;
  }

  &--iconed {
    position: relative;
    padding-left: $col-movements-table-cell-side-padding + 3rem;

    /* stylelint-disable selector-nested-pattern */
    i {
      left: $col-movements-table-cell-side-padding + 1rem;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    /* stylelint-enable selector-nested-pattern */
  }

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

.movements-table-row__btn {
  width: 3.7rem;
  height: 3.7rem;
  border-radius: 0.4rem;
  background-color: $col-app-content-background;
  outline: none;
  border: 0;
  box-shadow: none;

  &:hover {
    background-color: $col-movements-table-row-btn-hover-bg;
  }

  &:active {
    background-color: $col-movements-table-row-btn-active-bg;
  }
}

.movements-table-row__toggle-icon {
  font-size: 1.6rem;

  &:before {
    transition: transform 0.2s ease-out;
  }
}

.movements-table-row__attributes-viewer-wrp {
  background: $col-block-bg;
  padding:
    0.75rem $col-movements-table-cell-width-expand-btn-wrp
    0.7rem $col-movements-table-cell-side-padding;
  margin-top: -0.6rem;
  position: relative;

  @include box-shadow();

  &:before {
    // HACK: to cover sticking out shadow at the top
    content: '';
    display: block;
    position: absolute;
    background: $col-block-bg;
    height: 1rem;
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(-50%);
  }
}
</style>
