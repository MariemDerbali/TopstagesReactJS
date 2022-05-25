import React, { useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import MasterLayouts from '../layouts/Stagiaire/MasterLayouts';
import axios from 'axios';
import Loading from '../layouts/Stagiaire/Loading';
import swal from 'sweetalert';

////Pour protéger les routes pour le stagiaire
export default function StagiairePrivateRoute({ ...rest }) {

    const [AuthenticatedStagiaire, setAuthenticatedStagiaire] = useState(false);
    const [loading, setloading] = useState(true);
    const history = useHistory();



    //Pour vérifier que l'utilisateur authentifié est un stagiaire
    useEffect(() => {
        axios.get('api/checkingStagiaire').then(res => {
            if (res.status === 200) {
                setAuthenticatedStagiaire(true);

            }
            setloading(false);

        });
        return () => {
            setAuthenticatedStagiaire(false);
        }

    }, []);

    //diriger vers la page d'authentification si l'utilisateur n'est pas authentifié
    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            history.push('/auth');
        }
        return Promise.reject(err);
    });


    //Si l'utilisateur authentifié n'est pas un stagiaire
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 403)//Accès refusé
        {
            swal("Interdit", error.response.data.message, "warning");
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
                AuthenticatedStagiaire ?//Si l'utilisateur est authentifié , autorisation d'accès aux fonctionnalités de la barre latérale (sidebar)
                    (<MasterLayouts {...props} />) :
                    //Sinon diriger l'utilisateur vers la page d'authentification
                    (<Redirect to={{ pathname: "/auth", state: { from: location } }} />)
            }
        />
    )
}