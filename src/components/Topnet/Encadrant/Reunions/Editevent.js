import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Loading from '../../../../layouts/Topnet/Loading';
import Datetime from 'react-datetime';


export default function Editevent(props) {


    const [errorlist, setError] = useState([]);

    const [loading, setLoading] = useState(true);

    const history = useHistory();


    const [EventInput, setEvent] = useState({
        title: '',
        start: new Date(),
        end: new Date(),
        url: '',

    });



    const handleInput = (e) => {
        e.persist();
        setEvent({ ...EventInput, [e.target.name]: e.target.value });

    }

    const event_id = props.match.params._id
    useEffect(() => {
        axios.get(`/api/edit-reunion/${event_id}`).then(res => {
            if (res.data.status === 200) {
                setEvent(res.data.reunion);
            } else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.goBack();
            }
            setLoading(false);
        });

    }, [props.match.params._id, history]);



    const updateReunion = (e) => {
        e.preventDefault();

        const event_id = props.match.params._id

        const formData = new FormData();
        formData.append('title', EventInput.title);
        formData.append('url', EventInput.url);
        formData.append('start', EventInput.start);
        formData.append('end', EventInput.end);

        axios.post(`/api/reunions/${event_id}`, formData).then(res => {

            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                history.goBack();
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("", res.data.message, "error");
                history.goBack();
            }
        });
    }



    if (loading) {
        <Loading />
    }


    return (
        <div> <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>Modifier réunion</h6>
                    </div>
                    <div className="card-body ">

                        <form className="row" onSubmit={updateReunion} >

                            <div className="col-md-6">
                                <label className="form-label">Titre</label>
                                <input type="text" name="title" onChange={handleInput} value={EventInput.title} className="form-control" placeholder='Titre' />
                                <small className="text-danger">{errorlist.title}</small>

                            </div>


                            <div className="col-md-6">
                                <label className="form-label">Début</label>

                                <Datetime onChange={handleInput} value={EventInput.start} name="start" />
                                <small className="text-danger">{errorlist.start}</small>

                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Fin</label>

                                <Datetime onChange={handleInput} value={EventInput.end} name="end" />
                                <small className="text-danger">{errorlist.end}</small>

                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Lien</label>
                                <input type="text" name="lien" onChange={handleInput} value={EventInput.url} className="form-control" placeholder='Url' />
                                <small className="text-danger">{errorlist.url}</small>

                            </div>



                            <div className="col-md-6 mt-3">
                                <button type="submit" className="btn btn-primary">Modifier</button>

                            </div>


                        </form>


                    </div>
                </div>
            </div>
        </div></div>
    )
}
