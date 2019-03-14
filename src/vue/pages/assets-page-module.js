import { PageModuleDescriptor } from '@/modules-arch/page-module-descriptor'

export class AssetsPageModule extends PageModuleDescriptor {
  constructor (opts = {}) {
    super({
      ...opts,
      importComponentFn: _ => import('@/vue/pages/Assets'),
    })
  }
}
