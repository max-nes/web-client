const mutations = {
  // root
  CLEAR_STATE: 'CLEAR_STATE',
  POP_STATE: 'POP_STATE',

  // account
  SET_ACCOUNT: 'SET_ACCOUNT',
  SET_ACCOUNT_BALANCES_DETAILS: 'SET_ACCOUNT_BALANCES_DETAILS',

  // wallet
  SET_WALLET: 'SET_WALLET',
  SET_ENCRYPTED_SECRET_SEED: 'SET_ENCRYPTED_SECRET_SEED',

  // factors
  SET_FACTORS: 'SET_FACTORS',

  // kyc
  SET_KYC_REQUEST: 'SET_KYC_REQUEST',
  SET_KYC_BLOB: 'SET_KYC_BLOB',
  SET_KYC_REQUEST_BLOB: 'SET_KYC_REQUEST_BLOB',

  // kyc recovery
  SET_KYC_RECOVERY_REQUEST: 'SET_KYC_RECOVERY_REQUEST',
  SET_KYC_RECOVERY_REQUEST_BLOB: 'SET_KYC_RECOVERY_REQUEST_BLOB',

  // assets
  SET_ASSETS: 'SET_ASSETS',
  UPDATE_ASSETS: 'UPDATE_ASSETS',

  // idle
  UPDATE_LOGOUT_AT: 'UPDATE_LOGOUT_AT',

  // identities
  SET_IDENTITIES: 'SET_IDENTITIES',

  // create asset requests
  SET_CREATE_ASSET_REQUESTS: 'SET_CREATE_ASSET_REQUESTS',
  CONCAT_CREATE_ASSET_REQUESTS: 'CONCAT_CREATE_ASSET_REQUESTS',
  SET_KYC_REQUIRED_ASSET_TYPE: 'SET_KYC_REQUIRED_ASSET_TYPE',
  SET_SECURITY_ASSET_TYPE: 'SET_SECURITY_ASSET_TYPE',

  // update asset requests
  SET_UPDATE_ASSET_REQUESTS: 'SET_UPDATE_ASSET_REQUESTS',
  CONCAT_UPDATE_ASSET_REQUESTS: 'CONCAT_UPDATE_ASSET_REQUESTS',

  // create sale requests
  SET_CREATE_SALE_REQUESTS: 'SET_CREATE_SALE_REQUESTS',
  CONCAT_CREATE_SALE_REQUESTS: 'CONCAT_CREATE_SALE_REQUESTS',

  // pre issuance requests
  SET_PRE_ISSUANCE_REQUESTS: 'SET_PRE_ISSUANCE_REQUESTS',
  CONCAT_PRE_ISSUANCE_REQUESTS: 'CONCAT_PRE_ISSUANCE_REQUESTS',

  // incoming withdrawal requests
  CONCAT_INCOMING_WITHDRAWAL_REQUESTS: 'CONCAT_INCOMING_WITHDRAWAL_REQUESTS',
  SET_INCOMING_WITHDRAWAL_REQUESTS: 'SET_INCOMING_WITHDRAWAL_REQUESTS',

  // poll requests
  SET_POLL_REQUESTS: 'SET_POLL_REQUESTS',
  CONCAT_POLL_REQUESTS: 'CONCAT_POLL_REQUESTS',
}

const actions = {
  // root
  LOG_OUT: 'LOG_OUT',
  LOG_IN: 'LOG_IN',
  RESTORE_SESSION: 'RESTORE_SESSION',

  // account
  LOAD_ACCOUNT: 'LOAD_ACCOUNT',
  LOAD_ACCOUNT_BALANCES_DETAILS: 'LOAD_ACCOUNT_BALANCES_DETAILS',

  // wallet
  LOAD_WALLET: 'LOAD_WALLET',
  STORE_WALLET: 'STORE_WALLET',
  DECRYPT_SECRET_SEED: 'DECRYPT_SECRET_SEED',
  GET_SESSION: 'GET_SESSION',
  PROLONGATE_SESSION: 'PROLONGATE_SESSION',

  // factors
  LOAD_FACTORS: 'LOAD_FACTORS',

  // kyc
  LOAD_KYC: 'LOAD_KYC',
  LOAD_KYC_REQUEST: 'LOAD_KYC_REQUEST',
  LOAD_KYC_REQUEST_BLOB: 'LOAD_KYC_REQUEST_BLOB',
  LOAD_KYC_BLOB: 'LOAD_KYC_BLOB',

  // kyc recovery
  LOAD_KYC_RECOVERY: 'LOAD_KYC_RECOVERY',
  LOAD_KYC_RECOVERY_REQUEST: 'LOAD_KYC_RECOVERY_REQUEST',
  LOAD_KYC_RECOVERY_REQUEST_BLOB: 'LOAD_KYC_RECOVERY_REQUEST_BLOB',

  // assets
  LOAD_ASSETS: 'LOAD_ASSETS',
  CREATE_BALANCE: 'CREATE_BALANCE',

  // idle
  START_IDLE: 'START_IDLE',
  LOGOUT_IDLE: 'LOGOUT_IDLE',
  INIT_IDLE_TICKER: 'INIT_IDLE_TICKER',
  KEEP_SESSION: 'KEEP_SESSION',
  LOGOUT_SESSION: 'LOGOUT_SESSION',

  // identities
  LOAD_IDENTITIES_BY_ACCOUNT_ID: 'LOAD_IDENTITIES_BY_ACCOUNT_ID',

  // create asset requests
  LOAD_CREATE_ASSET_REQUESTS: 'LOAD_CREATE_ASSET_REQUESTS',
  CANCEL_CREATE_ASSET_REQUEST: 'CANCEL_CREATE_ASSET_REQUEST',
  LOAD_KYC_REQUIRED_ASSET_TYPE: 'LOAD_KYC_REQUIRED_ASSET_TYPE',
  LOAD_SECURITY_ASSET_TYPE: 'LOAD_SECURITY_ASSET_TYPE',

  // update asset requests
  LOAD_UPDATE_ASSET_REQUESTS: 'LOAD_UPDATE_ASSET_REQUESTS',
  CANCEL_UPDATE_ASSET_REQUEST: 'CANCEL_UPDATE_ASSET_REQUEST',

  // create sale requests
  LOAD_CREATE_SALE_REQUESTS: 'LOAD_CREATE_SALE_REQUESTS',
  CANCEL_CREATE_SALE_REQUESTS: 'CANCEL_CREATE_SALE_REQUESTS',

  // pre issuance requests
  LOAD_PRE_ISSUANCE_REQUESTS: 'LOAD_PRE_ISSUANCE_REQUESTS',

  // incoming withdrawal requests
  REJECT_INCOMING_WITHDRAWAL_REQUEST: 'REJECT_INCOMING_WITHDRAWAL_REQUEST',
  APPROVE_INCOMING_WITHDRAWAL_REQUEST: 'APPROVE_INCOMING_WITHDRAWAL_REQUEST',
  LOAD_INCOMING_WITHDRAWAL_REQUESTS: 'LOAD_INCOMING_WITHDRAWAL_REQUESTS',

  // poll requests
  LOAD_POLL_REQUESTS: 'LOAD_POLL_REQUESTS',
  CANCEL_POLL_REQUEST: 'CANCEL_POLL_REQUEST',
}

const getters = {
  // root
  isLoggedIn: 'isLoggedIn',

  // account
  account: 'account',
  accountId: 'accountId',
  accountBalances: 'accountBalances',
  accountOwnedAssetsBalances: 'accountOwnedAssetsBalances',
  accountBalanceByCode: 'accountBalanceByCode',
  accountRoleId: 'accountRoleId',
  accountDepositAddresses: 'accountDepositAddresses',
  accountKycRecoveryStatus: 'accountKycRecoveryStatus',
  isAccountKycRecoveryInProgress: 'isAccountKycRecoveryInProgress',
  isAccountKycRecoveryInitiated: 'isAccountKycRecoveryInitiated',

  isAccountGeneral: 'isAccountGeneral',
  isAccountCorporate: 'isAccountCorporate',
  isAccountUsAccredited: 'isAccountUsAccredited',
  isAccountUsVerified: 'isAccountUsVerified',
  isAccountUnverified: 'isAccountUnverified',
  isAccountBlocked: 'isAccountBlocked',

  // wallet
  walletId: 'walletId',
  walletAccountId: 'walletAccountId',
  walletEmail: 'walletEmail',
  sessionId: 'sessionId',
  encryptedSecretSeed: 'encryptedSecretSeed',
  walletPublicKey: 'walletPublicKey',

  // factors
  factors: 'factors',
  factorsTotp: 'factorsTotp',
  factorsPassword: 'factorsPassword',
  factorsEmail: 'factorsEmail',
  factorsTotpEnabled: 'factorsTotpEnabled',
  isTotpEnabled: 'isTotpEnabled',

  // kyc
  kyc: 'kyc',
  kycRequest: 'kycRequest',

  // kyc recovery
  kycRecoveryRequest: 'kycRecoveryRequest',

  // assets
  assets: 'assets',
  assetByCode: 'assetByCode',
  assetsByOwner: 'assetsByOwner',
  balancesAssets: 'balancesAssets',
  balancesAssetsByOwner: 'balancesAssetsByOwner',
  fiatAssets: 'fiatAssets',
  depositableAssets: 'depositableAssets',
  coinpaymentsAssets: 'coinpaymentsAssets',
  transferableBalancesAssets: 'transferableBalancesAssets',
  withdrawableBalancesAssets: 'withdrawableBalancesAssets',
  statsQuoteAsset: 'statsQuoteAsset',
  defaultQuoteAsset: 'defaultQuoteAsset',
  ownedAssets: 'ownedAssets',
  ownedBalancesAssets: 'ownedBalancesAssets',
  baseAtomicSwapBalancesAssets: 'baseAtomicSwapBalancesAssets',
  quoteAtomicSwapAssets: 'quoteAtomicSwapAssets',

  // idle-handler
  logoutAt: 'logoutAt',

  // identitys
  usersIdentities: 'usersIdentities',
  emailByAccountId: 'emailByAccountId',

  // create assets requests
  createAssetRequests: 'createAssetRequests',
  kycRequiredAssetType: 'kycRequiredAssetType',
  securityAssetType: 'securityAssetType',

  // update assets requests
  updateAssetRequests: 'updateAssetRequests',

  // create sale requests
  createSaleRequests: 'createSaleRequests',

  // pre issuance requests
  preIssuanceRequests: 'preIssuanceRequests',

  // incoming withdrawal requests
  incomingWithdrawalRequests: 'incomingWithdrawalRequests',

  // poll requests
  pollRequests: 'pollRequests',
}

export const vuexTypes = {
  ...mutations,
  ...actions,
  ...getters,
}
