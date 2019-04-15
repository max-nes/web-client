import './scss/app.scss'

import Vue from 'vue'
import App from '@/vue/App'
import i18next from 'i18next'
import Vuelidate from 'vuelidate'
import VueResource from 'vue-resource'
import log from 'loglevel'
import config from './config'
import IdleVue from 'idle-vue'

import { extendStoreWithScheme } from '@/vuex'
import { buildRouter } from '@/vue-router'
import { tableScrollShadow } from '@/vue/directives/tableScrollShadow'
import { ripple } from '@/vue/directives/ripple'
import { i18nOptions, mergeIntoI18nOptions } from '@/i18n'
import { globalize } from '@/vue/filters/globalize'
import { formatDate } from '@/vue/filters/formatDate'
import { formatMoney } from '@/vue/filters/formatMoney'
import { formatNumber } from '@/vue/filters/formatNumber'
import { formatInteger } from '@/vue/filters/formatInteger'
import { formatPercent } from '@/vue/filters/formatPercent'
import { formatCalendar } from '@/vue/filters/formatCalendar'
import { formatDateDMY } from '@/vue/filters/formatDateDMY'
import { formatOrderNumber } from '@/vue/filters/formatOrderNumber'
import { abbreviate } from '@/vue/filters/abbreviate'
import { cropAddress } from '@/vue/filters/cropAddress'
import { SchemeRegistry } from '@/modules-arch/scheme-registry'

async function init () {
  await SchemeRegistry.useScheme(config.MODULE_SCHEME_NAME)
  Vue.use(SchemeRegistry.current)

  if (SchemeRegistry.current.importEnLocaleFile) {
    const enLocaleJson = await SchemeRegistry.current.importEnLocaleFile()
    mergeIntoI18nOptions(enLocaleJson)
  }

  i18next.init(i18nOptions)

  log.setDefaultLevel(config.LOG_LEVEL)

  Vue.config.productionTip = false
  Vue.use(Vuelidate)
  Vue.use(VueResource)
  Vue.directive('table-scroll-shadow', tableScrollShadow)
  Vue.directive('ripple', ripple)
  Vue.filter('globalize', globalize)
  Vue.filter('formatDate', formatDate)
  Vue.filter('formatDateDMY', formatDateDMY)
  Vue.filter('formatMoney', formatMoney)
  Vue.filter('formatNumber', formatNumber)
  Vue.filter('formatPercent', formatPercent)
  Vue.filter('formatInteger', formatInteger)
  Vue.filter('formatCalendar', formatCalendar)
  Vue.filter('formatOrderNumber', formatOrderNumber)
  Vue.filter('abbreviate', abbreviate)
  Vue.filter('cropAddress', cropAddress)

  const store = await extendStoreWithScheme(SchemeRegistry.current)
  const router = buildRouter(store)

  Vue.use(IdleVue, {
    eventEmitter: new Vue(),
    idleTime: config.IDLE_TIMEOUT,
  })

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>',
  })
}

init()
