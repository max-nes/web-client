<template>
  <div class="app-form limits-form">
    <div class="app__form-row">
      <div class="app__form-field">
        <select-field
          name="limits-op-type"
          v-model="statsOpType"
          :label="'limits-form.operation-type' | globalize"
          :key="`limits-asset-selector-${statsOpType}`"
          @change="former.setAttr('statsOpType', statsOpType)"
          class="limits__assets-select app__select-with-label--no-border"
        >
          <option
            v-for="type in FORMATTED_STATS_OPERATION_TYPES"
            :key="type.value"
            :value="type.value"
          >
            {{ type.label | globalize }}
          </option>
        </select-field>
      </div>
    </div>
    <div class="limits-form__table app__table">
      <table class="app__table">
        <thead>
          <tr>
            <th>
              {{ 'limits-form.type-lbl' | globalize }}
            </th>
            <th>
              {{ 'limits-form.limit-lbl' | globalize }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ 'limits-form.daily-limit-lbl' | globalize }}</td>
            <td>
              {{
                getLimitByScope('dailyOut') ||
                  'limits-form.not-set-lbl' | globalize
              }}
            </td>
          </tr>
          <tr>
            <td>{{ 'limits-form.weekly-limit-lbl' | globalize }}</td>
            <!-- eslint-disable-next-line -->
            <td>
              {{
                getLimitByScope('weeklyOut') ||
                  'limits-form.not-set-lbl' | globalize
              }}
            </td>
          </tr>
          <tr>
            <td>{{ 'limits-form.monthly-limit-lbl' | globalize }}</td>
            <!-- eslint-disable-next-line -->
            <td>
              {{
                getLimitByScope('monthlyOut') ||
                  'limits-form.not-set-lbl' | globalize
              }}
            </td>
          </tr>
          <tr>
            <td>{{ 'limits-form.annual-limit-lbl' | globalize }}</td>
            <!-- eslint-disable-next-line -->
            <td>
              {{
                getLimitByScope('annualOut') ||
                  'limits-form.not-set-lbl' | globalize
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <limits-update-form
      :former="former"
      @limits-changed="limitsChanged"
      :key="statsOpType" />
  </div>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'
import { LimitsFormer } from '@/js/formers/LimitsFormer'
import { STATS_OPERATION_TYPES } from '@tokend/js-sdk'
import config from '@/config'
import LimitsUpdateForm from './LimitsUpdateForm.vue'

const STATS_OPERATION_TYPES_KEY_NAMES = {
  [STATS_OPERATION_TYPES.deposit]: 'deposit',
  [STATS_OPERATION_TYPES.withdraw]: 'withdraw',
  [STATS_OPERATION_TYPES.paymentOut]: 'payment',
}

/**
 * This is an array with formatted actual STATS_OPERATION_TYPES that allows
 * <select-field> to work right.
*/
const FORMATTED_STATS_OPERATION_TYPES = [
  {
    value: STATS_OPERATION_TYPES.deposit,
    label: 'limits-form.op-type-deposit',
  },
  {
    value: STATS_OPERATION_TYPES.withdraw,
    label: 'limits-form.op-type-withdraw',
  },
  {
    value: STATS_OPERATION_TYPES.paymentOut,
    label: 'limits-form.op-type-payment-out',
  },
]

const EVENTS = {
  limitsChanged: 'limits-changed',
}

const MAX_VALID_LIMIT_VALUE = config.MAX_AMOUNT

export default {
  name: 'limits-form',
  components: {
    LimitsUpdateForm,
  },
  mixins: [FormMixin],
  props: {
    limits: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    former: {
      type: LimitsFormer,
      default: () => new LimitsFormer(),
    },
  },
  data: () => ({
    statsOpType: FORMATTED_STATS_OPERATION_TYPES[0].value,
    FORMATTED_STATS_OPERATION_TYPES,
    STATS_OPERATION_TYPES_KEY_NAMES,
    config,
  }),
  computed: {
    selectedOpType () {
      return this.limits[STATS_OPERATION_TYPES_KEY_NAMES[this.statsOpType]]
    },
  },

  watch: {
    'statsOpType' () {
      this.former.populate(this.selectedOpType)
      this.former.setAttr('operationType',
        STATS_OPERATION_TYPES_KEY_NAMES[this.statsOpType])
    },
  },

  created () {
    this.former.populate(this.selectedOpType)
    this.former.setAttr('operationType',
      STATS_OPERATION_TYPES_KEY_NAMES[this.statsOpType])
  },

  methods: {
    getLimitByScope (period) {
      const limitByType = this.selectedOpType
      switch (period) {
        case 'dailyOut':
          if (limitByType.dailyOut === MAX_VALID_LIMIT_VALUE) {
            return ''
          }
          return limitByType.dailyOut
        case 'weeklyOut':
          if (limitByType.weeklyOut === MAX_VALID_LIMIT_VALUE) {
            return ''
          }
          return limitByType.weeklyOut
        case 'monthlyOut':
          if (limitByType.monthlyOut === MAX_VALID_LIMIT_VALUE) {
            return ''
          }
          return limitByType.monthlyOut
        case 'annualOut':
          if (limitByType.annualOut === MAX_VALID_LIMIT_VALUE) {
            return ''
          }
          return limitByType.annualOut
      }
    },

    limitsChanged () {
      this.$emit(EVENTS.limitsChanged)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './app-form';

.limits__assets-select {
  min-width: 11rem;
}
</style>
