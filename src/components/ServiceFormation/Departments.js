import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from "../coordinateur/MaterialTableIcons";

import Loading from '../coordinateur/Loading';

export default function Departments() {


    const [loading, setLoading] = useState(true);

    const [deps, setDepartment] = useState([]);

    useEffect(() => {

        axios.get('/api/departments').then(res => {
            if (res.data.status === 200) {
                setDepartment(res.data.deps);
                setLoading(false);
            }

        });
    }, []);


    if (loading) {
        return <Loading />
    }

    else {
        return (
            <div className="row">
                <div className="col-12">
                    <MaterialTable
                        columns={[


                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nom département</h1>
                                , render: (deps) => {
                                    return (
                                        <p className="text-xs font-weight-bold mb-0">{deps.nomdep}</p>)
                                }
                                ,

                                customFilterAndSearch: (term, deps) => ((deps.nomdep).toLowerCase()).indexOf(term.toLowerCase()) != -1


                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Chef département</h1>, render: deps => {
                                    return (
                                        <span className="text-xs text-secondary mb-0">{deps.chefdep}</span>

                                    )
                                },
                                customFilterAndSearch: (term, deps) => ((deps.chefdep).toLowerCase()).indexOf(term.toLowerCase()) != -1

                            },
                            {
                                title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-7">Etat</h1>, render: deps => {
                                    return (
                                        <div className="align-middle text-center text-sm">

                                            {(deps.etat === 'inactive') ? <span className="badge badge-sm bg-gradient-danger">Désactivé</span> : <span className="badge badge-sm bg-gradient-success">Activé</span>}
                                        </div>
                                    );
                                }
                            },
                            {
                                title: <h1 className="text-secondary opacity-7 "></h1>, render: deps => {
                                    return (
                                        <Link to={`edit-department/${deps._id}`} >   <svg className="text-dark" width="16px" height="16px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <title>settings</title>
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <g transform="translate(-2020.000000, -442.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                    <g transform="translate(1716.000000, 291.000000)">
                                                        <g transform="translate(304.000000, 151.000000)">
                                                            <polygon className="color-background" opacity="0.596981957" points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667">
                                                            </polygon>
                                                            <path className="color-background" d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z" opacity="0.596981957"></path>
                                                            <path className="color-background" d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z">
                                                            </path>
                                                        </g>
                                                    </g>
                                                </g>

                                            </g>
                                        </svg></Link>)
                                },

                            },


                        ]

                        }
                        data={deps}
                        title={<h6>Liste départements</h6>}
                        icons={tableIcons}

                    />
                </div>
            </div>
        )

    };

}
