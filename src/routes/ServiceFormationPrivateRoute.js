import React, { useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import MasterLayouts from '../layouts/ServiceFormation/MasterLayouts';
import axios from 'axios';
import Loading from '../components/coordinateur/Loading';


export default function ServiceFormationPrivateRoute({ ...rest }) {

    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setloading] = useState(true);
    const history = useHistory();

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

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            history.push('/auth');
        }
        return Promise.reject(err);
    });


    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 407)//Access denied
        {
            history.push('/');
        }
        else if (error.response.status === 404)//Page not found
        {
            history.push('/404');
        }
        return Promise.reject(error);
    }

    );

    if (loading) {

        return <div className="row justify-content-center mt-12"> <Loading /></div>
    }

    return (
        <Route {...rest}
            render={({ props, location }) =>
                Authenticated ?
                    (<MasterLayouts {...props} />) :
                    (<Redirect to={{ pathname: "/login", state: { from: location } }} />)
            }
        />
    )
}