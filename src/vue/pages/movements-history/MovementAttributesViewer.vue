<template>
  <div class="movement-attributes-viewer">
    <div class="attributes-viewer">
      <table class="attributes-viewer__table">
        <movement-summary-viewer :movement="movement" />
        <balance-changed-effect-viewer
          v-if="movement.effect instanceof BalanceChangedEffect"
          :effect="movement.effect"
          :asset-code="movement.assetCode"
          :is-locked="movement.isLocked"
        />
        <particular-balance-changed-effect-viewer
          v-else-if="movement.effect instanceof ParticularBalanceChangeEffect"
          :effect="movement.effect"
          :is-outgoing="movement.isOutgoing"
        />
        <manage-offer-op-viewer
          v-if="movement.operationDetails instanceof ManageOfferOp"
          :operation-details="movement.operationDetails"
        />
        <payment-op-viewer
          v-if="movement.operationDetails instanceof PaymentOp"
          :operation-details="movement.operationDetails"
        />
        <review-request-op-viewer
          v-if="movement.operationDetails instanceof ReviewRequestOp"
          :operation-details="movement.operationDetails"
        />
        <check-sale-state-op-viewer
          v-if="movement.operationDetails instanceof CheckSaleStateOp"
          :operation-details="movement.operationDetails"
        />
        <manage-asset-pair-op-viewer
          v-if="movement.operationDetails instanceof ManageAssetPairOp"
          :operation-details="movement.operationDetails"
        />
        <create-aml-alert-request-op-viewer
          v-if="movement.operationDetails instanceof CreateAMLAlertRequestOp"
          :operation-details="movement.operationDetails"
        />
        <create-issuance-request-op-viewer
          v-if="movement.operationDetails instanceof CreateIssuanceRequestOp"
          :operation-details="movement.operationDetails"
        />
        <create-withdrawal-request-op-viewer
          v-if="movement.operationDetails instanceof CreateWithdrawRequestOp"
          :operation-details="movement.operationDetails"
        />
      </table>
    </div>
  </div>
</template>

<script>
import { Movement } from '@/js/records/entities/movement.record'
import {
  BalanceChangedEffect,
  ParticularBalanceChangeEffect,
} from '@/js/records/entities/effect.record'

import { PaymentOp } from '@/js/records/operation-details/payment'
import { ManageOfferOp } from '@/js/records/operation-details/manage-offer'
import { ReviewRequestOp } from '@/js/records/operation-details/review-request'
import { CheckSaleStateOp } from '@/js/records/operation-details/check-sale-state'
import { ManageAssetPairOp } from '@/js/records/operation-details/manage-asset-pair'
import { CreateAMLAlertRequestOp } from '@/js/records/operation-details/create-aml-alert-request'
import { CreateIssuanceRequestOp } from '@/js/records/operation-details/create-issuance-request'
import { CreateWithdrawRequestOp } from '@/js/records/operation-details/create-withdrawal-request'

import MovementSummaryViewer from './MovementSummaryViewer'

import BalanceChangedEffectViewer from './effect-viewer/BalanceChanged'
import ParticularBalanceChangedEffectViewer from './effect-viewer/ParticularBalanceChanged'

import PaymentOpViewer from './operations-viewer/Payment'
import ManageOfferOpViewer from './operations-viewer/ManageOffer'
import ReviewRequestOpViewer from './operations-viewer/ReviewRequest'
import CheckSaleStateOpViewer from './operations-viewer/CheckSaleState'
import ManageAssetPairOpViewer from './operations-viewer/ManageAssetPair'
import CreateAmlAlertRequestOpViewer from './operations-viewer/CreateAmlAlertRequest'
import CreateIssuanceRequestOpViewer from './operations-viewer/CreateIssuanceRequest'
import CreateWithdrawalRequestOpViewer from './operations-viewer/CreateWithdawalRequest'

export default {
  name: 'movement-attributes-viewer',
  components: {
    MovementSummaryViewer,
    BalanceChangedEffectViewer,
    ParticularBalanceChangedEffectViewer,

    PaymentOpViewer,
    ManageOfferOpViewer,
    ReviewRequestOpViewer,
    CheckSaleStateOpViewer,
    ManageAssetPairOpViewer,
    CreateAmlAlertRequestOpViewer,
    CreateIssuanceRequestOpViewer,
    CreateWithdrawalRequestOpViewer,
  },
  props: {
    movement: {
      type: Movement,
      required: true,
    },
  },
  data: _ => ({
    BalanceChangedEffect,
    ParticularBalanceChangeEffect,

    PaymentOp,
    ManageOfferOp,
    ReviewRequestOp,
    CheckSaleStateOp,
    ManageAssetPairOp,
    CreateAMLAlertRequestOp,
    CreateIssuanceRequestOp,
    CreateWithdrawRequestOp,
  }),
}
</script>

<style lang="scss" scoped>
@import './attributes-viewer';
</style>
