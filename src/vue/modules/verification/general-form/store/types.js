const mutations = {
  SET_FIRST_NAME: 'SET_FIRST_NAME',
  SET_LAST_NAME: 'SET_LAST_NAME',
  SET_DATE_OF_BIRTH: 'SET_DATE_OF_BIRTH',

  SET_LINE_1: 'SET_LINE_1',
  SET_LINE_2: 'SET_LINE_2',
  SET_CITY: 'SET_CITY',
  SET_COUNTRY: 'SET_COUNTRY',
  SET_STATE: 'SET_STATE',
  SET_POSTAL_CODE: 'SET_POSTAL_CODE',

  SET_ID_DOCUMENT_TYPE: 'SET_ID_DOCUMENT_TYPE',

  SET_AVATAR: 'SET_AVATAR',
  SET_SELFIE: 'SET_SELFIE',
  SET_ID_DOCUMENT_FACE: 'SET_ID_DOCUMENT_FACE',
  SET_ID_DOCUMENT_BACK: 'SET_ID_DOCUMENT_BACK',
}

const actions = {
  GET_BLOB_DATA: 'GET_BLOB_DATA',
  POPULATE_FORM: 'POPULATE_FORM',
  UPLOAD_DOCUMENTS: 'UPLOAD_DOCUMENTS',
  CREATE_BLOB: 'CREATE_BLOB',
  SUBMIT_REQUEST_OP: 'SUBMIT_REQUEST_OP',
}

const getters = {
  blobData: 'blobData',
}

export const types = {
  ...actions,
  ...getters,
  ...mutations,
}
