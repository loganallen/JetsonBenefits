import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
    CHANGE_MENU_THEME: null,
    UPDATE_LOGIN_MODAL: null,
    UPDATE_USER_DATA: null,
    UPDATE_BULK_USER_DATA: null,
    UPDATE_USER_AUTH: null
});

export default ActionTypes;
