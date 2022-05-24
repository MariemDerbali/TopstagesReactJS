import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import swal from 'sweetalert';
import Loading from './Loading';


export default function Sidebar() {



    //Le useState() est un Hook qui vous permet d'avoir des variables d'état dans les composants fonctionnels.
    // Le premier élément est l’état initial et le second est une fonction qui est utilisée pour mettre à jour l’état.
    //Variables d'état pour obtenir la liste des utilisateurs
    const [user, setUser] = useState([]);

    //On utilise ce Hook -> useEFect() pour indiquer à React que notre composant doit exécuter quelque chose après chaque affichage
    useEffect(() => {
        //l'API de l'utilisateur authentifié actuel
        axios.get('/api/currentuser').then(res => { //si l'utilisateur est trouvé
            if (res.data.status === 200) {
                //stockage de l'utilisateur authentifié actuel dans les variables d'état
                setUser(res.data.currentuser);
            } else if (res.data.status === 404) {//si l'utilisateur non trouvé
                //afficher un message d'erreur
                swal("", res.data.message, "error");
            }
        });
    }, []);


    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main" style={{ backgroundColor: '#081339' }} >
            <div className="sidenav-header mb-4">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                <Link className="navbar-brand m-0" to="#" target="_blank">

                    <img src="/assets/img/logos/logo-topstages.png" className="navbar-brand-img h-100" style={{ maxHeight: '80px', marginLeft: '35px' }} alt="main_logo" />
                </Link>
            </div>

            <hr style={{ marginTop: '40px', width: "170px", marginLeft: '35px' }} />
            {user.role_id === 'ServiceFormation' ?//si l'ustilisateur authentifié actuel est un service formation

                //afficher ses fonctionnalités dans la barre latérale
                <div className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100" id="sidenav-collapse-main">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link className="nav-link active " to="/serviceformation/dashboard">
                                <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#09288C' }}>
                                    <svg width="12px" height="20px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <title>spaceship</title>
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g transform="translate(-1720.000000, -592.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                <g transform="translate(1716.000000, 291.000000)">
                                                    <g transform="translate(4.000000, 301.000000)">
                                                        <path className="color-background" d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z"></path>
                                                        <path className="color-background opacity-6" d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z"></path>
                                                        <path className="color-background opacity-6" d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z"></path>
                                                        <path className="color-background opacity-6" d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <span className="nav-link-text ms-1" >Tableau de bord</span>
                            </Link>
                        </li>
                        <li className="nav-item">

                            <Link className="nav-link  " to="/serviceformation/demandesdestage">
                                <div className="icon-shape icon-sm shadow border-radius-md  text-center d-flex align-items-center justify-content-center  me-2" style={{ color: 'white', backgroundColor: '#33A3EC' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                    </svg>
                                </div>
                                <span className="nav-link-text ms-1" style={{ color: "#fff" }}>Demandes de stage</span>
                            </Link>
                        </li>

                        <li className="nav-item">

                            <Link className="nav-link" data-bs-target="#tables-nav" data-bs-toggle="collapse" to="#">


                                <div className="icon-shape icon-sm shadow border-radius-md  text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#33A3EC' }}>
                                    <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <title>office</title>
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                <g transform="translate(1716.000000, 291.000000)">
                                                    <g id="office" transform="translate(153.000000, 2.000000)">
                                                        <path className="color-background opacity-6" d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"></path>
                                                        <path className="color-background" d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <span className="nav-link-text ms-0" style={{ color: "#fff" }}>Départements</span>
                            </Link>
                            <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                <li style={{ marginLeft: '80px' }}>

                                    <Link to="/serviceformation/Adddepartement" style={{ color: "#c2beb7" }}  >
                                        <span style={{ fontSize: "14px" }}>Créer</span>
                                    </Link>
                                </li>
                                <li style={{ marginLeft: '80px' }}>

                                    <Link to="/serviceformation/Departements" style={{ color: "#c2beb7" }}  >
                                        <span style={{ fontSize: "14px" }}>Consulter</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>


                        <li className="nav-item">

                            <Link className="nav-link" data-bs-target="#tables-nav2" data-bs-toggle="collapse" to="#">


                                <div className=" icon-shape icon-sm shadow border-radius-md  text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#33A3EC' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                                    </svg>
                                </div>
                                <span className="nav-link-text ms-1" style={{ color: "#fff" }}>Questions</span>
                            </Link>
                            <ul id="tables-nav2" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                <li style={{ marginLeft: '80px' }}>
                                    <Link to="/serviceformation/Addquestion" style={{ color: "#c2beb7" }} >
                                        <span style={{ fontSize: "14px" }}>Créer</span>
                                    </Link>
                                </li>
                                <li style={{ marginLeft: '80px' }}>
                                    <Link to="/serviceformation/Questions" style={{ color: "#c2beb7" }}>
                                        <span style={{ fontSize: "14px" }}>Consulter</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-item">

                            <Link className="nav-link" data-bs-target="#tables-nav3" data-bs-toggle="collapse" to="#">


                                <div className="icon-shape icon-sm shadow border-radius-md  text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#33A3EC' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                                    </svg>
                                </div>
                                <span className="nav-link-text ms-1" style={{ color: "#fff" }}>Critères</span>
                            </Link>
                            <ul id="tables-nav3" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                <li style={{ marginLeft: '80px' }}>
                                    <Link to="/serviceformation/Addcritere" style={{ color: "#c2beb7" }}>
                                        <span style={{ fontSize: "14px" }}>Créer</span>
                                    </Link>
                                </li>
                                <li style={{ marginLeft: '80px' }}>
                                    <Link to="/serviceformation/Criteres" style={{ color: "#c2beb7" }}>
                                        <span style={{ fontSize: "14px" }}>Consulter</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>

                    </ul>
                </div>

                : user.role_id === 'Coordinateur' ?//sinon si l'ustilisateur authentifié actuel est un coordinateur

                    <div className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100" id="sidenav-collapse-main">
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/coordinateur/dashboard">

                                    <div className=" icon-shape icon-sm shadow border-radius-md me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#09288C' }} >
                                        <svg width="12px" height="20px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" >
                                            <title>spaceship</title>
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" >
                                                <g transform="translate(-1720.000000, -592.000000)" fill="#FFFFFF" fillRule="nonzero" >
                                                    <g transform="translate(1716.000000, 291.000000)">
                                                        <g transform="translate(4.000000, 301.000000)">
                                                            <path className="color-background" d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z"></path>
                                                            <path className="color-background opacity-6" d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z"></path>
                                                            <path className="color-background opacity-6" d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z"></path>
                                                            <path className="color-background opacity-6" d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <span className="nav-link-text ms-1"  >Tableau de bord</span>
                                </Link>
                            </li>

                            <li className="nav-item">

                                <Link className="nav-link" data-bs-target="#tables-nav" data-bs-toggle="collapse" to="#"  >


                                    <div className=" icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#33A3EC' }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                            <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                        </svg>
                                    </div>
                                    <span className="nav-link-text ms-1" style={{ color: "#fff" }}>Utilisateurs</span>
                                </Link>
                                <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                    <li style={{ marginLeft: '80px' }}>
                                        <Link to="/coordinateur/Adduser"   >
                                            <span style={{ fontSize: "14px", color: "#c2beb7" }}>Créer</span>
                                        </Link>
                                    </li>
                                    <li style={{ marginLeft: '80px' }}>
                                        <Link to="/coordinateur/Users" >
                                            <span style={{ fontSize: "14px", color: "#c2beb7" }}>  Consulter</span>
                                        </Link>
                                    </li>


                                </ul>
                            </li>


                        </ul>
                    </div>

                    : user.role_id === 'Encadrant' ?//sinon si l'ustilisateur authentifié actuel est un encadrant
                        <div className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100" id="sidenav-collapse-main">
                            <ul className="navbar-nav ">
                                <li className="nav-item">
                                    <Link className="nav-link active " to="/encadrant/dashboard">
                                        <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#09288C' }} >
                                            <svg width="12px" height="20px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                <title>spaceship</title>
                                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <g transform="translate(-1720.000000, -592.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(4.000000, 301.000000)">
                                                                <path className="color-background" d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z"></path>
                                                                <path className="color-background opacity-6" d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z"></path>
                                                                <path className="color-background opacity-6" d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z"></path>
                                                                <path className="color-background opacity-6" d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z"></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <span className="nav-link-text ms-1"  >Tableau de bord</span>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link  " to="/encadrant/demandes">
                                        <div className="icon-shape icon-sm shadow border-radius-md  text-center d-flex align-items-center justify-content-center  me-2" style={{ color: 'white', backgroundColor: '#33A3EC' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                            </svg>
                                        </div>
                                        <span className="nav-link-text ms-1" style={{ color: "#3a416f" }}>Demandes de stage</span>
                                    </Link>
                                </li>
                                <li className="nav-item">

                                    <Link className="nav-link" data-bs-target="#tables-nav" data-bs-toggle="collapse" to="#">


                                        <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#33A3EC' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                            </svg>
                                        </div>
                                        <span className="nav-link-text ms-1" style={{ color: "#3a416f" }}>Offres de stage</span>
                                    </Link>
                                    <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                        <li style={{ marginLeft: '80px' }}>

                                            <Link to="/encadrant/Addoffre" style={{ color: "#09288C" }}>
                                                <span style={{ fontSize: "14px" }}>Créer</span>
                                            </Link>
                                        </li>
                                        <li style={{ marginLeft: '80px' }}>

                                            <Link to="/encadrant/Offres" style={{ color: "#09288C" }}>
                                                <span style={{ fontSize: "14px" }}>Consulter</span>
                                            </Link>
                                        </li>

                                    </ul>
                                </li>
                                <li className="nav-item">

                                    <Link className="nav-link" data-bs-target="#tables-navreunions" data-bs-toggle="collapse" to="#">


                                        <div className="icon-shape icon-sm shadow border-radius-md  text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#33A3EC' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                            </svg>
                                        </div>
                                        <span className="nav-link-text ms-1" style={{ color: "#3a416f" }}>Réunions</span>
                                    </Link>
                                    <ul id="tables-navreunions" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                        <li style={{ marginLeft: '80px' }}>
                                            <Link to="/encadrant/calendrier" style={{ color: "#09288C" }}>
                                                <span style={{ fontSize: "14px" }}>Créer</span>
                                            </Link>


                                        </li>
                                        <li style={{ marginLeft: '80px' }}>

                                            <Link to="/encadrant/reunions" style={{ color: "#09288C" }} >
                                                <span style={{ fontSize: "14px" }}>Consulter</span>
                                            </Link>
                                        </li>

                                    </ul>
                                </li>

                            </ul>
                        </div>
                        :
                        user.role_id === 'ChefDepartement' ?///sinon si l'ustilisateur authentifié actuel est un chef département
                            <div className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100" id="sidenav-collapse-main">
                                <ul className="navbar-nav ">
                                    <li className="nav-item">
                                        <Link className="nav-link active " to="/chefdepartement/dashboard">
                                            <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#09288C' }} >
                                                <svg width="12px" height="20px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                    <title>spaceship</title>
                                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                        <g transform="translate(-1720.000000, -592.000000)" fill="#FFFFFF" fillRule="nonzero">
                                                            <g transform="translate(1716.000000, 291.000000)">
                                                                <g transform="translate(4.000000, 301.000000)">
                                                                    <path className="color-background" d="M39.3,0.706666667 C38.9660984,0.370464027 38.5048767,0.192278529 38.0316667,0.216666667 C14.6516667,1.43666667 6.015,22.2633333 5.93166667,22.4733333 C5.68236407,23.0926189 5.82664679,23.8009159 6.29833333,24.2733333 L15.7266667,33.7016667 C16.2013871,34.1756798 16.9140329,34.3188658 17.535,34.065 C17.7433333,33.98 38.4583333,25.2466667 39.7816667,1.97666667 C39.8087196,1.50414529 39.6335979,1.04240574 39.3,0.706666667 Z M25.69,19.0233333 C24.7367525,19.9768687 23.3029475,20.2622391 22.0572426,19.7463614 C20.8115377,19.2304837 19.9992882,18.0149658 19.9992882,16.6666667 C19.9992882,15.3183676 20.8115377,14.1028496 22.0572426,13.5869719 C23.3029475,13.0710943 24.7367525,13.3564646 25.69,14.31 C26.9912731,15.6116662 26.9912731,17.7216672 25.69,19.0233333 L25.69,19.0233333 Z"></path>
                                                                    <path className="color-background opacity-6" d="M1.855,31.4066667 C3.05106558,30.2024182 4.79973884,29.7296005 6.43969145,30.1670277 C8.07964407,30.6044549 9.36054508,31.8853559 9.7979723,33.5253085 C10.2353995,35.1652612 9.76258177,36.9139344 8.55833333,38.11 C6.70666667,39.9616667 0,40 0,40 C0,40 0,33.2566667 1.855,31.4066667 Z"></path>
                                                                    <path className="color-background opacity-6" d="M17.2616667,3.90166667 C12.4943643,3.07192755 7.62174065,4.61673894 4.20333333,8.04166667 C3.31200265,8.94126033 2.53706177,9.94913142 1.89666667,11.0416667 C1.5109569,11.6966059 1.61721591,12.5295394 2.155,13.0666667 L5.47,16.3833333 C8.55036617,11.4946947 12.5559074,7.25476565 17.2616667,3.90166667 L17.2616667,3.90166667 Z"></path>
                                                                    <path className="color-background opacity-6" d="M36.0983333,22.7383333 C36.9280725,27.5056357 35.3832611,32.3782594 31.9583333,35.7966667 C31.0587397,36.6879974 30.0508686,37.4629382 28.9583333,38.1033333 C28.3033941,38.4890431 27.4704606,38.3827841 26.9333333,37.845 L23.6166667,34.53 C28.5053053,31.4496338 32.7452344,27.4440926 36.0983333,22.7383333 L36.0983333,22.7383333 Z"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <span className="nav-link-text ms-1"  >Tableau de bord</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link " to="/chefdepartement/encadrants">
                                            <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#33A3EC' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-workspace" viewBox="0 0 16 16">
                                                    <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                    <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
                                                </svg>
                                            </div>
                                            <span className="nav-link-text ms-1" style={{ color: "#fff" }}>Encadrants</span>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link  " to="/chefdepartement/demandes">
                                            <div className="icon-shape icon-sm shadow border-radius-md  text-center d-flex align-items-center justify-content-center  me-2" style={{ color: 'white', backgroundColor: '#33A3EC' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                                </svg>
                                            </div>
                                            <span className="nav-link-text" style={{ color: "#fff" }}>Demandes stage</span>
                                        </Link>
                                    </li>

                                    <li className="nav-item">

                                        <Link className="nav-link" data-bs-target="#tables-nav" data-bs-toggle="collapse" to="#">


                                            <div className="icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#33A3EC' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                                </svg>
                                            </div>
                                            <span className="nav-link-text ms-1" style={{ color: "#fff" }}>Offres de stage</span>
                                        </Link>
                                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                            <li style={{ marginLeft: '80px' }}>
                                                <Link to="/chefdepartement/Addoffre" style={{ color: "#c2beb7" }}>
                                                    <span style={{ fontSize: "14px" }}>Créer</span>
                                                </Link>
                                            </li>
                                            <li style={{ marginLeft: '80px' }}>
                                                <Link to="/chefdepartement/Offres" style={{ color: "#c2beb7" }}>
                                                    <span style={{ fontSize: "14px" }}>Consulter</span>
                                                </Link>
                                            </li>

                                        </ul>
                                    </li>
                                    <li className="nav-item">

                                        <Link className="nav-link" data-bs-target="#tables-navreunions" data-bs-toggle="collapse" to="#">


                                            <div className="icon-shape icon-sm shadow border-radius-md  text-center me-2 d-flex align-items-center justify-content-center" style={{ color: 'white', backgroundColor: '#33A3EC' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                                                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                                    <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                </svg>
                                            </div>
                                            <span className="nav-link-text ms-1" style={{ color: "#fff" }}>Réunions</span>
                                        </Link>
                                        <ul id="tables-navreunions" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                            <li style={{ marginLeft: '80px' }}>
                                                <Link to="/chefdepartement/calendrier" style={{ color: "#c2beb7" }}>
                                                    <span style={{ fontSize: "14px" }}>Créer</span>
                                                </Link>

                                            </li>
                                            <li style={{ marginLeft: '80px' }}>
                                                <Link to="/chefdepartement/reunions" style={{ color: "#c2beb7" }}>
                                                    <span style={{ fontSize: "14px" }}>Consulter</span>
                                                </Link>
                                            </li>

                                        </ul>
                                    </li>
                                </ul>
                            </div>


                            :
                            <Loading />//sinon afficher un spinner
            }


        </aside >
    )
}
