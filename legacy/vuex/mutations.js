export const SET_LOGGED_IN_STATE = (state) => {
  state.auth.isLoggedIn = true
}

export const SET_LOGGED_OUT_STATE = (state) => {
  state.auth.isLoggedIn = false
}

// This mutations are being subscribed by plugins:
export const KEEP_SESSION = () => {}
export const POP_STATE = () => {}

export const SET_WALLET_ID = (state, wallet) => {
  state.id = wallet
}
