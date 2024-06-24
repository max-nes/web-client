<template>
  <div class="personal-section">
    <h4 class="personal-section__title">
      {{ 'general-form.personal-details-lbl' | globalize }}
    </h4>

    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          white-autofill
          v-model="firstName"
          @change="former.setAttr('firstName', firstName)"
          @blur="touchField('firstName')"
          name="verification-general-first-name"
          :label="'general-form.first-name-lbl' | globalize"
          :error-message="getFieldErrorMessage('firstName')"
          :disabled="isDisabled"
        />
      </div>
      <div class="app__form-field">
        <input-field
          white-autofill
          v-model="lastName"
          @change="former.setAttr('lastName', lastName)"
          @blur="touchField('lastName')"
          name="verification-general-last-name"
          :label="'general-form.last-name-lbl' | globalize"
          :error-message="getFieldErrorMessage('lastName')"
          :disabled="isDisabled"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <date-field
          v-model="dateOfBirth"
          @input="touchField('dateOfBirth');
                  former.setAttr('dateOfBirth', dateOfBirth)"
          name="verification-general-date-of-birth"
          :enable-time="false"
          allow-input
          :placeholder="'general-form.date-of-birth-placeholder' | globalize"
          :disable-after="new Date().toISOString()"
          :label="'general-form.date-of-birth-lbl' | globalize"
          :error-message="getFieldErrorMessage('dateOfBirth')"
          :disabled="isDisabled"
        />
      </div>
      <div class="app__form-field">
        <amount-input-field
          white-autofill
          v-model="age"
          :min="18"
          :max="120"
          :step="1"
          @change="former.setAttr('age', age)"
          @blur="touchField('age')"
          name="verefication-general-age"
          :asset="age"
          :label="'general-form.age-lbl' | globalize"
          :error-message="getFieldErrorMessage('age')"
          :disabled="isDisabled"
        />
      </div>
    </div>
  </div>
</template>

<script>
import formMixin from '@/vue/mixins/form.mixin'
import { required } from '@validators'
import { KycGeneralFormer } from '@/js/formers/KycGeneralFormer'
import InputField from '@/vue/fields/InputField.vue'

export default {
  name: 'personal-section',
  components: { InputField },

  mixins: [formMixin],

  props: {
    former: {
      type: KycGeneralFormer,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: true,
    },
  },

  data () {
    return {
      firstName: this.former.attrs.firstName || '',
      lastName: this.former.attrs.lastName || '',
      dateOfBirth: this.former.attrs.dateOfBirth || '',
      age: this.former.attrs.age || '',
    }
  },

  validations () {
    return {
      firstName: { required },
      lastName: { required },
      dateOfBirth: { required },
      age: { required },
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/vue/forms/_app-form';
</style>
