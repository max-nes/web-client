import { IncomingWithdrawalRequest } from '@/js/records/requests/incoming-withdrawal-request.record'

import { base } from '@tokend/js-sdk'

import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  incomingWithdrawalRequests: [],
}

export const mutations = {
  [vuexTypes.SET_INCOMING_WITHDRAWAL_REQUESTS] (state, requests) {
    state.incomingWithdrawalRequests = requests
  },
  [vuexTypes.CONCAT_INCOMING_WITHDRAWAL_REQUESTS] (state, requests) {
    state.incomingWithdrawalRequests =
      state.incomingWithdrawalRequests.concat(requests)
  },
}

export const actions = {
  [vuexTypes.LOAD_INCOMING_WITHDRAWAL_REQUESTS] ({ rootGetters }) {
    return api.getWithSignature('/v3/create_withdraw_requests', {
      page: {
        order: 'desc',
      },
      filter: {
        reviewer: rootGetters[vuexTypes.accountId],
      },
      include: ['request_details'],
    })
  },

  async [vuexTypes.APPROVE_INCOMING_WITHDRAWAL_REQUEST] (_, request) {
    const operation = createReviewWithdrawRequestOp({
      request,
      reason: '',
      action: base.xdr.ReviewRequestOpAction.approve().value,
    })

    await api.postOperations(operation)
  },

  // eslint-disable-next-line max-len
  async [vuexTypes.REJECT_INCOMING_WITHDRAWAL_REQUEST] (_, { request, reason }) {
    const operation = createReviewWithdrawRequestOp({
      request,
      reason,
      action: base.xdr.ReviewRequestOpAction.permanentReject().value,
    })

    await api.postOperations(operation)
  },
}

function createReviewWithdrawRequestOp ({ request, action, reason }) {
  const reviewDetails = {
    tasksToAdd: 0,
    tasksToRemove: request.pendingTasks,
    externalDetails: {},
  }

  return base.ReviewRequestBuilder.reviewWithdrawRequest({
    requestID: request.id,
    requestHash: request.hash,
    requestType: request.typeI,
    reviewDetails,
    requestDetails: JSON.stringify(reviewDetails),
    action,
    reason,
  })
}

export const getters = {
  // eslint-disable-next-line max-len
  [vuexTypes.incomingWithdrawalRequests]: state => state.incomingWithdrawalRequests
    .map(r => new IncomingWithdrawalRequest(r)),
}

export default {
  state,
  getters,
  actions,
  mutations,
}
