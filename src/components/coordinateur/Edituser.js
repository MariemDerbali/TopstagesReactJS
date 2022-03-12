import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Loading from './Loading';

export default function Edituser(props) {

    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const [roleslist, setRoleslist] = useState([

    ]);

    const [depslist, setDepslist] = useState([

    ]);



    const [checkbox, setCheckbox] = useState([]);
    const handleCheckbox = (e) => {
        e.persist();
        setCheckbox({ ...checkbox, [e.target.name]: e.target.checked });
    }

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

        const user_id = props.match.params._id
        axios.get(`/api/edit-user/${user_id}`).then(res => {
            if (res.data.status === 200) {

                // console.log(res.data.user.etat);
                //console.log(res.data.user.etat === "inactive");
                setUser(res.data.user);
                //setCheckbox(res.data.user.etat);


            } else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.push('/coordinateur/Users');
            }
            setLoading(false);
        });

    }, [props.match.params._id, history]);


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



    const handleInput = (e) => {
        e.persist();
        setUser({ ...UserInput, [e.target.name]: e.target.value });
    }


    const [picture, setPicture] = useState([]);
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }





    const updateUser = (e) => {
        e.preventDefault();

        const user_id = props.match.params._id

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
        formData.append('etat', checkbox.etat ? 'inactive' : 'active');


        axios.post(`/api/users/${user_id}`, formData).then(res => {

            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                history.push('/coordinateur/Users');
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.push('/coordinateur/Users')
            }
        });
    }

    if (loading) {
        <Loading />
    }


    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>Modifier utilisateur</h6>
                        </div>
                        <div className="card-body ">

                            <form className="row" onSubmit={updateUser}  >


                                <div className="col-md-6">
                                    <label className="form-label">Matricule</label>
                                    <input type="text" name="matricule" onChange={handleInput} value={UserInput.matricule} className="form-control" placeholder='Matricule' disabled />
                                    <small className="text-danger">{errorlist.matricule}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Nom</label>
                                    <input type="text" name="nom" onChange={handleInput} value={UserInput.nom} className="form-control" placeholder='Nom' disabled />
                                    <small className="text-danger">{errorlist.nom}</small>
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">Prénom</label>
                                    <input type="text" name="prenom" onChange={handleInput} value={UserInput.prenom} className="form-control" placeholder='Prénom' disabled />
                                    <small className="text-danger">{errorlist.prenom}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input type="email" name="email" onChange={handleInput} value={UserInput.email} className="form-control" placeholder='Email' disabled />
                                    <small className="text-danger">{errorlist.email}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Mot de passe</label>
                                    <input type="password" name="password" autoComplete="on" onChange={handleInput} value={UserInput.password} className="form-control" placeholder='Mot de passe' disabled />
                                    <small className="text-danger">{errorlist.password}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Adresse</label>
                                    <input type="text" name="adresse" onChange={handleInput} value={UserInput.adresse} className="form-control" placeholder="Adresse" />
                                    <small className="text-danger">{errorlist.adresse}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Cin/Passeport</label>
                                    <input type="text" name="cinpasseport" onChange={handleInput} value={UserInput.cinpasseport} className="form-control" placeholder="Cin/Passeport" disabled />
                                    <small className="text-danger">{errorlist.cinpasseport}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Tél</label>
                                    <input type="text" name="tel" onChange={handleInput} value={UserInput.tel} className="form-control" placeholder="Tél" />
                                    <small className="text-danger">{errorlist.tel}</small>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Département</label>
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
                                    <label className="form-label">Role</label>
                                    <select name="role_id" onChange={handleInput} value={UserInput.role_id} className="form-select">
                                        <option>Role</option>
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
                                    <input name="image" onChange={handleImage} className="form-control" type="file" id="formFile" />
                                    <small className="text-danger">{errorlist.image}</small>
                                </div>
                                <div className="col-md-6 mt-4">
                                    <div className='form-check'>
                                        <input name="etat" onChange={handleCheckbox} defaultChecked={checkbox.etat === 'inactive' ? true : false} className="form-check-input" id="flexCheckChecked" type="checkbox" />
                                        <label className="form-check-label" >
                                            Cochez pour désactiver l'utilisateur
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-primary">Modifier</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
