import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import Loading from './Loading';


export default function Header() {


    const history = useHistory();

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);


    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if (res.data.status === 200) {

                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                history.push('/auth');

            }

        });

    }


    useEffect(() => {
        axios.get('/api/currentuser').then(res => {
            if (res.data.status === 200) {

                setUser(res.data.currentuser);
                setLoading(false);


            } else if (res.data.status === 404) {
                swal("", res.data.message, "error");
            }
        });
    }, []);



    return (
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
            <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" to="#">Pages</Link></li>
                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Tableau de bord</li>
                    </ol>
                    <h6 className="font-weight-bolder mb-0">{user.role_id}</h6>
                </nav>
                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">

                    </div>
                    <ul className="navbar-nav  justify-content-end">

                        <li className="nav-item dropdown pe-3">
                            {loading ? <Loading /> :
                                <Link className="nav-link nav-profile d-flex align-items-center pe-0" to="#" data-bs-toggle="dropdown">
                                    <img src={`http://127.0.0.1:8000/${user.image}`} alt="Profile" className="avatar avatar-sm " />
                                    <span className="d-none d-md-block dropdown-toggle ps-2">{`${user.nom} ${user.prenom}`}</span>
                                </Link>}

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">

                                {user.role_id == 'ServiceFormation' ? <li>
                                    <Link className="dropdown-item d-flex align-items-center" to="/serviceformation/profil">
                                        <i className="bi bi-person"></i>
                                        <span>Mon profil</span>
                                    </Link>
                                </li> : user.role_id == 'Coordinateur' ?
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center" to="/coordinateur/profil">
                                            <i className="bi bi-person"></i>
                                            <span>Mon profil</span>
                                        </Link>
                                    </li> :
                                    <Loading />
                                }


                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>

                                    <Link className="dropdown-item d-flex align-items-center" to="/auth" onClick={logoutSubmit} >
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Se déconnecter</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}