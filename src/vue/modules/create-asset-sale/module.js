import { ModuleDescriptor } from '@/modules-arch/module-descriptor'
import { CreateSalePseudoModule } from '@/modules-arch/pseudo-modules/create-sale-pseudo-module'

export class CreateAssetSaleModule extends ModuleDescriptor {
  constructor (opts = {}) {
    super({
      importComponentFn: _ => import('@/vue/modules/create-asset-sale'),
      importStoreFn: async _ => {
        const { createAssetSaleModule } = await import(
          '@/vue/modules/create-asset-sale/store'
        )
        return createAssetSaleModule
      },
      incompatibles: [
        CreateSalePseudoModule,
      ],
      ...opts,
    })
  }
}
