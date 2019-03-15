import { PageModuleDescriptor } from './page-module-descriptor'
import { SchemeRegistry } from './scheme-registry'

/**
 * Represents module set to be used by the application.
 */
export class ModuleScheme {
  /**
   * Build the scheme
   *
   * @param {Object} scheme
   * @param {String} scheme.sidebarLabel
   * Label that should be displayed in the sidebar. To make easier
   * distinguishing of the current scheme.
   *
   * @param {Function} scheme.importEnLocaleFile
   * Example: _ => import('./path').
   *
   * @param {PageModuleDescriptor[]} scheme.pages
   */
  constructor (scheme) {
    this._validateRawScheme(scheme)

    this._rawScheme = scheme
    this._sidebarLabel = scheme.sidebarLabel
    this._pages = scheme.pages
    this._importEnLocaleFile = scheme.importEnLocaleFile

    // To validate the whole bunch of modules for compatibility
    this._cache = this._createCache()
    this._validateCache()
  }

  get sidebarLabel () { return this._sidebarLabel }
  get pages () { return this._pages }
  get cache () { return this._cache }
  get importEnLocaleFile () { return this._importEnLocaleFile }

  install (Vue) {
    Vue.prototype.getModule = function () {
      return SchemeRegistry.current.cache
        .find(item => item.createdComponentUid === this._uid)
    }
  }

  _validateRawScheme (scheme) {
    if (!scheme.pages) {
      throw new Error('ModuleScheme: no scheme.pages provided!')
    }

    if (!Array.isArray(scheme.pages)) {
      throw new Error('ModuleScheme: scheme.pages should be an Array!')
    }

    if (!scheme.pages.every(item => item instanceof PageModuleDescriptor)) {
      throw new Error('ModuleScheme: scheme.pages should contain only PageModuleDescriptor instances!')
    }
  }

  _createCache () {
    const cache = this._flattenDeep(this._rawScheme.pages)
    return cache
  }

  _validateCache () {
    for (const item of this._cache) {
      item.validateDependencies(this._cache)
      item.validateCompatibility(this._cache)
    }
  }

  _flattenDeep (modules = []) {
    const result = []
    for (const item of modules) {
      result.push(item)
      if (item.submodules) {
        result.push(...this._flattenDeep(item.submodules))
      }
    }
    return result
  }
}
