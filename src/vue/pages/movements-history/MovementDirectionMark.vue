<template>
  <i :class="classObj" />
</template>

<script>
import { Movement } from '@/js/records/entities/movement.record'

export default {
  name: 'movement-direction-mark',
  props: {
    movement: {
      type: Movement,
      required: true,
    },
  },
  computed: {
    classObj () {
      const movement = this.movement

      return {
        'mdi': true,
        'mdi-lock': movement.isLocked,
        'mdi-lock-open': movement.isUnlocked,
        'mdi-account-arrow-left': movement.isIncoming,
        'mdi-account-arrow-right': movement.isOutgoing,
        'movement-direction-mark': true,
        'movement-direction-mark--in': movement.isIncoming,
        'movement-direction-mark--out': movement.isOutgoing,
        'movement-direction-mark--locked': movement.isLocked,
        'movement-direction-mark--unlocked': movement.isUnlocked,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@scss/variables';

.movement-direction-mark {
  font-size: 1.8rem;

  &--in { color: $col-incoming; }
  &--out { color: $col-outgoing; }
  &--locked { color: $col-locked; }
  &--unlocked { color: $col-unlocked; }

  /* stylelint-disable selector-nested-pattern */

  &.mdi-account-arrow-left,
  &.mdi-account-arrow-right {
    font-size: 2.4rem;
  }

  &.mdi-lock,
  &.mdi-lock-open {
    font-size: 2.15rem;
  }
  /* stylelint-enable selector-nested-pattern */
}
</style>
