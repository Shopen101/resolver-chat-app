import { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, logoutUser } from '../redux/action/index'
import { setActiveTab } from '../redux/action'

const storageName = 'userData'

export const useAuth = () => {
    const dispatch = useDispatch()
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id, firstName, lastname, isAdmin, activeTab) => {
        dispatch(loginUser(jwtToken, id, firstName, lastname, isAdmin, activeTab))

        localStorage.setItem(
            storageName,
            JSON.stringify({
                userId: id,
                token: jwtToken,
                firstName,
                lastname,
                isAdmin,
                activeTab,
            }),
        )
    }, [])

    const logout = useCallback(() => {
        dispatch(logoutUser())

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(
                data.token,
                data.userId,
                data.firstName,
                data.lastname,
                data.isAdmin,
                data.activeTab,
            )
            dispatch(setActiveTab(data.activeTab))
        }

        setReady(true)
    }, [login])

    return { login, logout, ready }
}
