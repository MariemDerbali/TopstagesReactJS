import React from 'react'

//Un spinner pour indiquer que la page est en cours de chargement
export default function Loading() {
    return (

        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}