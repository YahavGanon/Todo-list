import { todoService } from "../services/todo.service.js"
import { UPDATE_PROGRESS } from "../store/store.js"
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
        // const sum = todo.isDone ? + 1 : 0
        // dispatch({type: UPDATE_PROGRESS, progress: sum})
        todoService.save(todo)
            .then(console.log('saved successfully!'))
            .catch(console.error('Couldnt save successfully'))
    }

    return <article>
        <h4 className={`${dynClass}`}>{todo.title}</h4>
        <h1>📃</h1>
        <p>Severity: <span>{todo.severity}</span></p>
        <button onClick={onFinishTodo}>Done</button>
    </article>
}