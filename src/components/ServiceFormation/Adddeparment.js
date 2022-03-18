import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

export default function Adddeparment() {

    const history = useHistory();
    const [errorlist, setError] = useState([]);

    const [DepInput, setDepartment] = useState({
        nomdep: '',
        chefdep: '',
    });

    const handleInput = (e) => {
        e.persist();
        setDepartment({ ...DepInput, [e.target.name]: e.target.value });
    }


    const submitDepartment = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('nomdep', DepInput.nomdep);
        formData.append('chefdep', DepInput.chefdep);


        axios.post('/api/departments', formData).then(res => {
            if (res.data.status === 200) {
                console.log(res.data.dep);
                swal("", res.data.message, "success");
                history.push('/serviceformation/Departments')

                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            }
        })
    }



    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-8">
                    <div className="card mb-12">
                        <div className="card-header pb-0">
                            <h6>Créer département</h6>
                        </div>
                        <div className="card-body ">

                            <form className="row" onSubmit={submitDepartment} >


                                <div className="col-md-6">
                                    <label className="form-label">Nom département</label>
                                    <input onChange={handleInput} value={DepInput.nomdep} type="text" name="nomdep" className="form-control" placeholder='Nom département' />
                                    <small className="text-danger">{errorlist.nomdep}</small>
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">Chef département</label>
                                    <input onChange={handleInput} value={DepInput.chefdep} type="text" name="chefdep" className="form-control" placeholder='Chef département' />
                                    <small className="text-danger">{errorlist.chefdep}</small>
                                </div>



                                <div className="col-12 mt-4">
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
