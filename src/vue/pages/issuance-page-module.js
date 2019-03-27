import { PageModuleDescriptor } from '@/modules-arch/page-module-descriptor'
import { IssuanceExplorerModule } from '@/vue/modules/issuance-explorer/module'
import { IssuanceDrawerPseudoModule } from '@/modules-arch/pseudo-modules/issuance-drawer-pseudo-module'
import { PreIssuanceDrawerPseudoModule } from '@/modules-arch/pseudo-modules/pre-issuance-drawer-pseudo-module'

export class IssuancePageModule extends PageModuleDescriptor {
  constructor (opts = {}) {
    super({
      ...opts,
      importComponentFn: _ => import('@/vue/pages/Issuance'),
      allowedSubmodules: [
        IssuanceExplorerModule,
        IssuanceDrawerPseudoModule,
        PreIssuanceDrawerPseudoModule,
      ],
    })
  }
}
