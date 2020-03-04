import React from "react"
import {Route, Switch} from "react-router-dom"

import Home from "./components/home/Home"
import NotFound from "./components/errors/NoFound"

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
        </Switch>
    )
}
