import { combineReducers } from 'redux'

const allCharactersReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CHARACTERS':
      return action.payload
    default:
      return state
  }
}

const selectedCharactersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_CHARACTER_ONE':
      return {
        ...state,
        one: action.payload
      }
    case 'SELECT_CHARACTER_TWO':
      return {
        ...state,
        two: action.payload
      }
    default:
    return state
  }
}

export default combineReducers({
  allCharacters: allCharactersReducer,
  selectedCharacters: selectedCharactersReducer
})
