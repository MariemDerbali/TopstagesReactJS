import React, { useState, useEffect } from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import axios from 'axios';
export default function Charts() {

    const [statStagiaires, setStatStagiaires] = useState([]);
    useEffect(() => {
        axios.get('/api/stat-stagiaires').then(res => {
            if (res.data.status === 200) {
                setStatStagiaires(res.data.statStagiaires);
            }

        });
    }, []);



    return <div className='row mt-5'>
        <div className='col-8'>

            <Bar data={{
                labels: statStagiaires.map((data) => data.annee),
                datasets: [
                    {
                        label: "Stagiaires pris en charge",
                        data: statStagiaires.map((data) => data.stagiaires),
                        backgroundColor: ["#008ac5", "#00a9b5", "#00c698", "#1fe074"]
                    },
                ]
            }} />
        </div>

        <div className='col-4 mb-7'>

            <Pie data={{
                labels: statStagiaires.map((data) => data.annee),
                datasets: [
                    {
                        label: "Offres",
                        data: statStagiaires.map((data) => data.stagiaires),
                        backgroundColor: ["#008ac5", "#00a9b5", "#00c698", "#1fe074"]
                    },
                ]
            }} />
        </div>

    </div>
}
