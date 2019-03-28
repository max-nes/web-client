import { PageModuleDescriptor } from '@/modules-arch/page-module-descriptor'
import { AssetExplorerPageModule } from './asset-explorer-page'
import { BalancesPageModule } from './balances-page'

export class AssetsPageModule extends PageModuleDescriptor {
  constructor (opts = {}) {
    super({
      ...opts,
      importComponentFn: _ => import('@/vue/pages/Assets'),
      allowedSubmodules: [
        AssetExplorerPageModule,
        BalancesPageModule,
      ],
    })
  }
}
