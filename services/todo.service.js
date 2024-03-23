
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'todoDB'

_createTodos()

export const todoService = {
    query,
    getById,
    save,
    remove,
}


function query() {
    return storageService.query(STORAGE_KEY)
}
function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
    } else {
        todo.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, todo)
    }
}

function _createTodos() {
    let todos = utilService.loadFromStorage(STORAGE_KEY)
    if (!todos || !todos.length) {
        todos = [
            {
                title: "To wash the dishes",
                severity: 4,
                _id: "1NF1N1T3"
            },
            {
                title: "To fix the computer",
                severity: 3,
                _id: "K3YB0RD"
            },
            {
                title: "To take the dog out",
                severity: 2,
                _id: "C0FF33"
            },
            {
                title: "To finish homework",
                severity: 1,
                _id: "G0053"
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, todos)
    }



}
