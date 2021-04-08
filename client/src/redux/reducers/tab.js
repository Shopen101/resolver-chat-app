const initialState = {
    activeTab: 0,
}

const tab = (state = initialState, action) => {
    switch (action.type) {
        case 'SETTAB':
            return {
                activeTab: action.payload.tab,
            }

        case 'LOGOUT':
            return {
                ...state,
                activeTab: 0
            }

        default:
            return {
                ...state,
            }
    }
}

export default tab
