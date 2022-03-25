import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import Sidebar from '../Sidebar'



import routes from '../../../routes/routes'
import { Switch, Route, Redirect } from 'react-router-dom';


export default function MasterLayouts() {
    return (
        <div>
            <Sidebar /> {/*afficher la barre latérale de page */}
            <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
                <Header /> {/*afficher l'en-tête de page */}
                <div className="container-fluid py-4">
                    <Switch>
                        {/*afficher l'accès aux pages en fonction des options de la barre latérale*/}
                        {routes.map((route, idx) => {
                            return (
                                route.component && (
                                    <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={(props) => (<route.component {...props} />

                                    )} />
                                )

                            )
                        })}
                        {/*La page affichée par défaut est le tableau de bord*/}
                        <Redirect from="coordinateur" to="/coordinateur/dashboard" />
                    </Switch>
                    <Footer /> {/*afficher le pied de page*/}
                </div>
            </main>
        </div>
    )
}
