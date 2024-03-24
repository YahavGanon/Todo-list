import { userService } from "../services/user.service.js"
import { todoReducer } from "./reducers/todo.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

const { createStore, compose, combineReducers } = Redux

const rootReducer = combineReducers({
    todoModule: todoReducer,
    userModule: userReducer
})

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store