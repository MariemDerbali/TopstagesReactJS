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
                    null}
            </div>

            <div className='col-md-6'>

            </div>

        </div>
    )

}
