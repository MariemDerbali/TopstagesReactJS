import axios from 'axios'
import React, { useState } from 'react'
import swal from 'sweetalert';
import MaterialTable from 'material-table';
import tableIcons from "../../Coordinateur/MaterialTableIcons";


export default function Adddepartement() {


    const [DepInput, setDepartement] = useState({
        nomdep: '',
        chefdep: ''
    });

    const [departement, setDepartementID] = useState([]);

    const [ServiceInput, setservice] = useState({
        nomService: '',
        departement,
    });

    const [Service, setServiceList] = useState([]);

    const [errorlist, setError] = useState([]);


    const handleInput = (e) => {
        e.persist();
        setDepartement({ ...DepInput, [e.target.name]: e.target.value });
    }


    const handleInputservice = (e) => {
        e.persist();
        setservice({ ...ServiceInput, [e.target.name]: e.target.value });
    }


    const submitservice = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nomService', ServiceInput.nomService);

        formData.append('departement', departement);

        axios.post('/api/services', formData).then(res => {
            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                setServiceList(Service => [...Service, res.data.Service]);
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            } else if (res.data.status === 423) {
                swal("", res.data.message, "warning");
            }

        })
    }


    const submitDepartement = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nomdep', DepInput.nomdep);
        formData.append('chefdep', DepInput.chefdep);

        axios.post('/api/departements', formData).then(res => {
            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                setDepartementID(res.data.DepartementId);
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            } else if (res.data.status === 505) {
                swal("", res.data.message, "warning");
            }

        })
    }



    return (

        <div>
            <div className="row">
                <div className="col-6">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>Créer département</h6>
                        </div>
                        <div className="card-body ">

                            <form className="row" onSubmit={submitDepartement} >
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="form-label">Nom</label>

                                        <input onChange={handleInput} value={DepInput.nomdep}
                                            type="text" name="nomdep" className="form-control"
                                            placeholder='Nom' />
                                        <small className="text-danger">{errorlist.nomdep}</small>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Chef</label>

                                        <input onChange={handleInput} value={DepInput.chefdep}
                                            type="text" name="chefdep" className="form-control"
                                            placeholder='Chef' />
                                        <small className="text-danger">{errorlist.chefdep}</small>
                                    </div>


                                    <div className="col-md-3 mt-4">
                                        <button type="submit" className="btn" style={{ backgroundColor: "#3a416f", color: '#fff' }}>Créer</button>

                                    </div>
                                    <div className="col-6 mt-4">
                                        <button type="button" className="btn   btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Créer services
                                        </button>
                                    </div>
                                </div>


                            </form>


                            <form onSubmit={submitservice}>

                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Créer service</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Nom</label>
                                                        <input onChange={handleInputservice} value={ServiceInput.nomService} type="text" name="nomService" className="form-control" placeholder='Nom' />
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


                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <MaterialTable
                        columns={[

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nom</h1>
                                , render: service => {
                                    return (
                                        <span className="text-xs text-secondary mb-0">{service.nomService}</span>

                                    )
                                },
                                customFilterAndSearch: (term, service) => ((service.nomService).toLowerCase()).indexOf(term.toLowerCase()) != -1

                            }

                        ]

                        }
                        data={Service}
                        title={<h6>Liste services</h6>}
                        icons={tableIcons}
                        options={{
                            padding: "dense",
                        }}

                    />
                </div>
            </div>




        </div>





    )


}
