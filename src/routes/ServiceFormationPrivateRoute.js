import React, { useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import MasterLayouts from '../layouts/ServiceFormation/MasterLayouts';
import axios from 'axios';
import Loading from '../layouts/Loading';


////Pour protéger les routes pour le service formation
export default function ServiceFormationPrivateRoute({ ...rest }) {

    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setloading] = useState(true);
    const history = useHistory();

    //Pour vérifier que l'utilisateur authentifié est un service formation
    useEffect(() => {
        axios.get('api/checkingServiceFormation').then(res => {
            if (res.status === 200) {
                setAuthenticated(true);
            }
            setloading(false);
        });
        return () => {
            setAuthenticated(false);
        }

    }, []);

    //diriger vers la page d'authentification si l'utilisateur n'est pas authentifié
    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            history.push('/auth');
        }
        return Promise.reject(err);
    });


    //Si l'utilisateur authentifié n'est pas un service formation
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 407)//Accès refusé
        {
            history.push('/');
        }//Sinon si la page demandée est introuvable
        else if (error.response.status === 404)//Page introuvable
        {
            history.push('/404');
        }
        return Promise.reject(error);
    }

    );
    //si la page demandée est en cours de chargement afficher un spinner
    if (loading) {

        return <div className="row justify-content-center mt-12"> <Loading /></div>
    }
    //Sidebar
    return (
        <Route {...rest}
            render={({ props, location }) =>
                Authenticated ?//Si l'utilisateur est authentifié , autorisation d'accès aux fonctionnalités de la barre latérale (sidebar)
                    (<MasterLayouts {...props} />) :
                    //Sinon diriger l'utilisateur vers la page d'authentification
                    (<Redirect to={{ pathname: "/login", state: { from: location } }} />)
            }
        />
    )
}