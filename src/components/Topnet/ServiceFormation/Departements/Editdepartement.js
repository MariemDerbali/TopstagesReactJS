import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from "../../Coordinateur/MaterialTableIcons";
import Loading from '../../../../layouts/Topnet/Loading';


export default function Editdepartement(props) {


    const [errorlist, setError] = useState([]);

    const [loading, setLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {


        const departement = props.match.params._id

        axios.get(`/api/edit-departement/${departement}`).then(res => {
            if (res.data.status === 200) {
                setDepartement(res.data.departement);

            } else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.push('/serviceformation/Departements');
            }
            setLoading(false);
        });

    }, [props.match.params._id, history]);


    const [DepInput, setDepartement] = useState({
        nomdep: '',
        chefdep: ''
    });


    const handleInput = (e) => {
        e.persist();
        setDepartement({ ...DepInput, [e.target.name]: e.target.value });
    }

    const updateDepartement = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nomdep', DepInput.nomdep);
        formData.append('chefdep', DepInput.chefdep);

        axios.post(`/api/departement/${departement}`, formData).then(res => {

            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                history.push('/serviceformation/Departements');
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.push('/serviceformation/Departements')
            }
        });


    }
    const [service, setServiceList] = useState([

    ]);
    const departement = props.match.params._id
    useEffect(() => {

        axios.get(`/api/services/${departement}`).then(res => {
            if (res.data.status === 200) {
                setServiceList(res.data.services);
            }
        });


    }, [props.match.params._id, history]);




    {/* Activer ou Désactiver service*/ }



    const desactiverService = (e, oid) => {
        e.preventDefault();

        axios.put(`/api/desactiver-service/${oid}`).then(res => {

            if (res.data.status = 200) {
                swal("", res.data.message, "success");
                window.location.reload();
            } else if (res.data.status === 401) {
                swal("", res.data.message, "warning");

            }
        });

    }




    {/* modifier un service*/ }


    const [ServiceUpdateInput, setUpdateService] = useState({
        nomService: '',


    });


    const handleServiceUpdateInput = (e) => {
        e.persist();
        setUpdateService({ ...ServiceUpdateInput, [e.target.name]: e.target.value });
    }



    const [service_id, setServiceID] = useState([]);

    const showFormUpdateService = (e, oid) => {
        e.preventDefault();
        setServiceID(oid);


        axios.get(`/api/edit-service/${oid}`).then(res => {
            if (res.data.status === 200) {
                setUpdateService(res.data.service);
            } else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.push('/serviceformation/Departements');
            }
            setLoading(false);
        });

    }

    const updateService = (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('nomService', ServiceUpdateInput.nomService);


        axios.post(`/api/service/${service_id}`, formData).then(res => {

            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                window.location.reload();
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("", res.data.message, "error");
            }
        });
    }

    {/* ajouter un service*/ }


    const [ServiceInputAdd, setServiceAdd] = useState({
        nomService: '',

    });


    const handleInputServiceAdd = (e) => {
        e.persist();
        setServiceAdd({ ...ServiceInputAdd, [e.target.name]: e.target.value });
    }


    const submitServiceAdd = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nomService', ServiceInputAdd.nomService);

        formData.append('departement', departement);

        axios.post('/api/services', formData).then(res => {
            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                setServiceList(service => [...service, res.data.Service]);
                window.location.reload();
                setError([]);

            } else if (res.data.status === 422) {
                setError(res.data.errors);

            } else if (res.data.status === 423) {
                swal("", res.data.message, "warning");

            }

        })


    }


    if (loading) {
        <Loading />
    }

    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>Modifier département</h6>
                        </div>
                        <div className="card-body ">

                            <form className="row" onSubmit={updateDepartement}  >

                                <div className="row">

                                    <div className="col-md-6">
                                        <label className="form-label">Nom</label>
                                        <input onChange={handleInput} value={DepInput.nomdep} type="text" name="nomdep" className="form-control" placeholder='Nom' disabled />
                                        <small className="text-danger">{errorlist.nomdep}</small>

                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Chef</label>
                                        <input onChange={handleInput} value={DepInput.chefdep} type="text" name="chefdep" className="form-control" placeholder='Chef' required />
                                        <small className="text-danger">{errorlist.chefdep}</small>

                                    </div>

                                    <div className="col-3 mt-4">

                                        <button type="submit" className="btn" style={{ backgroundColor: "#3a416f", color: '#fff' }}>Modifier</button>

                                    </div>
                                    <div className="col-6 mt-4">
                                        <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                            Créer services
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <form onSubmit={submitServiceAdd} >

                                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Créer département</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Nom</label>
                                                        <input onChange={handleInputServiceAdd} value={ServiceInputAdd.nomService} type="text" name="nomService" className="form-control" placeholder='Nom' />
                                                        <small className="text-danger">{errorlist.nomService}</small>

                                                    </div>
                                                </div>

                                            </div>
                                            <div className="modal-footer">
                                                <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                                <button type="submit" className="btn btn-info">Créer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>



                            <div className="row">
                                <div className='col-12'>
                                    <div className="col-12">


                                        <form onSubmit={updateService}>

                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Modifier service</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">

                                                            <div className='row'>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Nom</label>
                                                                    <input onChange={handleServiceUpdateInput} value={ServiceUpdateInput.nomService} type="text" name="nomService" className="form-control" placeholder='Nom' />
                                                                    <small className="text-danger">{errorlist.nomService}</small>

                                                                </div>

                                                            </div>
                                                        </div>


                                                        <div className="modal-footer">
                                                            <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                                            <button type="submit" className="btn btn-info" >Modifier</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>




                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <MaterialTable
                        columns={[



                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nom</h1>
                                , render: (service) => {
                                    return (
                                        <div>
                                            <p className="text-xs font-weight-bold mb-0">{service.nomService}</p>
                                        </div>)
                                }


                            },



                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{ marginLeft: '30px' }}>Etat</h1>, render: service => {
                                    return (
                                        <div>
                                            <Link to='#' onClick={(e) => desactiverService(e, service._id.$oid)}>
                                                {service.etat == 'inactive' ?
                                                    <button className="btn btn-danger">Désactivé</button> :
                                                    <button className="btn btn-success">Activé</button>}
                                            </Link>                                                              &nbsp;  &nbsp;  &nbsp; &nbsp;
                                            <Link to="#" onClick={(e) => showFormUpdateService(e, service._id.$oid)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
                                                    <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z" />
                                                </svg>
                                            </Link>
                                        </div>

                                    )
                                }

                            },
                        ]

                        }
                        data={service}
                        title={<h6>Liste services</h6>}
                        icons={tableIcons}
                        options={{
                            padding: "dense",
                        }}

                    />
                </div>
            </div>
        </div >
    )
}
