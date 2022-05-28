import React, { useState, useEffect } from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import axios from 'axios';
export default function Charts() {

    const [statOffres, setStatOffres] = useState([]);
    useEffect(() => {
        axios.get('/api/stat-offres').then(res => {
            if (res.data.status === 200) {
                setStatOffres(res.data.statOffres);
            }

        });
    }, []);



    return <div className='row mt-5'>
        <div className='col-8'>

            <Bar data={{
                labels: statOffres.map((data) => data.annee),
                datasets: [
                    {
                        label: "Offres des stages publiées",
                        data: statOffres.map((data) => data.offres),
                        backgroundColor: ["#c4e8ff", "#a9bbf6f0", "#ffe0bd", "#cad6fc"]
                    },
                ]
            }} />
        </div>

        <div className='col-4 mb-7'>

            <Pie data={{
                labels: statOffres.map((data) => data.annee),
                datasets: [
                    {
                        label: "Offres",
                        data: statOffres.map((data) => data.offres),
                        backgroundColor: ["#c4e8ff", "#a9bbf6f0", "#ffe0bd", "#cad6fc"]
                    },
                ]
            }} />
        </div>

    </div>
}
