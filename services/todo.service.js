
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'


const PAGE_SIZE = 7
const STORAGE_KEY = 'todoDB'

_createTodos()

export const todoService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter
}

// function query(filterBy = {}) {
//     return storageService.query(STORAGE_KEY)
//         .then(todos => {
//             if (!filterBy.txt) filterBy.txt = ''

//             // if(!filterBy.isDone) return todos
//             // if (filterBy.isDone) {
//             //     return todos.filter(todo => todo.isDone === false)
//             // }
            
//             const regExp = new RegExp(filterBy.txt, 'i')
//             return todos.filter(todo =>
//                 regExp.test(todo.title)
//             )

//         })
// }

function query(filterBy = { txt: '', isDone: 'all', pageIdx: 0}) {
    return storageService.query(STORAGE_KEY)
        .then(todos => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regex.test(todo.title))
            }
            if (filterBy.isDone !== 'all') {
                todos = todos.filter((todo) => (filterBy.isDone === 'done' ? todo.isDone : !todo.isDone))
            }
            if (filterBy.pageIdx !== undefined) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                todos = todos.slice(startIdx, PAGE_SIZE + startIdx)
            }
            return todos
        })
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
                _id: "1NF1N1T3",
                isDone:false
            },
            {
                title: "To fix the computer",
                severity: 3,
                _id: "K3YB0RD",
                isDone: false
            },
            {
                title: "To take the dog out",
                severity: 2,
                _id: "C0FF33",
                isDone: false
           },
            {
                title: "To finish homework",
                severity: 1,
                _id: "G0053",
                isDone: false
          }
        ]
        utilService.saveToStorage(STORAGE_KEY, todos)
    }
}

function getDefaultFilter() {
    return { txt: '', isDone: 'all', pageIdx: 0}
}