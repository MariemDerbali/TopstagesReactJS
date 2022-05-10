import axios from 'axios'
import React, { useState } from 'react'
import swal from 'sweetalert';
import MaterialTable from 'material-table';
import tableIcons from "../../Coordinateur/MaterialTableIcons";


export default function Adddirection() {


    const [DirectionInput, setDirection] = useState({
        nomdirection: ''
    });

    const [direction, setDirectionID] = useState([]);

    const [DepartmentInput, setdepartment] = useState({
        nomdep: '',
        chefdep: '',
        direction,
    });

    const [Department, setDepList] = useState([]);

    const [errorlist, setError] = useState([]);


    const handleInput = (e) => {
        e.persist();
        setDirection({ ...DirectionInput, [e.target.name]: e.target.value });
    }


    const handleInputdepartment = (e) => {
        e.persist();
        setdepartment({ ...DepartmentInput, [e.target.name]: e.target.value });
    }


    const submitdepartment = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nomdep', DepartmentInput.nomdep);
        formData.append('chefdep', DepartmentInput.chefdep);

        formData.append('direction', direction);

        axios.post('/api/departements', formData).then(res => {
            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                setDepList(Department => [...Department, res.data.Department]);
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            } else if (res.data.status === 423) {
                swal("", res.data.message, "warning");
            }

        })
    }


    const submitDirection = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nomdirection', DirectionInput.nomdirection);

        axios.post('/api/directions', formData).then(res => {
            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                setDirectionID(res.data.DirectionId);
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
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>Créer direction</h6>
                        </div>
                        <div className="card-body ">

                            <form className="row" onSubmit={submitDirection} >
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="form-label">Nom</label>

                                        <input onChange={handleInput} value={DirectionInput.nomdirection}
                                            type="text" name="nomdirection" className="form-control"
                                            placeholder='Nom' />
                                        <small className="text-danger">{errorlist.nomdirection}</small>
                                    </div>


                                    <div className="col-md-6 mt-4">
                                        <button type="submit" className="btn" style={{ backgroundColor: "#3a416f", color: '#fff' }}>Créer</button>
                                        &nbsp; <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Créer départements
                                        </button>
                                    </div>
                                </div>


                            </form>


                            <form onSubmit={submitdepartment}>

                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                        <input onChange={handleInputdepartment} value={DepartmentInput.nomdep} type="text" name="nomdep" className="form-control" placeholder='Nom' />
                                                        <small className="text-danger">{errorlist.nomdep}</small>

                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Chef</label>
                                                        <input onChange={handleInputdepartment} value={DepartmentInput.chefdep} type="text" name="chefdep" className="form-control" placeholder='Chef' />
                                                        <small className="text-danger">{errorlist.chefdep}</small>

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
            </div>

            <div className="row">
                <div className='col-12'>
                    <div className="col-12">
                        <MaterialTable
                            columns={[

                                {
                                    title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nom</h1>
                                    , render: department => {
                                        return (
                                            <span className="text-xs text-secondary mb-0">{department.nomdep}</span>

                                        )
                                    },
                                    customFilterAndSearch: (term, department) => ((department.nomdep).toLowerCase()).indexOf(term.toLowerCase()) != -1

                                },
                                {
                                    title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Chef</h1>
                                    , render: department => {
                                        return (
                                            <span className="text-xs text-secondary mb-0">{department.chefdep}</span>

                                        )
                                    },
                                    customFilterAndSearch: (term, department) => ((department.chefdep).toLowerCase()).indexOf(term.toLowerCase()) != -1

                                },


                            ]

                            }
                            data={Department}
                            title={<h6>Liste départements</h6>}
                            icons={tableIcons}

                        />
                    </div>

                </div>
            </div>

        </div>


    )


}
