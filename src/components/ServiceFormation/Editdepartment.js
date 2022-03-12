import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Loading from '../coordinateur/Loading';

export default function Editdepartment(props) {

    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();


    const [checkbox, setCheckbox] = useState([]);
    const handleCheckbox = (e) => {
        e.persist();
        setCheckbox({ ...checkbox, [e.target.name]: e.target.checked });
    }

    useEffect(() => {


        const dep_id = props.match.params._id
        axios.get(`/api/edit-department/${dep_id}`).then(res => {
            if (res.data.status === 200) {

                // console.log(res.data.user.etat);
                //console.log(res.data.user.etat === "inactive");
                setDepartment(res.data.dep);
                //setCheckbox(res.data.user.etat);


            } else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.push('/serviceformation/Departments');
            }
            setLoading(false);
        });

    }, [props.match.params._id, history]);


    const [DepInput, setDepartment] = useState({
        nomdep: '',
        chefdep: '',

    });



    const handleInput = (e) => {
        e.persist();
        setDepartment({ ...DepInput, [e.target.name]: e.target.value });
    }




    const updateDepartment = (e) => {
        e.preventDefault();

        const dep_id = props.match.params._id

        const formData = new FormData();
        formData.append('nomdep', DepInput.nomdep);
        formData.append('chefdep', DepInput.chefdep);

        formData.append('etat', checkbox.etat ? 'inactive' : 'active');


        axios.post(`/api/departments/${dep_id}`, formData).then(res => {

            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                history.push('/serviceformation/Departments');
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.push('/serviceformation/Departments')
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

                            <form className="row" onSubmit={updateDepartment}  >


                                <div className="col-md-6">
                                    <label className="form-label">Nom département</label>
                                    <input type="text" name="nomdep" onChange={handleInput} value={DepInput.nomdep} className="form-control" placeholder='Nom département' disabled />
                                    <small className="text-danger">{errorlist.nomdep}</small>
                                </div>



                                <div className="col-md-6">
                                    <label className="form-label">Chef département</label>
                                    <input type="text" name="chefdep" onChange={handleInput} value={DepInput.chefdep} className="form-control" placeholder="Chef département" />
                                    <small className="text-danger">{errorlist.chefdep}</small>
                                </div>



                                <div className="col-md-6 mt-3">
                                    <div className='form-check'>
                                        <input name="etat" onChange={handleCheckbox} defaultChecked={checkbox.etat === 'inactive' ? true : false} className="form-check-input" id="flexCheckChecked" type="checkbox" />
                                        <label className="form-check-label" >
                                            Cochez pour désactiver le département
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-6 mt-3">
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
