import Vue from 'vue'
import Router from 'vue-router'

import { vuexTypes } from '@/vuex'
import config from '@/config'

import { resolveRedirect } from '@/vue-router/redirect'
import { vueRoutes } from '@/vue-router/routes'
import { SchemeRegistry } from '@/modules-arch/scheme-registry'

Vue.use(Router)

export function buildRouter (store) {
  return new Router({
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
        path: '/terms',
        name: vueRoutes.terms.name,
        component: resolve => require(['@/vue/pages/Terms'], resolve),
      },
      {
        path: '/downloads',
        name: vueRoutes.downloads.name,
        component: resolve => require(['@/vue/pages/Downloads'], resolve),
      },
      {
        path: '/ios-installation-guide',
        name: vueRoutes.iosInstallationGuide.name,
        component: resolve => require(['@/vue/pages/IosInstallationGuide'], resolve),
      },
      {
        path: '/auth',
        name: vueRoutes.auth.name,
        redirect: vueRoutes.login,
        component: resolve => require(['@/vue/pages/Auth'], resolve),
        children: [
          {
            path: '/sign-in',
            name: vueRoutes.login.name,
            component: resolve => require(['@/vue/pages/Login'], resolve),
            beforeEnter: buildAuthPageGuard(store),
          },
          {
            path: '/sign-up',
            name: vueRoutes.signup.name,
            component: resolve => require(['@/vue/pages/Signup'], resolve),
            beforeEnter: buildAuthPageGuard(store),
          },
          {
            path: '/verify/:paramsBase64',
            name: vueRoutes.verify.name,
            component: resolve => require(['@/vue/pages/Verify'], resolve),
            beforeEnter: buildAuthPageGuard(store),
            props: true,
          },
          {
            path: '/recovery',
            name: vueRoutes.recovery.name,
            component: resolve => require(['@/vue/pages/Recovery'], resolve),
            beforeEnter: buildAuthPageGuard(store),
          },
        ],
      },
      {
        path: '/',
        name: 'app',
        meta: { isNavigationRendered: true },
        component: resolve => require(['@/vue/AppContent'], resolve),
        beforeEnter: buildInAppRouteGuard(store),
        redirect: vueRoutes.dashboard,
        children: [
          {
            path: '/trade',
            name: vueRoutes.trade.name,
            featureFlag: config.featureFlags.trade,
            meta: { pageNameTranslationId: 'pages-names.trade' },
            component: resolve => require(['@/vue/pages/Trade'], resolve),
            redirect: vueRoutes.tradeExchange,
            children: [
              {
                path: '/trade/exchange',
                name: vueRoutes.tradeExchange.name,
                component: resolve => require(['@/vue/pages/TradeExchange'], resolve),
              },
              {
                path: '/trade/my-orders',
                name: vueRoutes.tradeUserOffers.name,
                component: resolve => require(['@/vue/pages/TradeUserOffers'], resolve),
              },
            ],
          },
          {
            path: '/funds',
            name: vueRoutes.sales.name,
            featureFlag: config.featureFlags.sales,
            meta: { pageNameTranslationId: 'pages-names.funds' },
            component: resolve => require(['@/vue/pages/Sales'], resolve),
          },
          {
            path: '/funds/:id',
            name: vueRoutes.saleDetails.name,
            featureFlag: config.featureFlags.saleDetails,
            meta: { pageNameTranslationId: 'pages-names.fund-details' },
            redirect: to => ({ ...vueRoutes.saleCampaign, params: to.params }),
            component: resolve => require(['@/vue/pages/SaleDetails'], resolve),
            props: true,
            children: [
              {
                path: '/funds/:id/campaign',
                name: vueRoutes.saleCampaign.name,
                component: resolve => require(['@/vue/pages/sale-details/SaleCampaignViewer'], resolve),
                props: true,
              },
            ],
          },
          {
            path: '/limits',
            name: vueRoutes.limits.name,
            featureFlag: config.featureFlags.limits,
            meta: {
              pageNameTranslationId: 'pages-names.limits',
            },
            component: resolve => require(['@/vue/pages/Limits'], resolve),
          },
          {
            path: '/tokens',
            name: vueRoutes.assets.name,
            featureFlag: config.featureFlags.assets,
            redirect: vueRoutes.assetsExplore,
            component: resolve => require(['@/vue/pages/Assets'], resolve),
            children: [
              {
                path: '/tokens/explore',
                name: vueRoutes.assetsExplore.name,
                meta: { pageNameTranslationId: 'pages-names.tokens' },
                component: resolve => require(['@/vue/pages/AssetsExplorer'], resolve),
              },
              {
                path: '/tokens/balances',
                name: vueRoutes.balances.name,
                meta: { pageNameTranslationId: 'pages-names.tokens' },
                component: resolve => require(['@/vue/pages/Balances'], resolve),
              },
            ],
          },
          {
            path: '/requests',
            name: vueRoutes.requests.name,
            featureFlag: config.featureFlags.requests,
            redirect: vueRoutes.assetCreationRequests,
            meta: { pageNameTranslationId: 'pages-names.requests' },
            component: resolve => require(['@/vue/pages/Requests'], resolve),
            children: [
              {
                path: '/requests/token-creation',
                name: vueRoutes.assetCreationRequests.name,
                component: resolve => require(['@/vue/pages/AssetCreationRequests'], resolve),
              },
              {
                path: '/requests/fund-creation',
                name: vueRoutes.saleCreationRequests.name,
                component: resolve => require(['@/vue/pages/SaleCreationRequests'], resolve),
              },
              {
                path: '/requests/pre-issuance-upload',
                name: vueRoutes.preIssuanceUploadRequests.name,
                component: resolve => require(['@/vue/pages/PreIssuanceRequests'], resolve),
              },
            ],
          },
          {
            path: '/settings',
            name: vueRoutes.settings.name,
            featureFlag: config.featureFlags.settings,
            meta: { pageNameTranslationId: 'pages-names.settings' },
            redirect: vueRoutes.verification,
            component: resolve => require(['@/vue/pages/Settings'], resolve),
            children: [
              {
                path: '/settings/verification',
                name: vueRoutes.verification.name,
                component: resolve => require(['@/vue/pages/Verification'], resolve),
                children: [
                  {
                    path: '/settings/verification/general',
                    name: vueRoutes.verificationGeneral.name,
                    component: resolve => require(['@/vue/forms/VerificationGeneralForm'], resolve),
                  },
                  {
                    path: '/settings/verification/corporate',
                    name: vueRoutes.verificationCorporate.name,
                    component: resolve => require(['@/vue/forms/VerificationCorporateForm'], resolve),
                  },
                ],
              },
              {
                path: '/settings/security',
                name: vueRoutes.security.name,
                component: resolve => require(['@/vue/pages/Security'], resolve),
              },
            ],
          },
          ...(
            SchemeRegistry.current.pages.map(page => page.routerEntry)
          ),
        ].filter(route => route.featureFlag !== false),
      },
    ],
    scrollBehavior: _ => ({ x: 0, y: 0 }),
  })
}

// doesn't allow to visit auth page if user is already logged in
function buildAuthPageGuard (store) {
  return function authPageGuard (to, from, next) {
    const isLoggedIn = store.getters[vuexTypes.isLoggedIn]

    isLoggedIn
      ? next(vueRoutes.app)
      : next()
  }
}

// doesn't allow to visit in-app page if user is not already logged in
function buildInAppRouteGuard (store) {
  return function inAppRouteGuard (to, from, next) {
    const isLoggedIn = store.getters[vuexTypes.isLoggedIn]

    isLoggedIn
      ? next()
      : next({
        name: vueRoutes.login.name,
        query: { redirectPath: to.fullPath },
      })
  }
}
