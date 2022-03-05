import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'
import Dashboard from '../../components/coordinateur/Dashboard'

import routes from '../../routes/routes'
import { Switch, Route, Redirect } from 'react-router-dom';


export default function MasterLayouts() {
    return (
        <div>
            <Sidebar />
            <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
                <Header />
                <div className="container-fluid py-4">
                    <Switch>
                        {routes.map((route, idx) => {
                            return (
                                route.component && (
                                    <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={(props) => (<route.component {...props} />

                                    )} />
                                )

                            )
                        })}
                        <Redirect from="coordinateur" to="/coordinateur/dashboard" />
                    </Switch>
                    <Footer />
                </div>
            </main>
        </div>
    )
}
