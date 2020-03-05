import React from "react"
import {Route, Switch} from "react-router-dom"

import AppliedRoute from "./components/AppiedRoute"

import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import NotFound from "./pages/errors/NoFound"
import NewNote from "./pages/notas/NewNote"
import Nota from "./pages/nota/Nota"
import Settings from './pages/settings/Settings'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
            <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
            <AuthenticatedRoute path="/notes/new" exact component={NewNote} appProps={appProps} />
            <AuthenticatedRoute path="/notes/:id" exact component={Nota} appProps={appProps} />
            <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />

            {/* Finally, catch all unmatched routes */}
            <Route component={NotFound} />
        </Switch>
    )
}
