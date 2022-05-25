import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import "./css/Homestyle.css"
import swal from 'sweetalert';


export default function Postuler() {

    const history = useHistory();


    const [offre, setOffre] = useState([

    ]);

    const { post_id } = useParams();
    useEffect(() => {

        axios.get(`/api/monpost/${post_id}`).then(res => {
            if (res.data.status === 200) {
                setOffre(res.data.post);
            }
        });


    }, []);

    const [picture1, setPicture1] = useState([]);
    const [picture2, setPicture2] = useState([]);
    const [picture3, setPicture3] = useState([]);



    const handleImage1 = (e) => {
        setPicture1({ demandestage: e.target.files[0] });

    }
    const handleImage2 = (e) => {
        setPicture2({ cv: e.target.files[0] });

    }

    const handleImage3 = (e) => {
        setPicture3({ cin: e.target.files[0] });

    }




    const updatePost = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('demandestage', picture1.demandestage);
        formData.append('cv', picture2.cv);
        formData.append('cin', picture3.cin);


        axios.post(`/api/postuler/${post_id}`, formData).then(res => {

            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                history.push('/');
            }
            else {
                console.log(res.data.message);
            }
        });
    }
    return (
        <div>
            <form className="row" onSubmit={updatePost}>

                <div className='col-5 mt-9' style={{ marginLeft: '50px' }} >
                    <img src="../assets/img/postuler/postuler.gif" alt="TOPSTAGES" style={{ maxHeight: '300px' }} />


                </div>

                <div className='col-6' >


                    <div data-aos='zoom-in' className=' p-3 mb-5 mt-5  rounded h-100' >
                        <div className="card ">
                            <div className="card-body">
                                <h6 className="card-title">Je postule à cette offre</h6>
                                <h4 className="card-subtitle mb-2 " style={{ color: '#ef8e1f' }} >{offre.type} en {offre.domaine}</h4>


                                <p className="card-text font-weight-bold">
                                    <label className="form-label">Demande de stage &nbsp;<span style={{ color: 'red' }}>*</span></label>
                                    <input name="demandestage" onChange={handleImage1} className="form-control" type="file" id="formFile" required />

                                </p>
                                <p className="card-text font-weight-bold">
                                    <label className="form-label">CV &nbsp;<span style={{ color: 'red' }}>*</span></label>
                                    <input name="cv" onChange={handleImage2} className="form-control" type="file" id="formFile" required />

                                </p>
                                <p className="card-text font-weight-bold">
                                    <label className="form-label">CIN &nbsp;<span style={{ color: 'red' }}>*</span></label>
                                    <input name="cin" onChange={handleImage3} className="form-control" type="file" id="formFile" required />

                                </p>
                                <hr className="my-4" />

                                <button type="submit" className="btn btn-info ">Postuler!</button>&nbsp;&nbsp;
                                <Link to='/' ><button type="submit" className="btn btn-light ">Annuler</button></Link>

                            </div>
                        </div>
                    </div>


                </div>

            </form>
        </div >
    )
}
