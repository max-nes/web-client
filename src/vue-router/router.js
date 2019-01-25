import Vue from 'vue'
import Router from 'vue-router'

import {
  store,
  vuexTypes,
} from '@/vuex'
import config from '@/config'

import { resolveRedirect } from '@/vue-router/redirect'
import { vueRoutes } from '@/vue-router/routes'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: vueRoutes.app,
    },
    {
      path: '/r/*',
      name: 'horizon-redirect',
      beforeEnter: resolveRedirect,
    },
    {
      path: '/auth',
      name: vueRoutes.auth.name,
      redirect: vueRoutes.login,
      component: resolve => require(['@/vue/pages/Auth'], resolve),
      children: [
        {
          path: '/log-in',
          name: vueRoutes.login.name,
          component: resolve => require(['@/vue/pages/Login'], resolve),
          beforeEnter: authPageGuard,
        },
        {
          path: '/sign-up',
          name: vueRoutes.signup.name,
          component: resolve => require(['@/vue/pages/Signup'], resolve),
          beforeEnter: authPageGuard,
        },
        {
          path: '/verify/:paramsBase64',
          name: vueRoutes.verify.name,
          component: resolve => require(['@/vue/pages/Verify'], resolve),
          beforeEnter: authPageGuard,
          props: true,
        },
        {
          path: '/recovery',
          name: vueRoutes.recovery.name,
          component: resolve => require(['@/vue/pages/Recovery'], resolve),
          beforeEnter: authPageGuard,
        },
      ],
    },
    {
      path: '/',
      name: 'app',
      component: resolve => require(['@/vue/AppContent'], resolve),
      beforeEnter: inAppRouteGuard,
      redirect: vueRoutes.dashboard,
      children: [
        {
          path: '/dashboard',
          name: vueRoutes.dashboard.name,
          meta: {
            pageNameTranslationId: 'pages-names.dashboard',
            // necessary for correct disabling sidebar links
            rootPageRouteName: vueRoutes.dashboard.name,
          },
          component: resolve => require(['@/vue/pages/Dashboard'], resolve),
        },
        {
          path: '/fees',
          name: vueRoutes.fees.name,
          meta: {
            pageNameTranslationId: 'pages-names.fees',
            // necessary for correct disabling sidebar links
            rootPageRouteName: vueRoutes.fees.name,
          },
          featureFlag: config.FEATURE_FLAGS.fees,
          component: resolve => require(['@/vue/pages/Fees'], resolve),
        },
        {
          path: '/trade',
          name: vueRoutes.trade.name,
          meta: {
            pageNameTranslationId: 'pages-names.trade',
            // necessary for correct disabling sidebar links
            rootPageRouteName: vueRoutes.trade.name,
          },
          component: resolve => require(['@/vue/pages/Trade'], resolve),
          redirect: vueRoutes.trade.exchange,
          children: [
            {
              path: '/trade/exchange',
              name: vueRoutes.trade.exchange.name,
              meta: {
                pageNameTranslationId: 'pages-names.trade',
                pageSubnameTranslationId: 'pages-subnames.exchange-tokens',
                // necessary for correct disabling sidebar links
                rootPageRouteName: vueRoutes.trade.name,
              },
              component: resolve => require(['@/vue/pages/TradeExchange'], resolve),
            },
            {
              path: '/trade/my-orders',
              name: vueRoutes.trade.userOrders.name,
              meta: {
                pageNameTranslationId: 'pages-names.trade',
                pageSubnameTranslationId: 'pages-subnames.user-orders',
                // necessary for correct disabling sidebar links
                rootPageRouteName: vueRoutes.trade.name,
              },
              component: resolve => require(['@/vue/pages/TradeUserOrders'], resolve),
            },
          ],
        },
        {
          path: '/issuance',
          name: vueRoutes.issuance.name,
          featureFlag: config.FEATURE_FLAGS.issuance,
          meta: {
            pageNameTranslationId: 'pages-names.issuance',
            // necessary for correct disabling sidebar links
            rootPageRouteName: vueRoutes.issuance.name,
          },
          component: resolve => require(['@/vue/pages/Issuance'], resolve),
        },
      ].filter(route => route.featureFlag !== false),
    },
  ],
  scrollBehavior: _ => ({ x: 0, y: 0 }),
})

// doesn't allow to visit auth page if user is already logged in
function authPageGuard (to, from, next) {
  const isLoggedIn = store.getters[vuexTypes.isLoggedIn]

  isLoggedIn
    ? next(vueRoutes.app)
    : next()
}

// doesn't allow to visit in-app page if user is not already logged in
function inAppRouteGuard (to, from, next) {
  const isLoggedIn = store.getters[vuexTypes.isLoggedIn]

  isLoggedIn
    ? next()
    : next(vueRoutes.login)
}
