import { base } from '@tokend/js-sdk'

let _config = {
  /**
   * Default lower acceptable amount by most input fields. Tends to be
   * dropped one day
   */
  MIN_AMOUNT: String(1 / (base.Operation.ONE || 1000000)),

  /**
   * Default higher acceptable amount by most input fields. Tends to be
   * dropped one day
   */
  MAX_AMOUNT: String(base.Operation.MAX_INT64_AMOUNT),

  /**
   * Default amount precision, the number of digits
   * after a point
   */
  DECIMAL_POINTS: 6,

  /**
   * Default asset signer for pre-issuance upload
   */
  NULL_ASSET_SIGNER: 'GAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHV4',
}

/**
 * @param {string} storageURL - the URL of the storage server
 */
export function initConfig ({ storageURL }) {
  if (!storageURL) {
    throw new Error('storageURL is not provided')
  }

  _config.storageURL = storageURL
}

export function config () {
  return _config
}
