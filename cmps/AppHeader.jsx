import { LoginSignup } from './LoginSignup.jsx';
import { userService } from '../services/user.service.js';

const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React
const { useSelector } = ReactRedux
const { useNavigate } = ReactRouter;

import { UserMsg } from './UserMsg.jsx'
import { logout } from '../store/actions/user.actions.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

export function AppHeader() {
  const navigate = useNavigate()
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  function onLogout() {
    logout()
      .then(() => {
        showSuccessMsg('Logout successfully')
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
      <div className='entry'>
        <img className='logo-img' src="assets/img/monday-logoo.png" alt="" />
        <img className='wensday-img' src="assets/img/wensday.png" alt="" />
      </div>

      {user ? (
        <section>
          <Link className="user-details" to={`/user/${user._id}`}>
            Hello {user.fullname} 🍌
          </Link>
          <Link to={`/`} onClick={onLogout}>Logout</Link>
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
