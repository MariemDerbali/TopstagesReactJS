import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import tableIcons from "../coordinateur/MaterialTableIcons";
import './myStyle.css';
import Loading from '../coordinateur/Loading';


export default function Questions() {


    const [loading, setLoading] = useState(true);

    const [questions, setQuestion] = useState([]);
    useEffect(() => {

        axios.get('/api/questions').then(res => {
            if (res.data.status === 200) {

                setQuestion(res.data.questions);
                setLoading(false);
            }

        });
    }, []);


    if (loading) {
        return <Loading />
    }

    else {
        return (
            <div className="row">
                <div className="col-12">
                    <MaterialTable
                        columns={[
                            {
                                title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Question image</h1>
                                , render: questions => {
                                    return (
                                        <div className="d-flex px-2 py-1">
                                            <div>
                                                {questions.questionImage ? <img src={`http://127.0.0.1:8000/${questions.questionImage}`} className="avatar avatar-sm me-3" alt="user1" /> : <span className="badge rounded-pill bg-light text-dark">Sans image</span>}
                                            </div>

                                        </div>)
                                }

                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Question text</h1>
                                , render: (questions) => {
                                    return (
                                        <div>
                                            {questions.questionText ? <p className="text-xs font-weight-bold mb-0">{questions.questionText}</p> : <span className="badge rounded-pill bg-light text-dark">Sans texte</span>}
                                        </div>
                                    )
                                }

                            },
                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Niveau</h1>
                                , render: (questions) => {
                                    return (
                                        <p className="text-xs font-weight-bold mb-0 ">{questions.niveau}</p>)
                                }
                                ,

                                customFilterAndSearch: (term, questions) => ((questions.niveau).toLowerCase()).indexOf(term.toLowerCase()) != -1


                            },

                            {
                                title: <h1 className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Durée (s)</h1>, render: questions => {
                                    return (
                                        <span className="text-xs text-secondary mb-0">{questions.duree}</span>

                                    )
                                }

                                ,

                                customFilterAndSearch: (term, questions) => ((questions.duree).toLowerCase()).indexOf(term.toLowerCase()) != -1


                            },



                            {
                                title: <h1 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Etat</h1>, render: questions => {
                                    return (
                                        <div className="text-xs text-secondary mb-0">

                                            {(questions.etat === 'inactive') ? <span className="badge badge-sm bg-gradient-danger">Désactivé</span> : <span className="badge badge-sm bg-gradient-success">Activé</span>}
                                        </div>
                                    );
                                }
                            },
                            {
                                title: <h1 className="text-secondary opacity-7"></h1>, render: questions => {
                                    return (
                                        <Link to={`edit-question/${questions._id}`} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
                                                <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z" />
                                            </svg>
                                        </Link>)
                                },

                            },


                        ]

                        }
                        data={questions}
                        title={<h6>Liste questions</h6>}
                        icons={tableIcons}

                    />
                </div>
            </div>
        )

    };

}
