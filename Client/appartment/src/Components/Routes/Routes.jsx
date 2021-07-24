import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Flats } from '../Flats'
import {OneFlat} from "../ResidentsOfFlat"
import { Login } from '../Login'
import { Navbar } from '../NavBar'

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path = "/">
                    <Navbar/>
                    <br />
                    <br />
                    <br />
                    <h1>Here are all the flats</h1>
                    <Flats/>
                </Route>
                <Route path = "/flat/:id">
                    <Navbar/>
                    <br />
                    <br />
                    <br />
                    <h1>List of Residents</h1>

                    <OneFlat/>
                </Route>
                <Route exact path = "/login">
                    <Login/>
                </Route>
                {/* <Route exact path = "/signup">
                    <SignUp/>
                </Route> */}
                <Route>
                    <h1>Error 404: Page Not Found</h1>
                </Route>
            </Switch>
        </div>
    )
}
