const initialState = {
    users: [],
    messages: [],
    activeDialog: null,
    activeUser: null
}

const messanger = (state = initialState, action) => {
    switch (action.type) {
        case 'SETUSERS':
            return {
                ...state,
                users: [...action.payload.users],
                activeUser: action.payload.activeUser
            }

        case 'SETACTIVEDIALOG':
            return {
                ...state,
                activeDialog: action.payload.dialogId,
            }
        case 'SETMSG':
            return {
                ...state,
                messages: action.payload.dialogsMessages,
            }
        case 'LOGOUT':
            return {
                ...state,
                users: [],
                messages: [],
                activeDialog: null,
            }
        case 'SETMYNEWMSG':
            return {
                ...state,
                messages: [...state.messages, action.payload.msgObj],
            }
        case 'SETPARTNERMSG':
            return {
                ...state,
                messages: [...state.messages, action.payload.msg],
            }

        default:
            return {
                ...state,
            }
    }
}

export default messanger
