import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router'
import { Ava, DangerBtn } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveTab } from '../redux/action'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

const Header = React.memo(function Header() {
    const dispatch = useDispatch()

    const history = useHistory()
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const activeTab = useSelector(({ tab }) => tab.activeTab)

    const isAuth = useSelector(({ user }) => user.isAuthenticated)
    const isAdmin = useSelector(({ user }) => user.isAdmin)
    const logout = useSelector(({ user }) => user.logout)
    const { firstName, lastname } = useSelector(({ user }) => user)

    const handleChange = (event, newValue) => {
        dispatch(setActiveTab(newValue))
        setValue(newValue)

        const data = JSON.parse(localStorage.getItem('userData'))

        localStorage.setItem(
            'userData',
            JSON.stringify({
                ...data,
                activeTab: newValue
            }),
        )
    }

    const linkToFaq = () => {
        history.push('/faq')
    }

    const linkToMsg = () => {
        history.push('/messanger')
    }

    const linkToAns = () => {
        history.push('/createanswer')
    }

    const exit = () => {
        logout()
        history.push('/')
    }

    if (isAuth && isAdmin) {
        return (
            <Paper className={classes.root}>
                <div className="logo">
                    <h1>Resolver</h1>
                </div>
                {isAdmin &&
                    <>
                        <Tabs
                            value={activeTab}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Часто задаваемые вопросы" onClick={linkToFaq} />
                            <Tab label="Сообщения" onClick={linkToMsg} />
                            <Tab label="добавить +" onClick={linkToAns} />
                        </Tabs>
                        <div className="user">
                            <h3>{firstName + ' ' + lastname}</h3>
                            <Ava userName={firstName.split('')[0]} />
                            <DangerBtn onClick={exit} />
                        </div>
                    </>
                }
            </Paper>
        )
    }


    if (isAuth) {
        return (
            <Paper className={classes.root}>
                <div className="logo">
                    <h1>Resolver</h1>
                </div>
                <>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Часто задаваемые вопросы" onClick={linkToFaq} />
                        <Tab label="Сообщения" onClick={linkToMsg} />
                    </Tabs>
                    <div className="user">
                        <h3>{firstName + ' ' + lastname}</h3>
                        <Ava userName={firstName.split('')[0]} />
                        <DangerBtn onClick={exit} />
                    </div>
                </>
            </Paper>
        )
    }

    // default below
    return (
        <Paper className={classes.root}>
            <div className="logo">
                <h1>Resolver</h1>
            </div>
        </Paper>
    )
})

export default Header
