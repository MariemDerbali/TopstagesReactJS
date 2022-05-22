import React from 'react'

//Pied de page
export default function Footer() {
    return (
        <footer style={{
            position: 'fixed',
            left: '0',
            bottom: '0',
            width: '100%',
            textAlign: 'center'
        }} >
            <div className="container-fluid mb-3" >
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-8 mx-auto text-center mt-1">
                        <p className="mb-0 text-secondary">
                            © TOPSTAGES 2022
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    )
}
