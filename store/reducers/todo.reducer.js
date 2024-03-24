import { todoService } from "../../services/todo.service.js"

export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const DONE_TODO = 'DONE_TODO'
export const IS_DONE = 'IS_DONE'
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
    todos: [],
    isDone: false,
    progress: 0,
    isLoading: false,
    filterBy: todoService.getDefaultFilter()
}

export function todoReducer(state = initialState, action = {}) {

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
            return { ...state, progress: action.progress }

        case SET_FILTER_BY:
            return {...state, filterBy: { ...state.filterBy, ...action.filterBy }}

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }

}