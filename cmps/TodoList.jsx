const { Link } = ReactRouterDOM
import { TodoPreview } from './TodoPreview.jsx'

export function TodoList({ todos, onRemoveTodo, onEditTodo }) {

    if (!todos) return <div>Loading...</div>
    return (
        <ul className="bug-list">
            {todos.map((todo) => (
                <li className="bug-preview" key={todo._id}>
                    <TodoPreview todo={todo} />
                    <div>
                        <button onClick={() => onRemoveTodo(todo._id)}>x</button>
                        <button onClick={() => onEditTodo(todo)}>Edit</button>
                    </div>
                    <Link to={`/todo/${todo._id}`}>Details</Link>
                </li>
            ))
            }
        </ul >
    )
}
