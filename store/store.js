import { userService } from "../services/user.service.js"

const { createStore } = Redux

//todos
export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const DONE_TODO = 'DONE_TODO'
export const IS_DONE = 'IS_DONE'

//user
export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS'



const initialState = {
    todos: [],
    loggedInUser: userService.getLoggedinUser(),
    isDone: false,
    users: [],
    progress: 0,
}

export function appReducer(state = initialState, action = {}) {

    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }

        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(todo => todo._id !== action.todoId) }

        case ADD_TODO:
            return { ...state, todos: [...state.todos, action.todo] }

        case UPDATE_TODO:
            return { ...state, todos: state.todos.map(todo => todo._id !== action.todo._Id ? todo : action.todo) }

        case IS_DONE:
            return { ...state, isDone: !state.isDone }

        case UPDATE_PROGRESS:
            return { ...state, progress: action.progress}


        // user
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }
        case UPDATE_USER:
            // return { ...state, users: state.users.map(user => user._id !== action.user._Id ? user : action.user) }
            return { ...state, users: state.users.map(user => user._id !== action.user._id ? user : action.user) };

        default:
            return state;
    }

}

export const store = createStore(appReducer)

window.gStore = store