import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
    EMIT_DEVICE_WIDTH_UPDATE: null,
    CHANGE_MENU_THEME: null,
    UPDATE_LOGIN_MODAL: null,
    UPDATE_USER_DATA: null,
    UPDATE_BULK_USER_DATA: null,
    UPDATE_USER_AUTH: null,
    UPDATE_INSURANCE_QUOTE: null,
    CLEAR_ALL_USER_INFO: null,
});

export default ActionTypes;
