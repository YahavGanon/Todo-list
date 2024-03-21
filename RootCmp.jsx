const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { Home } from './pages/Home.jsx'
import { TodoIndex } from './pages/TodoIndex.jsx'
import { TodoDetails } from './pages/TodoDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { store } from './store/store.js'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/todo" element={<TodoIndex />} />
                            <Route path="/todo/:todoId" element={<TodoDetails />} />
                            <Route path="/about" element={<AboutUs />} />
                        </Routes>
                    </main>
                    <AppFooter />
                </div>
            </Router>
        </Provider>
    )
}
