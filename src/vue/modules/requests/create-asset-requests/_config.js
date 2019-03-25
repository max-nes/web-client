let _config = null

/**
 * @param {string} horizonURL - the URL of the horizon server (without version)
 * @param {string} storageURL - the URL of the storage server
 */
export function initConfig ({ horizonURL, storageURL }) {
  if (!horizonURL) {
    throw new Error('horizonURL is not provided')
  }
  if (!storageURL) {
    throw new Error('storageURL is not provided')
  }

  _config = {
    horizonURL,
    storageURL,
  }
}

export function config () {
  if (!_config) {
    throw new Error('Config instance is not initialized')
  }

  return _config
}
