import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const AppReducers = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp