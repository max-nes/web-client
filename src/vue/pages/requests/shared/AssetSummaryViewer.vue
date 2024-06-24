<template>
  <div class="asset-summary-viewer">
    <asset-logo-viewer
      class="asset-summary-viewer__logo"
      :asset-code="assetCode"
      :asset-logo-url="assetLogoUrl"
    />

    <div class="asset-summary-viewer__info">
      <p class="asset-summary-viewer__code">
        {{ assetCode }}
      </p>
      <p class="asset-summary-viewer__name">
        {{ assetName }}
      </p>
    </div>
  </div>
</template>

<script>
import AssetLogoViewer from './AssetLogoViewer'

export default {
  name: 'asset-summary-viewer',
  components: {
    AssetLogoViewer,
  },

  props: {
    assetCode: { type: String, required: true },
    assetName: { type: String, required: true },
    assetLogoUrl: { type: String, required: true },
  },
}
</script>

<style lang="scss" scoped>
@import '~@scss/variables';

.asset-summary-viewer {
  display: flex;
  align-items: center;
}

.asset-summary-viewer__logo {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
}

.asset-summary-viewer__info {
  margin-left: 1.8rem;
}

.asset-summary-viewer__code {
  font-size: 1.8rem;
  font-weight: 700;
  color: $col-text;
}

.asset-summary-viewer__name {
  margin-top: 0.1rem;
  font-size: 1.4rem;
  line-height: 1.29;
  color: $col-text;
}
</style>
