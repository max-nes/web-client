// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in base.conf with an alias.

import Vue from 'vue'
import App from '../legacy/vue/root/App'
import '../legacy/scss/app.scss'
import './scss/app.scss'

// vue default plugins
import router from '../legacy/vue-router'
import store from '../legacy/vuex'

// vue http-client
import VueResource from 'vue-resource'

// vue-markdown-editor
import VueSimpleMDE from 'vue-simplemde'

// vue-material design plugin
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

// validator:
import VeeValidate from 'vee-validate'
import { extendValidator } from '../legacy/validator/validator'

// directives
import tableScrollShadow from '../legacy/directives/tableScrollShadow'
import rippleEffect from '../legacy/directives/rippleEffect'

// i18n
import i18next from 'i18next'
import { i18nOptions } from '@/i18n'

// filters
import { formatDate } from '@/vue/filters/formatDate'
import { formatCalendar } from '@/vue/filters/formatCalendar'
import { formatMoney } from '@/vue/filters/formatMoney'
import { formatNumber } from '@/vue/filters/formatNumber'
import { formatOrderNumber } from '@/vue/filters/formatOrderNumber'
import { formatInteger } from '@/vue/filters/formatInteger'
import { globalize } from '@/vue/filters/globalize'

// legacy filters
import { translate } from 'L@/vue/common/filters/translate'
import { localizeFeeType } from '../legacy/vue/common/filters/localizeFeeType'
import { localizeFeeSubType } from '../legacy/vue/common/filters/localizeFeeSubType'

// ripple effects:
rippleEffect.color = 'rgba(58, 65, 128, .2)'

i18next.init(i18nOptions)

Vue.directive('table-scroll-shadow', tableScrollShadow)
Vue.directive('ripple', rippleEffect)

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(VueMaterial)
Vue.use(VueSimpleMDE)

VeeValidate.Validator = extendValidator(VeeValidate.Validator)

/* Vue filters */
Vue.filter('translate', translate)
Vue.filter('globalize', globalize)
Vue.filter('formatDate', formatDate)
Vue.filter('formatMoney', formatMoney)
Vue.filter('formatNumber', formatNumber)
Vue.filter('formatCalendar', formatCalendar)
Vue.filter('formatOrderNumber', formatOrderNumber)
Vue.filter('formatInteger', formatInteger)
Vue.filter('localizeFeeType', localizeFeeType)
Vue.filter('localizeFeeSubType', localizeFeeSubType)
Vue.filter('formatDate', formatDate)
Vue.filter('formatMoney', formatMoney)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
