import React from "react"
import {Route, Switch} from "react-router-dom"

import AppliedRoute from "./components/AppiedRoute"

import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import NotFound from "./pages/errors/NoFound"

export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
            {/* Finally, catch all unmatched routes */}
            <Route component={NotFound} />
        </Switch>
    )
}
