import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Faq, Auth, SignUp, Messanger, CreateAnswer } from '../pages'

export const useRoutes = (isAuthenticated, isAdmin) => {
    if (isAuthenticated && isAdmin) {
        return (
            <Switch>
                <Route path="/faq" exact component={Faq} />
                <Route path="/messanger" exact component={Messanger} />
                <Route path="/createanswer" exact component={CreateAnswer} />
                <Redirect to="/faq" />
            </Switch>
        )
    }

    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/faq" exact component={Faq} />
                <Route path="/messanger" exact component={Messanger} />
                <Redirect to="/faq" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Route path="/Signup" exact>
                <SignUp />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

