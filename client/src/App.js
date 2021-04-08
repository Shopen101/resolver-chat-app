import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from './hooks/auth.hook'
import { Header } from './pages'
import { setFuncLogInOut } from './redux/action'
import { useRoutes } from './hooks/routes.hook'
import { Loader } from './components'

function App() {
    const isAuthenticated = useSelector(({ user }) => user.isAuthenticated)
    const isAdmin = useSelector(({ user }) => user.isAdmin)

    const { login, logout, ready } = useAuth()
    const routes = useRoutes(isAuthenticated, isAdmin)

    const dispatch = useDispatch()

    dispatch(setFuncLogInOut(login, logout))

    if (!ready) {
        return <Loader />
    }

    return (
        <div className="App">
            <Header />
            <div className="wrapper">{routes}</div>
        </div>
    )
}

export default App
