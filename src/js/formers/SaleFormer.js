import { Former } from './Former'
import { Document, base } from '@tokend/js-sdk'
import { DateUtil } from '@/js/utils'

import {
  createSaleDescriptionBlobId,
} from '@/js/helpers/sale-helper'

/**
 * Collects the attributes for sale operations
 * @class
 * @implements {Former}
 */
export class SaleFormer extends Former {
  attrs = this.attrs || this._defaultAttrs

  get _defaultAttrs () {
    return {
      saleType: 0,
      saleName: '',
      baseAssetCode: '',
      capAssetCode: '',
      startTime: '',
      endTime: '',
      softCap: '',
      hardCap: '',
      assetsToSell: '',
      isWhitelisted: false,
      saleLogo: new Document(),
      shortDescription: '',
      youtubeVideo: '',
      fullDescription: '',
      saleDescriptionBlobId: '',
      creatorAccountId: '',
      requestId: '0',
      quoteAssetsAndPrices: [],
    }
  }

  /** @param {CreateSaleRequest} source*/
  populate (source) {
    this.attrs = this._defaultAttrs
    this.attrs.requestId = source.id
    this.attrs.saleType = source.saleType
    this.attrs.saleName = source.name
    this.attrs.baseAssetCode = source.baseAsset
    this.attrs.capAssetCode = source.defaultQuoteAsset
    this.attrs.startTime = source.startTime
    this.attrs.endTime = source.endTime
    this.attrs.softCap = source.softCap
    this.attrs.hardCap = source.hardCap
    this.attrs.assetsToSell = source.baseAssetForHardCap
    this.attrs.quoteAssetsAndPrices = source.quoteAssets
    this.attrs.isWhitelisted = source.isWhitelisted
    this.attrs.saleLogo = new Document(source.logo)
    this.attrs.shortDescription = source.shortDescription
    this.attrs.youtubeVideo = source.youtubeVideoId
    this.attrs.saleDescriptionBlobId = source.description
  }

  async buildOps () {
    await Document.uploadDocuments([this.attrs.saleLogo])
    return [await this._buildOp()]
  }

  async _buildOp () {
    this.attrs.saleDescriptionBlobId = await createSaleDescriptionBlobId(
      this.attrs.fullDescription
    )

    const opts = this._getOpts()
    return base.SaleRequestBuilder.createSaleCreationRequest(opts)
  }

  _getOpts () {
    const saleLogo = this.attrs.saleLogo

    return {
      requestID: this.attrs.requestId,
      saleEnumType: +this.attrs.saleType,
      saleType: '0',
      startTime: DateUtil.toTimestamp(this.attrs.startTime),
      endTime: DateUtil.toTimestamp(this.attrs.endTime),
      baseAsset: this.attrs.baseAssetCode,
      defaultQuoteAsset: this.attrs.capAssetCode,
      softCap: this.attrs.softCap,
      hardCap: this.attrs.hardCap,
      requiredBaseAssetForHardCap: this.attrs.assetsToSell,
      quoteAssets: this.attrs.quoteAssetsAndPrices,
      creatorDetails: {
        name: this.attrs.saleName,
        short_description: this.attrs.shortDescription,
        description: this.attrs.saleDescriptionBlobId,
        logo: new Document(saleLogo) || new Document(),
        youtube_video_id: this.attrs.youtubeVideo,
      },
      saleRules: [{
        forbids: this.attrs.isWhitelisted,
      }],
    }
  }
}
