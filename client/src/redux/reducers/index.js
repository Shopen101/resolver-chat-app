import { combineReducers } from 'redux'
import main from './main'
import messanger from './messanger'
import tab from './tab'

const rootReducer = combineReducers({
    user: main,
    messanger,
    tab,
})

export default rootReducer
