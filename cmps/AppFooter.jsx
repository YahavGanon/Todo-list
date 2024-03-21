import { showSuccessMsg } from '../services/event-bus.service.js'
const { useEffect } = React
const { useSelector } = ReactRedux

export function AppFooter () {
    const todos = useSelector(storeState => storeState.todos)

    return (
        <footer className='footer-todos'>
            <p> ©️Todo's app by yahav ganon </p>
            <span className='todos-num'> Todos: {todos.length}</span>
        </footer>
    )

}