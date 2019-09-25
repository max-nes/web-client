import { vueRoutes } from '@/vue-router/routes'

import { MovementsHistoryModule } from '@modules/movements-history/module'
import { MovementsHistoryPageModule } from '@/vue/pages/movements-page-module'
import { CustomersPageModule } from '@/vue/pages/customers-page-module'
import { AssetsPageModule } from '@/vue/pages/assets-page-module'
import { CreateAssetFormSimplifiedModule } from '@modules/create-asset-form-simplified/module'
import { SettingsPageModule } from '@/vue/pages/settings-page-module'
import { VerificationCorporatePageModule } from '@/vue/pages/verification-corporate-page-module'
import { VerificationGeneralPageModule } from '@/vue/pages/verification-general-page-module'
import { VerificationPageModule } from '@/vue/pages/verification-page-module'
import { SecurityPageModule } from '@/vue/pages/security-page-module'
import { ShowAccountIdPseudoModule } from '@/modules-arch/pseudo-modules/show-account-id-pseudo-module'
import { ChangePasswordPseudoModule } from '@/modules-arch/pseudo-modules/change-password-pseudo-module'
import { PhoneNumberFormPseudoModule } from '@/modules-arch/pseudo-modules/phone-number-form-pseudo-module'
import { TelegramFormPseudoModule } from '@/modules-arch/pseudo-modules/telegram-form-pseudo-module'
import { DefaultQuoteAssetPseudoModule } from '@/modules-arch/pseudo-modules/default-quote-asset-pseudo-module'
import { TransferDrawerPseudoModule } from '@/modules-arch/pseudo-modules/transfer-drawer-pseudo-module'
import { MovementsTopBarModule } from '@modules/movements-top-bar/module'
import { AssetExplorerPageModule } from '@/vue/pages/asset-explorer-page'
import { AssetExplorerModule } from '@/vue/modules/assets/asset-explorer/module'

import { CustomersListPageModule } from '@/vue/pages/customers-list-page-module'
import { BusinessesPageModule } from '@/vue/pages/businesses-page'
import { BusinessesAllPageModule } from '@/vue/pages/businesses-all-page-module'
import { BusinessesMyPageModule } from '@/vue/pages/businesses-my-page-module'
import { CurrentBusinessIndicatorModule } from '@/vue/navigation/navbar/current-business-indicator/module'
import { BusinessOwnershipModule } from '@/vue/navigation/navbar/business-ownership/module'
import { AtomicSwapsPageModule } from '@/vue/pages/atomic-swaps-page-module'
import { AtomicSwapFormModule } from '@modules/atomic-swap-form/module'
import { AtomicSwapsExplorePageModule } from '@/vue/pages/atomic-swaps/atomic-swaps-explore-page-module'
import { CreateAtomicSwapFormModule } from '@/vue/modules/create-atomic-swap-form/module'
import { SharesPageModule } from '@/vue/pages/shares-page-module'
import { SponsorshipIncomingRequestsPageModule } from '@/vue/pages/sponsorship-incoming-requests-page-module'
import { SponsorshipRequestsModule } from '@/vue/modules/requests/sponsorship-requests/module'
import { SponsorshipPageModule } from '@/vue/pages/sponsorship-page-module'
import { SponsorshipOutgoingRequestsPageModule } from '@/vue/pages/sponsorship-outgoing-requests-page-module'

export default {
  modules: [
    new CurrentBusinessIndicatorModule({
      isGeneralOnly: true,
    }),
    new BusinessOwnershipModule({
      isCorporateOnly: true,
    }),
  ],
  pages: [
    new CustomersPageModule(
      {
        routerEntry: {
          path: '/customers',
          name: vueRoutes.customers.name,
          meta: { pageNameTranslationId: 'pages-names.customers' },
        },
        menuButtonTranslationId: 'pages-names.customers',
        menuButtonMdiName: 'account',
        isAutoRedirectToFirstChild: true,
        isCorporateOnly: true,
        submodules: [
          new CustomersListPageModule({
            routerEntry: {
              path: '/customers/list',
              name: vueRoutes.customersList.name,
              meta: { pageNameTranslationId: 'pages-names.customers-list' },
            },
            isCorporateOnly: true,
            submodules: [
              new MovementsHistoryModule(),
            ],
          }),
        ],
      },
    ),

    new BusinessesPageModule(
      {
        routerEntry: {
          path: '/businesses',
          name: vueRoutes.businesses.name,
          meta: { pageNameTranslationId: 'pages-names.businesses' },
        },
        menuButtonTranslationId: 'pages-names.businesses',
        menuButtonMdiName: 'domain',
        menuSectionTranslationId: 'sidebar.section-explore',
        isAutoRedirectToFirstChild: true,
        isGeneralOnly: true,
        submodules: [
          new BusinessesMyPageModule({
            routerEntry: {
              path: '/businesses/my',
              name: vueRoutes.myBusinesses.name,
              props: true,
            },
            isGeneralOnly: true,
          }),
          new BusinessesAllPageModule({
            routerEntry: {
              path: '/businesses/all',
              name: vueRoutes.allBusinesses.name,
              props: true,
            },
            isGeneralOnly: true,
          }),
        ],
      },
    ),

    new AssetsPageModule(
      {
        routerEntry: {
          path: '/assets',
          name: vueRoutes.assets.name,
        },
        menuButtonTranslationId: 'pages-names.assets',
        menuButtonMdiName: 'coins',
        isAutoRedirectToFirstChild: true,
        isWithBusinessToBrowseOnly: true,
        submodules: [
          new AssetExplorerPageModule({
            routerEntry: {
              path: '/assets/explore',
              name: vueRoutes.assetsExplore.name,
              meta: { pageNameTranslationId: 'pages-names.assets' },
            },
            submodules: [
              new AssetExplorerModule(),
            ],
          }),
          new CreateAssetFormSimplifiedModule({
            isCorporateOnly: true,
          }),
        ],
      },
    ),

    new AtomicSwapsPageModule(
      {
        routerEntry: {
          path: '/atomic-swaps',
          name: vueRoutes.atomicSwaps.name,
          meta: { pageNameTranslationId: 'pages-names.atomic-swaps' },
        },
        menuButtonTranslationId: 'pages-names.atomic-swaps',
        menuButtonMdiName: 'swap-horizontal',
        isAutoRedirectToFirstChild: true,
        isWithBusinessToBrowseOnly: true,
        submodules: [
          new AtomicSwapsExplorePageModule({
            routerEntry: {
              path: '/atomic-swaps/explore',
              name: vueRoutes.atomicSwapsExplore.name,
              props: true,
            },
            submodules: [
              new AtomicSwapFormModule(),
            ],
          }),
          new CreateAtomicSwapFormModule({
            isCorporateOnly: true,
          }),
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
        isGeneralOnly: true,
        isWithBusinessToBrowseOnly: true,
        submodules: [
          new MovementsHistoryModule(),
          new MovementsTopBarModule({
            submodules: [
              new TransferDrawerPseudoModule(),
            ],
          }),
        ],
      },
    ),

    new SharesPageModule(
      {
        routerEntry: {
          path: '/register-of-shares',
          name: vueRoutes.registerOfShares.name,
          meta: { pageNameTranslationId: 'pages-names.register-of-shares' },
        },
        menuButtonTranslationId: 'pages-names.register-of-shares',
        menuButtonMdiName: 'book-open',
        submodules: [
          new MovementsTopBarModule(),
          new MovementsHistoryModule(),
        ],
        isCorporateOnly: true,
      },
    ),

    new SponsorshipPageModule(
      {
        routerEntry: {
          path: '/sponsorship',
          name: vueRoutes.sponsorship.name,
          meta: { pageNameTranslationId: 'pages-names.sponsorship' },
        },
        menuButtonTranslationId: 'pages-names.sponsorship',
        menuButtonMdiName: 'account-group',
        isAutoRedirectToFirstChild: true,
        isCorporateOnly: true,
        submodules: [
          new BusinessesAllPageModule({
            routerEntry: {
              path: '/sponsorship/all',
              name: vueRoutes.sponsorshipAllBusinesses.name,
              props: true,
            },
          }),
          new SponsorshipIncomingRequestsPageModule({
            routerEntry: {
              path: '/sponsorship/incoming-requests',
              name: vueRoutes.sponsorshipIncomingRequests.name,
            },
            submodules: [
              new SponsorshipRequestsModule(),
            ],
          }),
          new SponsorshipOutgoingRequestsPageModule({
            routerEntry: {
              path: '/sponsorship/outgoing-requests',
              name: vueRoutes.sponsorshipOutgoingRequests.name,
            },
            submodules: [
              new SponsorshipRequestsModule(),
            ],
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
          new SecurityPageModule({
            routerEntry: {
              path: '/settings/security',
              name: vueRoutes.security.name,
            },
            submodules: [
              new ChangePasswordPseudoModule(),
              new ShowAccountIdPseudoModule({
                isCorporateOnly: true,
              }),
              new PhoneNumberFormPseudoModule(),
              new TelegramFormPseudoModule(),
              new DefaultQuoteAssetPseudoModule({
                isCorporateOnly: true,
              }),
            ],
          }),
          new VerificationPageModule({
            routerEntry: {
              path: '/settings/verification',
              name: vueRoutes.verification.name,
            },
            submodules: [
              new VerificationCorporatePageModule({
                routerEntry: {
                  path: '/settings/verification/corporate',
                  name: vueRoutes.verificationCorporate.name,
                },
              }),
              new VerificationGeneralPageModule({
                routerEntry: {
                  path: '/settings/verification/general',
                  name: vueRoutes.verificationGeneral.name,
                },
              }),
            ],
          }),
        ],
      }
    ),
  ],
}
