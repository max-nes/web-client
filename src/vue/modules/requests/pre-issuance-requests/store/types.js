const mutations = {
  SET_ACCOUNT_ID: 'SET_ACCOUNT_ID',
  SET_REQUESTS: 'SET_REQUESTS',
  CONCAT_REQUESTS: 'CONCAT_REQUESTS',
}

const actions = {
  LOAD_REQUESTS: 'LOAD_REQUESTS',
}

const getters = {
  accountId: 'accountId',
  requests: 'requests',
}

export const types = {
  ...mutations,
  ...actions,
  ...getters,
}
