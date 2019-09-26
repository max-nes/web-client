import { PageModuleDescriptor } from '@/modules-arch/page-module-descriptor'
import { MovementsTopBarModule } from '@modules/movements-top-bar/module'

export class MovementsHistoryPageModule extends PageModuleDescriptor {
  constructor (opts = {}) {
    super({
      ...opts,
      importComponentFn: _ => import('@/vue/pages/Movements'),
      allowedSubmodules: [
        MovementsTopBarModule,
      ],
    })
  }
}
