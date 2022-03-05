import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

export default function Auth() {


    /*REGISTER LOGIC*/
    const history = useHistory();
    const [registerInput, setRegister] = useState({

        nom: '',
        prenom: '',
        cinpasseport: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    });
    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            nom: registerInput.nom,
            prenom: registerInput.prenom,
            cinpasseport: registerInput.cinpasseport,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation

        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if (res.data.status === 200) {
                    //if registration=success
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    //Checking for user role
                    if (res.data.role === '') {
                        historyLogin.push('/');
                    }
                } else { setRegister({ ...registerInput, error_list: res.data.validation_errors }); }
            });
        });



    }

    /*REGISTER LOGIC*/



    /*------------------------------------------------------------*/


    /*LOGIN LOGIC*/


    const historyLogin = useHistory();
    const [loginInput, setLogin] = useState({
        cinpasseport: '',
        password: '',
        error_list: [],

    });

    const handleInputLogin = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            cinpasseport: loginInput.cinpasseport,
            password: loginInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/login', data).then(res => {
                if (res.data.status === 200) {

                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");

                    if (res.data.role === 'Coordinateur') {
                        historyLogin.push('/coordinateur/dashboard');

                    } else {
                        historyLogin.push('/');

                    }

                } else if (res.data.status === 401) {

                    swal("Warning", res.data.message, "warning");

                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });

                }
            });
        });



    }

    /*LOGIN LOGIC*/


    return (
        <div>

            <section className="min-vh-100 mb-8">
                <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style={{ backgroundImage: `url("../assets/img/curved-images/curved14.jpg")` }}>
                    <span className="mask bg-gradient-dark opacity-6"></span>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 text-center mx-auto">
                                <h1 className="text-white mb-2 mt-5">Welcome!</h1>
                                <p className="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-lg-n10 mt-md-n11 mt-n10">

                        <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                            <div className="card z-index-0">
                                <div className="card-header pb-0 text-left bg-transparent">
                                    <h3 className="font-weight-bolder text-info text-gradient">Déjà inscrit?</h3>
                                    <p className="mb-0">Entrez votre cin/passeport et votre mot de passe pour vous connecter </p>
                                </div>
                                <div className="card-body">
                                    <form role="form" onSubmit={loginSubmit}>
                                        <label>Cin/Passeport</label>
                                        <div className="mb-3">
                                            <input onChange={handleInputLogin} value={loginInput.cinpasseport} name="cinpasseport" type="text" className="form-control" placeholder="Cin/Passeport" a-label="Email" aria-describedby="email-addon" />
                                            <span className="text-danger">{loginInput.error_list.cinpasseport}</span>
                                        </div>
                                        <label>Mot de passe</label>
                                        <div className="mb-3">
                                            <input onChange={handleInputLogin} value={loginInput.password} name="password" type="password" className="form-control" placeholder="Mot de passe" aria-label="Password" aria-describedby="password-addon" />
                                            <span className="text-danger">{loginInput.error_list.password}</span>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">Connexion</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>


                        <div className="col-xl-6 ">
                            <div className="card z-index-0">
                                <div className="card-header text-center pt-4">
                                    <h5>Créez votre compte</h5>
                                </div>

                                <div className="card-body">
                                    <form role="form text-left" onSubmit={registerSubmit}>
                                        <div className='row'>


                                            <div className="col-md-6">
                                                <label className="form-label">Nom</label>
                                                <input onChange={handleInput} value={registerInput.nom} type="text" name="nom" className="form-control" placeholder='Nom' />
                                                <span className="text-danger">{registerInput.error_list.nom}</span>
                                            </div>


                                            <div className="col-md-6">
                                                <label className="form-label">Prénom</label>
                                                <input onChange={handleInput} value={registerInput.prenom} type="text" name="prenom" className="form-control" placeholder='Prénom' />
                                                <span className="text-danger">{registerInput.error_list.prenom}</span>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Cin/Passeport</label>
                                                <input onChange={handleInput} value={registerInput.cinpasseport} type="text" name="cinpasseport" className="form-control" placeholder='Cin/Passeport' />
                                                <span className="text-danger">{registerInput.error_list.cinpasseport}</span>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Email</label>
                                                <input onChange={handleInput} value={registerInput.email} type="email" name="email" className="form-control" placeholder='Email' />
                                                <span className="text-danger">{registerInput.error_list.email}</span>
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Mot de passe</label>
                                                <input onChange={handleInput} value={registerInput.password} type="password" name="password" autoComplete="on" className="form-control" placeholder='Mot de passe' />
                                                <span className="text-danger">{registerInput.error_list.password}</span>

                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Confirmez mot de passe</label>
                                                <input onChange={handleInput} value={registerInput.password_confirmation} type="password" name="password_confirmation" autoComplete="on" className="form-control" placeholder="Confirmez mot de passe" />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">S'inscrire</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <footer className="footer py-5">
                <div className="container">

                    <div className="row">
                        <div className="col-8 mx-auto text-center mt-1">
                            <p className="mb-0 text-secondary">
                                © TOPSTAGES 2022
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
