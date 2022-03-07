import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";



export default function Home() {




    const history = useHistory();

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



    return (

        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
            <div className="container-fluid py-1 px-3">

                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">

                    </div>
                    <ul className="navbar-nav  justify-content-end">

                        <li className="nav-item dropdown pe-3">

                            <Link className="nav-link nav-profile d-flex align-items-center pe-0" to="#" data-bs-toggle="dropdown">
                                <img src="/assets/img/ivana-square.jpg" alt="Profile" className="avatar avatar-sm " />
                                <span className="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
                            </Link>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">


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
