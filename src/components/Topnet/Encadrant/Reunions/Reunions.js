import React, { useRef, useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import frLocale from '@fullcalendar/core/locales/fr';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert';

export default function Reunions() {
    const [errorlist, setError] = useState([]);

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: event.start,
            end: event.end,
            title: event.title,
            url: event.url
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        onEventAdded({
            start,
            end,
            title,
            url,

        })
    }

    async function submitreunions() {

        const formData = new FormData();
        formData.append('title', title);
        formData.append('url', url);
        formData.append('start', start);
        formData.append('end', end);

        await axios.post('/api/reunions', formData).then(res => {
            if (res.data.status === 200) {
                swal("", res.data.message, "success");
                setError([]);
            } else if (res.data.status === 422) {
                setError(res.data.errors);
            }

        })
    }

    useEffect(() => {

        axios.get('/api/reunions').then(res => {
            if (res.data.status === 200) {
                setEvents(res.data.reunions);


            }



        });
    }, []);


    return (
        <div>
            <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Ajouter une réunion</button>
            <form onSubmit={onSubmit} >

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Créer réunion</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="form-label">titre</label>
                                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" className="form-control" placeholder='title' />
                                        <small className="text-danger">{errorlist.title}</small>

                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Url</label>
                                        <input type="text" value={url} onChange={e => setUrl(e.target.value)} name="url" className="form-control" placeholder='URL' />
                                        <small className="text-danger">{errorlist.url}</small>

                                    </div>
                                </div>

                                <div className="row">


                                    <div className="col-md-6">
                                        <label className="form-label">Début</label>

                                        <Datetime value={start} onChange={date => setStart(date)} name="start" />
                                        <small className="text-danger">{errorlist.start}</small>

                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Fin</label>

                                        <Datetime value={end} onChange={date => setEnd(date)} name="end" />
                                        <small className="text-danger">{errorlist.end}</small>

                                    </div>
                                </div>


                            </div>

                            <div className="modal-footer">
                                <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                <button type="submit" className="btn btn-primary">Créer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form >

            <FullCalendar
                ref={calendarRef}
                locale={frLocale}
                plugins={[dayGridPlugin]} initialView="dayGridMonth"

                events={events}

                eventAdd={submitreunions}
                eventClick={
                    function (arg) {
                        var dateObj = arg.event.start;
                        var month = dateObj.getUTCMonth() + 1; //months from 1-12
                        var day = dateObj.getUTCDate();
                        var year = dateObj.getUTCFullYear();
                        var hours = dateObj.getHours();
                        var minutes = dateObj.getMinutes();
                        var dateObjend = arg.event.end;
                        var hoursend = dateObjend.getHours();
                        var minutesend = dateObjend.getMinutes();


                        arg.jsEvent.preventDefault();
                        swal({
                            title: arg.event.title,
                            text: 'Date et heure : le ' + year + "/" + month + "/" + day + ' ' + hours + ':' + minutes + '-' + hoursend + ':' + minutesend + '\n' + 'URL: ' + arg.event.url
                        })

                    }}

            />

        </div >
    )

}
