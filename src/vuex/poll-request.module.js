import { PollRequest } from '@/js/records/requests/poll-request.record'

import { base } from '@tokend/js-sdk'

import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  pollRequests: [],
}

export const mutations = {
  [vuexTypes.SET_POLL_REQUESTS] (state, requests) {
    state.pollRequests = requests
  },
  [vuexTypes.CONCAT_POLL_REQUESTS] (state, requests) {
    state.pollRequests = state.pollRequests.concat(requests)
  },
}

export const actions = {
  [vuexTypes.LOAD_POLL_REQUESTS] ({ rootGetters }) {
    return api.getWithSignature('/v3/create_poll_requests', {
      page: {
        order: 'desc',
      },
      filter: {
        requestor: rootGetters[vuexTypes.accountId],
      },
      include: ['request_details'],
    })
  },

  async [vuexTypes.CANCEL_POLL_REQUEST] (_, requestId) {
    const operation = base.ManageCreatePollRequestBuilder.cancelPollRequest({
      requestID: requestId,
    })
    await api.postOperations(operation)
  },
}

export const getters = {
  [vuexTypes.pollRequests]: state => state.pollRequests
    .map(r => new PollRequest(r)),
}

export default {
  state,
  getters,
  actions,
  mutations,
}
