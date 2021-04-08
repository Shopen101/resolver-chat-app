export const loginUser = (jwtToken, id, firstName, lastname, isAdmin) => ({
    type: 'LOGIN',
    payload: {
        token: jwtToken,
        userId: id,
        firstName,
        lastname,
        isAdmin,
    },
})

export const logoutUser = () => ({
    type: 'LOGOUT',
})

export const setFuncLogInOut = (login, logout) => ({
    type: 'SETFUNC',
    payload: { login, logout },
})

export const setUsers = (users, activeUser) => ({
    type: 'SETUSERS',
    payload: { users, activeUser },
})

export const setActiveDialog = dialogId => ({
    type: 'SETACTIVEDIALOG',
    payload: { dialogId },
})

export const setMsg = dialogsMessages => ({
    type: 'SETMSG',
    payload: { dialogsMessages },
})

export const setActiveTab = tab => ({
    type: 'SETTAB',
    payload: { tab },
})

export const setMyNewMsg = msgObj => ({
    type: 'SETMYNEWMSG',
    payload: { msgObj },
})

export const addPartnerMessage = msg => ({
    type: 'SETPARTNERMSG',
    payload: { msg },
})
