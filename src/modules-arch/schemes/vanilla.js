import { vueRoutes } from '@/vue-router/routes'

import { MovementsHistoryModule } from '@modules/movements-history/module'
import { MovementsHistoryPageModule } from '@/vue/pages/movements-page-module'
import { DashboardPageModule } from '@/vue/pages/dashboard-page-module'
import { FeesPageModule } from '@/vue/pages/fees-page-module'
import { FeesModule } from '@modules/fees/module'
import { IssuancePageModule } from '@/vue/pages/issuance-page-module'
import { IssuanceExplorerModule } from '@modules/issuance-explorer/module'
import { TradePageModule } from '@/vue/pages/trade-page-module'
import { LimitsPageModule } from '@/vue/pages/limits-page-module'
import { AssetsPageModule } from '@/vue/pages/assets-page-module'
import { CreateAssetFormModule } from '@modules/create-asset-form/module'
import { SalesPageModule } from '@/vue/pages/sales-page-module'
import { SaleDetailsPageModule } from '@/vue/pages/sale-details-page-module'
import { RequestsPageModule } from '@/vue/pages/requests-page-module'
import { SettingsPageModule } from '@/vue/pages/settings-page-module'
import { AssetCreationRequestsPageModule } from '@/vue/pages/asset-creation-requests-page'
import { SaleCreationRequestsPageModule } from '@/vue/pages/sale-creation-requests-page'
import { PreIssuanceRequestsPageModule } from '@/vue/pages/pre-issuance-requests-page'
import { IncomingWithdrawalRequestsPageModule } from '@/vue/pages/incoming-withdrawal-requests-page'
import { VerificationPageModule } from '@/vue/pages/verification-page-module'
import { VerificationGeneralPageModule } from '@/vue/pages/verification-general-page-module'
import { VerificationCorporatePageModule } from '@/vue/pages/verification-corporate-page-module'
import { SecurityPageModule } from '@/vue/pages/security-page-module'
import { ShowAccountIdPseudoModule } from '@/modules-arch/pseudo-modules/show-account-id-pseudo-module'
import { ChangePasswordPseudoModule } from '@/modules-arch/pseudo-modules/change-password-pseudo-module'
import { ShowSeedPseudoModule } from '@/modules-arch/pseudo-modules/show-seed-pseudo-module'
import { IssuanceDrawerPseudoModule } from '@/modules-arch/pseudo-modules/issuance-drawer-pseudo-module'
import { PreIssuanceDrawerPseudoModule } from '@/modules-arch/pseudo-modules/pre-issuance-drawer-pseudo-module'
import { TransferDrawerPseudoModule } from '@/modules-arch/pseudo-modules/transfer-drawer-pseudo-module'
import { CreateSalePseudoModule } from '@/modules-arch/pseudo-modules/create-sale-pseudo-module'
import { DashboardChartPseudoModule } from '@/modules-arch/pseudo-modules/dashboard-chart-pseudo-module'
import { SalesListPageModule } from '@/vue/pages/sales/all-sales-page-module'
import { SalesListOwnedPageModule } from '@/vue/pages/sales/user-owned-sales-page-module'
import { SaleCampaignViewerPageModule } from '@/vue/pages/sale-details/sale-campaign-viewer-page-module'
import { SaleStateWidgetModule } from '@/vue/pages/sale-details/sale-sate-widget-module'
import { CoinpaymentsDepositModule } from '@/vue/modules/coinpayments-deposit/module'
import { MovementsTopBarModule } from '@modules/movements-top-bar/module'
import { WithdrawalDrawerPseudoModule } from '@/modules-arch/pseudo-modules/withdrawal-drawer-pseudo-module'
import { DepositFormPseudoModule } from '@/modules-arch/pseudo-modules/deposit-form-pseudo-module'
import { AssetExplorerPageModule } from '@/vue/pages/asset-explorer-page'
import { BalancesPageModule } from '@/vue/pages/balances-page'
import { AssetExplorerModule } from '@/vue/modules/assets/asset-explorer/module'
import { BalanceExplorerModule } from '@/vue/modules/assets/balance-explorer/module'

export default {
  pages: [
    new DashboardPageModule(
      {
        routerEntry: {
          path: '/dashboard',
          name: vueRoutes.dashboard.name,
          meta: { pageNameTranslationId: 'pages-names.dashboard' },
        },
        menuButtonTranslationId: 'pages-names.dashboard',
        menuButtonMdiName: 'view-dashboard',
        submodules: [
          new MovementsHistoryModule(),
          new IssuanceDrawerPseudoModule({
            isCorporateOnly: true,
          }),
          new TransferDrawerPseudoModule(),
          new DashboardChartPseudoModule(),
        ],
      },
    ),

    new MovementsHistoryPageModule(
      {
        routerEntry: {
          path: '/movements',
          name: vueRoutes.movements.name,
          meta: { pageNameTranslationId: 'pages-names.movements' },
        },
        menuButtonTranslationId: 'pages-names.movements',
        menuButtonMdiName: 'menu',
        submodules: [
          new MovementsHistoryModule(),
          new MovementsTopBarModule({
            submodules: [
              new WithdrawalDrawerPseudoModule(),
              new DepositFormPseudoModule({
                submodules: [new CoinpaymentsDepositModule()],
              }),
              new TransferDrawerPseudoModule(),
            ],
          }),
        ],
      },
    ),

    new TradePageModule(
      {
        routerEntry: {
          path: '/trade',
          name: vueRoutes.trade.name,
          meta: { pageNameTranslationId: 'pages-names.trade' },
          redirect: vueRoutes.tradeExchange,
          children: [
            // Carefully: have some issues because of is-loading prop provided
            // to children from parent component. Leave it lke that for now
            {
              path: '/trade/exchange',
              name: vueRoutes.tradeExchange.name,
              component: _ => import('@/vue/pages/TradeExchange'),
            },
            {
              path: '/trade/my-orders',
              name: vueRoutes.tradeUserOffers.name,
              component: _ => import('@/vue/pages/TradeUserOffers'),
            },
          ],
        },
        menuButtonTranslationId: 'pages-names.trade',
        menuButtonMdiName: 'finance',
      },
    ),

    new LimitsPageModule(
      {
        routerEntry: {
          path: '/limits',
          name: vueRoutes.limits.name,
          meta: { pageNameTranslationId: 'pages-names.limits' },
        },
        menuButtonTranslationId: 'pages-names.limits',
        menuButtonMdiName: 'poll-box',
      },
    ),

    new AssetsPageModule(
      {
        routerEntry: {
          path: '/tokens',
          name: vueRoutes.assets.name,
        },
        menuButtonTranslationId: 'pages-names.tokens',
        menuButtonMdiName: 'coins',
        isAutoRedirectToFirstChild: true,
        submodules: [
          new AssetExplorerPageModule({
            routerEntry: {
              path: '/tokens/explore',
              name: vueRoutes.assetsExplore.name,
              meta: { pageNameTranslationId: 'pages-names.tokens' },
            },
            submodules: [
              new AssetExplorerModule(),
            ],
          }),
          new BalancesPageModule({
            routerEntry: {
              path: '/tokens/balances',
              name: vueRoutes.balances.name,
              meta: { pageNameTranslationId: 'pages-names.tokens' },
            },
            submodules: [
              new BalanceExplorerModule(),
            ],
          }),
          new CreateAssetFormModule({
            isCorporateOnly: true,
          }),
        ],
      },
    ),

    new IssuancePageModule(
      {
        routerEntry: {
          path: '/issuance',
          name: vueRoutes.issuance.name,
          meta: { pageNameTranslationId: 'pages-names.issuance' },
        },
        menuButtonTranslationId: 'pages-names.issuance',
        menuButtonMdiName: 'poll',
        submodules: [
          new IssuanceExplorerModule(),
          new IssuanceDrawerPseudoModule({
            isCorporateOnly: true,
          }),
          new PreIssuanceDrawerPseudoModule({
            isCorporateOnly: true,
          }),
        ],
      },
    ),

    new SalesPageModule(
      {
        routerEntry: {
          path: '/funds',
          name: vueRoutes.sales.name,
          meta: { pageNameTranslationId: 'pages-names.funds' },
        },
        menuButtonTranslationId: 'pages-names.funds',
        menuButtonMdiName: 'trending-up',
        isAutoRedirectToFirstChild: true,
        submodules: [
          new SalesListPageModule({
            routerEntry: {
              path: '/funds/all',
              name: vueRoutes.allSales.name,
              props: {
                default: true,
                isUserSales: false,
              },
            },
          }),
          new SalesListOwnedPageModule({
            routerEntry: {
              path: '/funds/my',
              name: vueRoutes.userOwnedSales.name,
              props: {
                default: true,
                isUserSales: true,
              },
            },
          }),
          new CreateSalePseudoModule({
            isCorporateOnly: true,
          }),
        ],
      },
    ),

    new SaleDetailsPageModule(
      {
        routerEntry: {
          path: '/funds/:id',
          name: vueRoutes.saleDetails.name,
          meta: { pageNameTranslationId: 'pages-names.fund-details' },
          redirect: to => ({ ...vueRoutes.saleCampaign, params: to.params }),
          props: true,
        },
        submodules: [
          new SaleCampaignViewerPageModule({
            routerEntry: {
              path: '/funds/:id/campaign',
              name: vueRoutes.saleCampaign.name,
              props: true,
            },
            submodules: [
              new SaleStateWidgetModule({
                submodules: [
                  new DashboardChartPseudoModule(),
                ],
              }),
            ],
          }),
        ],
      },
    ),

    new RequestsPageModule(
      {
        routerEntry: {
          path: '/requests',
          name: vueRoutes.requests.name,
          meta: { pageNameTranslationId: 'pages-names.requests' },
        },
        isCorporateOnly: true,
        menuButtonTranslationId: 'pages-names.requests',
        menuButtonMdiName: 'book-open-variant',
        isAutoRedirectToFirstChild: true,
        submodules: [
          new AssetCreationRequestsPageModule({
            routerEntry: {
              path: '/requests/token-creation',
              name: vueRoutes.assetCreationRequests.name,
            },
            isCorporateOnly: true,
          }),
          new SaleCreationRequestsPageModule({
            routerEntry: {
              path: '/requests/fund-creation',
              name: vueRoutes.saleCreationRequests.name,
            },
            isCorporateOnly: true,
          }),
          new PreIssuanceRequestsPageModule({
            routerEntry: {
              path: '/requests/pre-issuance-upload',
              name: vueRoutes.preIssuanceUploadRequests.name,
            },
            isCorporateOnly: true,
          }),
          new IncomingWithdrawalRequestsPageModule({
            routerEntry: {
              path: '/requests/incoming-withdrawal',
              name: vueRoutes.incomingWithdrawalRequests.name,
            },
          }),
        ],
      },
    ),

    new SettingsPageModule(
      {
        routerEntry: {
          path: '/settings',
          name: vueRoutes.settings.name,
          meta: { pageNameTranslationId: 'pages-names.settings' },
        },
        menuButtonTranslationId: 'pages-names.settings',
        menuButtonMdiName: 'account-settings',
        menuSectionTranslationId: 'sidebar.section-account',
        isAutoRedirectToFirstChild: true,
        submodules: [
          new VerificationPageModule({
            routerEntry: {
              path: '/settings/verification',
              name: vueRoutes.verification.name,
            },
            submodules: [
              new VerificationGeneralPageModule({
                routerEntry: {
                  path: '/settings/verification/general',
                  name: vueRoutes.verificationGeneral.name,
                },
              }),
              new VerificationCorporatePageModule({
                routerEntry: {
                  path: '/settings/verification/corporate',
                  name: vueRoutes.verificationCorporate.name,
                },
              }),
            ],
          }),

          new SecurityPageModule({
            routerEntry: {
              path: '/settings/security',
              name: vueRoutes.security.name,
            },
            submodules: [
              new ChangePasswordPseudoModule(),
              new ShowAccountIdPseudoModule(),
              new ShowSeedPseudoModule(),
            ],
          }),
        ],
      }
    ),

    new FeesPageModule(
      {
        routerEntry: {
          path: '/fees',
          name: vueRoutes.fees.name,
          meta: { pageNameTranslationId: 'pages-names.fees' },
        },
        menuButtonTranslationId: 'pages-names.fees',
        menuButtonMdiName: 'flash',
        submodules: [
          new FeesModule(),
        ],
      },
    ),
  ],
}
