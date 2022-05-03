import React from 'react'
import Calendar from '../../Topnet/Encadrant/Reunions/Calendar';
export default function Monespace() {
    return (
        <div className='row'>
            <div className='col-md-6'>
                <h5 style={{ color: 'blue' }}>Mon calendrier des réunions</h5>
                <Calendar />
            </div>

            <div className='col-md-6'>

            </div>

        </div>
    )
}
