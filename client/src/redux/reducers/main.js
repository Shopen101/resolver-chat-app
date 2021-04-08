function noop() {}

const initialState = {
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    firstName: null,
    lastname: null,
    isAdmin: false,
}

const main = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                userId: action.payload.userId,
                token: action.payload.token,
                firstName: action.payload.firstName,
                lastname: action.payload.lastname,
                isAdmin: action.payload.isAdmin,
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                userId: null,
                token: null,
                isAdmin: false,
                firstName: null,
                lastname: null,
            }
        case 'SETFUNC':
            return {
                ...state,
                login: action.payload.login,
                logout: action.payload.logout,
            }

        default:
            return {
                ...state,
            }
    }
}

export default main
