import { Former } from './Former'
import { base } from '@tokend/js-sdk'
import { LIMITS_REQUEST_TYPE } from '@/js/const/limits.const'

/**
 * Collects the attributes for limits-related operations
 * @class
 * @implements {Former}
 */
export class LimitsFormer extends Former {
    attrs = this.attrs || this._defaultAttrs
    get _defaultAttrs () {
      return {
        assetCode: '',
        dailyOut: '',
        weeklyOut: '',
        monthlyOut: '',
        annualOut: '',
        note: '',
        requestType: LIMITS_REQUEST_TYPE.initial,
        statsOpType: '',
        operationType: '',
      }
    }

    async buildOps () {
      const attrs = this.attrs

      return base.CreateManageLimitsRequestBuilder.createManageLimitsRequest({
        requestID: '0',
        creatorDetails: {
          operationType: attrs.operationType,
          statsOpType: +attrs.statsOpType,
          asset: attrs.assetCode,
          limits: {
            annualOut: attrs.annualOut,
            dailyOut: attrs.dailyOut,
            monthlyOut: attrs.monthlyOut,
            weeklyOut: attrs.weeklyOut,
          },
          requestType: attrs.requestType,
          note: attrs.note,
        },
      })
    }

    /** @param {LimitsRecord} source*/
    populate (source) {
      this.attrs = this.attrs || this._defaultAttrs

      this.attrs.annualOut = source.annualOut
      this.attrs.assetCode = source.assetCode
      this.attrs.dailyOut = source.dailyOut
      this.attrs.monthlyOut = source.monthlyOut
      this.attrs.weeklyOut = source.weeklyOut
      this.attrs.statsOpType = source.statsOpType
    }
}
