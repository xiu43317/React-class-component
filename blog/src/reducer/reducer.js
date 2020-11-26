import { combineReducers } from 'redux'
import { SET_POSTS, REMOVE_POST, UPDATE_POST, ADD_POST } from '../actions/actions';

// 設定預設 state
const defaultState = {
  posts: []
}

// 底下每一個就是一個 reducer
function posts(state = defaultState, action) {
  switch (action.type) {

    // 回傳設定好 posts 的 state
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts
      }

    // 回傳刪除後的 state
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.id)
      }
    case UPDATE_POST:
      return {
        ...state,
        posts: action.posts
      }
    case ADD_POST:
      action.posts._id = state.posts.length+1;
      return {
        ...state,
        posts:[...state.posts,action.posts]
      }
    default:
      return state
  }
}

// 其實有多個 reducer 才需要用這個
const AppReducer = combineReducers({
  posts
})

export default AppReducer;