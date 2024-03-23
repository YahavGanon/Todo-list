import { showSuccessMsg } from '../services/event-bus.service.js'
import { UPDATE_PROGRESS } from '../store/store.js'
const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux

export function AppFooter() {
    const todos = useSelector(storeState => storeState.todos)
    const progress = useSelector(storeState => storeState.progress)
    const dispatch = useDispatch()

    useEffect(() => {
        updateProgressBar()
    }, [todos, progress])

    function updateProgressBar() {
        console.log('shaayyyyy')
        let sum = todos.filter((todo) => todo.isDone).length
        dispatch({ type: UPDATE_PROGRESS, progress: sum })
    }

    return (
        <footer className='footer-todos'>
            <p> ©️Todo's app by yahav ganon </p>
            <span className='todos-num'> Todos: {todos.length}</span>
            <progress className='progress-bar' value={progress} max={todos.length} />
        </footer>
    )

}

