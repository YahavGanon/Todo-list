import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { TodoList } from '../cmps/TodoList.jsx'
import { loadTodos, removeTodo, saveTodo } from '../store/actions/todo.actions.js'
import { TodoFilter } from '../cmps/TodoFilter.jsx'

const { useState, useEffect } = React
const { useSelector } = ReactRedux

export function TodoIndex() {
    const todos = useSelector(storeState => storeState.todos)
    const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter())

    useEffect(() => {
        loadTodos(filterBy)
            .catch(err => {
                showErrorMsg('Cannot load Todos!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
            })
            .catch((err) => {
                showErrorMsg('Cannot remove todo')
            })
    }

    function onAddTodo() {
        const todo = {
            title: prompt('Todo title?'),
            severity: +prompt('Todo severity?'),
            isDone: false
        }
        saveTodo(todo)
            .then((savedTodo) => {
                showSuccessMsg('Todo added')
            })
            .catch((err) => {
                showErrorMsg('Cannot add todo')
            })
    }

    function onEditTodo(todo) {
        const severity = +prompt('New severity?')
        const todoToSave = { ...todo, severity }

        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg('Todo updated')
            })
            .catch((err) => {
                showErrorMsg('Cannot update todo')
            })
    }

    return (
        <main>
            <h3>Todos App</h3>
            <main>
                <div className='todo-actions'>
                <button onClick={onAddTodo}>Add Todo ⛐</button>
                <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                </div>
                <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onEditTodo={onEditTodo} />
            </main>
        </main>
    )
}
