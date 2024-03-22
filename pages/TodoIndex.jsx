import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { TodoList } from '../cmps/TodoList.jsx'
import { loadTodos, removeTodo, saveTodo } from '../store/actions/todo.actions.js'

const { useState, useEffect } = React
const { useSelector } = ReactRedux

export function TodoIndex() {
    const todos = useSelector(storeState => storeState.todos)

    useEffect(() => {
        loadTodos()
            .catch(err => {
                showErrorMsg('Cannot load Todos!')
            })
    }, [])

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

    // function onDoneTodo(){
        
    // }

    return (
        <main>
            <h3>Todos App</h3>
            <main>
                <button onClick={onAddTodo}>Add Todo ⛐</button>
                <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onEditTodo={onEditTodo} />
            </main>
        </main>
    )
}
