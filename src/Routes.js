import React from "react"
import {Route, Switch} from "react-router-dom"

import Home from "./components/home/Home"
import Login from "./components/login/Login"
import NotFound from "./components/errors/NoFound"

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route component={NotFound} />
        </Switch>
    )
}
