const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { todoService } from '../services/todo.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'


export function TodoDetails() {

    const [todo, setTodo] = useState(null)
    const { todoId } = useParams()

    useEffect(() => {
        todoService.getById(todoId)
            .then(todo => {
                setTodo(todo)
            })
            .catch(err => {
                showErrorMsg('Cannot load todo')
            })
    }, [])

    if (!todo) return <h1>loadings....</h1>
    return todo && <div>
        <h3>Todo Details 📃</h3>
        <h4>{todo.title}</h4>
        <p>Severity: <span>{todo.severity}</span></p>
        <Link to="/todo">Back to List</Link>
    </div>

}

