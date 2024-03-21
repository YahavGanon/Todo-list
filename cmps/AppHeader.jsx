import { LoginSignup } from './LoginSignup.jsx';
import { userService } from '../services/user.service.js';

const { NavLink } = ReactRouterDOM
const { useState, useEffect } = React
const { useNavigate } = ReactRouter;

import { UserMsg } from './UserMsg.jsx'

export function AppHeader() {
  const navigate = useNavigate()
  const [user, setUser] = useState(userService.getLoggedinUser())

  function onLogout() {
    userService.logout()
      .then(() => {
        onSetUser(null)
      })
      .catch((err) => {
        showErrorMsg('OOPs try again')
      })
  }

  function onSetUser(user) {
    setUser(user)
    navigate('/')
  }

  return (
    <header>
      <UserMsg />
      <nav>
        <NavLink to="/">Home</NavLink> |<NavLink to="/todo">Todos</NavLink> |
        <NavLink to="/about">About</NavLink>
      </nav>
      <h1>Todos app</h1>

      {user ? (
        <section>
          <span to={`/user/${user._id}`}>
            Hello {user.fullname} 🍌<span></span>
          </span>
          <button onClick={onLogout}>Logout</button>
        </section>
      ) : (
        <section>
          <LoginSignup onSetUser={onSetUser} />

        </section>
      )}
      <UserMsg />

    </header>
  )
}
