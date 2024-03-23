import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { userService } from '../services/user.service.js';
import { login, signup } from '../store/actions/user.actions.js';
import { LoginForm } from './LoginForm.jsx';

const { useState } = React;

export function LoginSignup({ onSetUser }) {
  const [isSignup, setIsSignUp] = useState(false)

  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
    }

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        login(credentials)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

    function _signup(credentials) {
        signup(credentials)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg('Oops try again') })
    }

  return (
    <div className="login-input">
            <form className="login-signup" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username..."

                    value={credentials.username}
                    onChange={handleChange}
                    required
                    autoFocus
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password..."

                    value={credentials.password}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                />

                {isSignup && <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Full name"
                    onChange={handleChange}
                    required
                />}

                <button>{isSignup ? 'Signup' : 'Login'}</button>

            </form>

            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </div>
    )

}
