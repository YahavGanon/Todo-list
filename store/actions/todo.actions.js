import { todoService } from "../../services/todo.service.js";
import { ADD_TODO, REMOVE_TODO, SET_FILTER_BY, SET_IS_LOADING, SET_TODOS, UPDATE_TODO } from "../reducers/todo.reducer.js";
import { store } from "../store.js"
export function loadTodos() {
    const filterBy = store.getState().todoModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy).then(todos => {
        store.dispatch({ type: SET_TODOS, todos })
    })
        .catch(err => {
            console.log('todo action --> Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({type: SET_IS_LOADING, isLoading: false})
        })
}

export function removeTodo(todoId) {

    return todoService
        .remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
            console.log('Deleted Succesfully!')
        })
        .catch((err) => {
            console.log('Error from onRemoveTodo action ->', err)
            throw err
        })

}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then((savedTodo) => {
            store.dispatch({ type, todo: todo })
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
