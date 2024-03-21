import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { TodoList } from '../cmps/TodoList.jsx'

const { useState, useEffect } = React

export function TodoIndex() {
    const [todos, setTodos] = useState(null)

    useEffect(() => {
        loadTodos()
    }, [])

    function loadTodos() {
        todoService.query().then(setTodos)
    }

    function onRemoveTodo(todoId) {
        todoService
            .remove(todoId)
            .then(() => {
                console.log('Deleted Succesfully!')
                const todosToUpdate = todos.filter((todo) => todo._id !== todoId)
                setTodos(todosToUpdate)
                showSuccessMsg('Todo removed')
            })
            .catch((err) => {
                console.log('Error from onRemoveTodo ->', err)
                showErrorMsg('Cannot remove todo')
            })
    }

    function onAddTodo() {
        const todo = {
            title: prompt('Todo title?'),
            severity: +prompt('Todo severity?'),
        }
        todoService
            .save(todo)
            .then((savedTodo) => {
                console.log('Added Todo', savedTodo)
                setTodos([...todos, savedTodo])
                showSuccessMsg('Todo added')
            })
            .catch((err) => {
                console.log('Error from onAddTodo ->', err)
                showErrorMsg('Cannot add todo')
            })
    }

    function onEditTodo(todo) {
        const severity = +prompt('New severity?')
        const todoToSave = { ...todo, severity }
        todoService
            .save(todoToSave)
            .then((savedBug) => {
                console.log('Updated Todo:', savedTodo)
                const todosToUpdate = todos.map((currTodo) =>
                    currTodo._id === savedTodos._id ? savedTodo : currTodo
                )
                setTodos(todosToUpdate)
                showSuccessMsg('Todo updated')
            })
            .catch((err) => {
                console.log('Error from onEditTodo ->', err)
                showErrorMsg('Cannot update todo')
            })
    }

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
