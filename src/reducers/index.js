import { combineReducers } from 'redux'
import header from './header'
import posts from './posts'

export default combineReducers({
  header,
  posts,
})
