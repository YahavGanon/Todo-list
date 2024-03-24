import { loadTodos, removeTodo, saveTodo } from '../store/actions/todo.actions.js'
import { TodoPreview } from '../cmps/TodoPreview.jsx'
import { userService } from '../services/user.service.js'
import { updateUser, login } from '../store/actions/user.actions.js'



const { useState, useEffect } = React
const { useSelector } = ReactRedux
const { Link } = ReactRouterDOM

export function UserInfo() {
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const [credentials, setCredentials] = useState({ fullname: '' })
    const [color, setColor] = useState({ colorTxt: '#000000', bgColor: '#000000' })
    const _user = useSelector(storeState => storeState.userModule.loggedInUser)


    function onChangeInput({ target }) {
        const { name: field, value } = target
        console.log(field, value)
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function onChagneColor({ target }) {
        const { name: field, value } = target
        console.log(field, value)
        setColor(prevColor => ({ ...prevColor, [field]: value }))
    }

    function ChangeUserPref(ev) {
        ev.preventDefault()
 
        const currentUser = userService.getLoggedinUser()
        const updatedUser = {
            ...currentUser,
            bgColor: color.bgColor,
            color: color.colorTxt,
            fullname: credentials.fullname
        }
        login(updatedUser)

        userService.upadateUser(updatedUser)
    }

    useEffect(() => {
        loadTodos()
            .catch(err => {
                showErrorMsg('Cannot load Todos!')
            })
    }, [])

    return (
        <section className="user-card">
            <form className='user-pref' onSubmit={ChangeUserPref}>
                <input
                    type="text"
                    name="fullname"
                    placeholder='Name'
                    onChange={onChangeInput}
                    value={credentials.fullname}
                />
                <label htmlFor="colorTxt">Text color:</label>
                <input type="color" name="colorTxt" id='colorTxt' value={color.colorTxt} onChange={onChagneColor} />

                <label htmlFor="bgColor">Bg color:</label>
                <input type="color" name="bgColor" value={color.bgColor} onChange={onChagneColor} />

                <button>Save</button>
            </form>

            <div>
                <h1 className='user-card-name'>{_user.fullname}</h1>
                <img className="user-card-img" src="assets/img/funnymonkey.jpg" />
                {todos && <h2>My todos:</h2>}
            </div>
            {todos && <ul className="bug-list">

                {todos.map((todo) => (todo.owner &&
                    <li className="bug-preview" key={todo._id}>
                        <TodoPreview todo={todo} />
                        <div>
                            <button onClick={() => removeTodo(todo._id)}>x</button>
                            <button onClick={() => saveTodo(todo)}>Edit</button>
                        </div>
                        <Link to={`/todo/${todo._id}`}>Details</Link>
                    </li>
                ))
                }
            </ul >}
        </section>
    )

}