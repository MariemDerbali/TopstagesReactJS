import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../../layouts/Topnet/Loading';
import Calendar from '../../Topnet/Encadrant/Reunions/Calendar';

export default function Monespace() {


    const [demandesStage, setDemandeStage] = useState([]);


    useEffect(() => {

        axios.get('/api/mademande').then(res => {
            if (res.data.status === 200) {

                setDemandeStage(res.data.demande);

            }

        });

    }, []);


    return (
        <div className='row'>
            <div className='col-md-6'>
                {demandesStage.etatprise === "vrai" ?
                    <div> <h5 style={{ color: 'blue' }}>Mon calendrier des réunions</h5>

                        <Calendar /></div> :
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ width: '700px', marginLeft: '100px' }}>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="/assets/img/dashboard/topnet-recrutement-2021.png" className="d-block w-100" alt="TOPSTAGES" />
                            </div>
                            <div className="carousel-item">
                                <img src="/assets/img/dashboard/topnet-recrutement-2021.png" className="d-block w-100" alt="TOPSTAGES" />
                            </div>

                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>}
            </div>

            <div className='col-md-6'>

            </div>

        </div>
    )

}
