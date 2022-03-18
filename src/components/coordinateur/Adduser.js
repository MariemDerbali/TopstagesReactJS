import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

export default function Adduser() {


    const history = useHistory();
    const [roleslist, setRoleslist] = useState([

    ]);
    const [depslist, setDepslist] = useState([

    ]);

    useEffect(() => {
        axios.get('/api/roles').then(res => {
            if (res.data.status === 200) {
                setRoleslist(res.data.roles);
            }
        });

        axios.get('/api/departements').then(res => {
            if (res.data.status === 200) {
                setDepslist(res.data.deps);
            }
        });


    }, []);

    const [UserInput, setUser] = useState({
        matricule: '',
        nom: '',
        prenom: '',
        email: '',
        password: '',
        adresse: '',
        cinpasseport: '',
        tel: '',
        role_id: '',
        departement: '',

    });

    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setUser({ ...UserInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }

    const submitUser = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('role_id', UserInput.role_id);
        formData.append('departement', UserInput.departement);
        formData.append('nom', UserInput.nom);
        formData.append('prenom', UserInput.prenom);
        formData.append('tel', UserInput.tel);
        formData.append('matricule', UserInput.matricule);
        formData.append('cinpasseport', UserInput.cinpasseport);
        formData.append('adresse', UserInput.adresse);
        formData.append('email', UserInput.email);
        formData.append('password', UserInput.password);



        axios.post('/api/users', formData).then(res => {
            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                history.push('/coordinateur/Users')
                // console.log(UserInput.role_id);
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            }
        })
    }

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-8 ">
                    <div className="card mb-4 shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card-header pb-0">
                            <h6>Créer utilisateur</h6>
                        </div>
                        <div className="card-body ">

                            <form className="row" onSubmit={submitUser} >


                                <div className="col-md-6">
                                    <label className="form-label">Matricule</label>
                                    <input onChange={handleInput} value={UserInput.matricule} type="text" name="matricule" className="form-control" placeholder='Matricule' />
                                    <small className="text-danger">{errorlist.matricule}</small>

                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Nom</label>
                                    <input onChange={handleInput} value={UserInput.nom} type="text" name="nom" className="form-control" placeholder='Nom' />
                                    <small className="text-danger">{errorlist.nom}</small>
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">Prénom</label>
                                    <input onChange={handleInput} value={UserInput.prenom} type="text" name="prenom" className="form-control" placeholder='Prénom' />
                                    <small className="text-danger">{errorlist.prenom}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">E-mail</label>
                                    <input onChange={handleInput} value={UserInput.email} type="email" name="email" className="form-control" placeholder='Email' />
                                    <small className="text-danger">{errorlist.email}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Mot de passe</label>
                                    <input onChange={handleInput} value={UserInput.password} type="password" name="password" autoComplete="on" className="form-control" placeholder='Mot de passe' />
                                    <small className="text-danger">{errorlist.password}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Adresse</label>
                                    <input onChange={handleInput} value={UserInput.adresse} type="text" name="adresse" className="form-control" placeholder="Adresse" />
                                    <small className="text-danger">{errorlist.adresse}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Cin/Passeport</label>
                                    <input onChange={handleInput} value={UserInput.cinpasseport} type="text" name="cinpasseport" className="form-control" placeholder="Cin/Passeport" />
                                    <small className="text-danger">{errorlist.cinpasseport}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Téléphone</label>
                                    <input onChange={handleInput} value={UserInput.tel} type="text" name="tel" className="form-control" placeholder="Téléphone" />
                                    <small className="text-danger">{errorlist.tel}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Départements</label>
                                    <select name="departement" onChange={handleInput} value={UserInput.departement} className="form-select">
                                        <option>Départements</option>
                                        {
                                            depslist.map((dep, index) => {
                                                return (
                                                    <option value={dep.id} key={index}>{dep.nomdep}</option>


                                                )
                                            })
                                        }

                                    </select>
                                    <small className="text-danger">{errorlist.departement}</small>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Rôle</label>
                                    <select name="role_id" onChange={handleInput} value={UserInput.role_id} className="form-select">
                                        <option>Rôle</option>
                                        {
                                            roleslist.map((role, index) => {
                                                return (
                                                    <option value={role.id} key={index}>{role.nom}</option>


                                                )
                                            })
                                        }

                                    </select>
                                    <small className="text-danger">{errorlist.role_id}</small>
                                </div>


                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Image</label>
                                    <input onChange={handleImage} name="image" className="form-control" type="file" id="formFile" />
                                    <small className="text-danger">{errorlist.image}</small>
                                </div>

                                <div className="col-md-6 mt-4">
                                    <button type="submit" className="btn btn-primary">Créer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
