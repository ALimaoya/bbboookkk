import { combineReducers } from 'redux'

import { kindList ,currentIndex }  from './typeList'

const reducer = combineReducers({
    kindList ,
    currentIndex
});

export default reducer ;