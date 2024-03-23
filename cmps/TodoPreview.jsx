import { todoService } from "../services/todo.service.js"
import { saveTodo } from "../store/actions/todo.actions.js"

const {useSelector, useDispatch} = ReactRedux
const { useState } = React



export function TodoPreview({ todo }) {
    const [isDone, setIsDone] = useState(todo.isDone)
    const dispatch = useDispatch()
    // const isDone = useSelector(storeState => storeState.isDone)
    const dynClass = isDone ? 'done' : 'not-done'

    function onFinishTodo() {
        setIsDone(!isDone)
        todo.isDone = !todo.isDone
        saveTodo(todo)
        todoService.save(todo)
            .then(console.log('saved successfully!'))
            .catch(console.error('Couldnt save successfully'))
    }

    return <article>
        <h4 className={`${dynClass}`}>{todo.title}</h4>
        <h1>📃</h1>
        <p>Importance: <span>{todo.severity}</span></p>
        <button onClick={onFinishTodo}>Done</button>
    </article>
}