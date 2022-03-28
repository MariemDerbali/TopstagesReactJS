import React from 'react'

export default function Filter() {
    return (
        <div className="container">
            <div className="row shadow-lg p-3 mb-5 bg-body rounded justify-content-center">

                <div className='col-md-3'>

                    <select className="form-control w-100 mt-2">

                        <option value="all">Type de stage</option>
                        <option value="pfe">Stage PFE</option>
                        <option value="prefectionnement">Stage perfectionnement</option>
                        <option value="initiation">Stage d'initiation</option>


                    </select>
                </div>
                <div className="col-md-3 ">
                    <select className="form-control w-100 mt-2">

                        <option value="all">Domaine de stage</option>
                        <option value="dsi">DSI</option>
                        <option value="mecanique">Mécanique</option>
                        <option value="gestion">Gestion</option>


                    </select>
                </div>
                {/* <div className="col-md-2 ">
                    <button className="btn w-100 mt-2" style={{ backgroundColor: '#111c6b', color: 'white' }}  >Filtrer</button>
    </div>*/}

            </div>

        </div >
    )
}
