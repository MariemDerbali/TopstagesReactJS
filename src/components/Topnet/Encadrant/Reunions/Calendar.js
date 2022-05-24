import React, { useRef, useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import axios from 'axios';
import swal from 'sweetalert';
import 'moment/locale/fr';
import moment from 'moment'

export default function Calendar() {
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
                console.log(moment(start).toDate());
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


    const handleStart = (date) => {
        setStart(moment(date).toDate());
    }
    const handleEnd = (date) => {
        setEnd(moment(date).toDate());
    }
    const handleTitle = (e) => {
        e.persist();
        setTitle(e.target.value);
    }
    const handleUrl = (e) => {
        e.persist();
        setUrl(e.target.value);
    }

    // disable past dates
    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
        return current.isAfter(yesterday);
    };

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('/api/currentuser').then(res => {
            if (res.data.status === 200) {
                setUser(res.data.currentuser);
            }
        });
    }, []);

    return (
        <div>


            {user.role_id === "Encadrant" || user.role_id === "ChefDepartement" ?
                <div> <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Créer réunions</button>


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
                                                <label className="form-label">Titre</label>
                                                <input type="text" value={title} onChange={handleTitle} name="title" className="form-control" placeholder='Titre' />
                                                <small className="text-danger">{errorlist.title}</small>

                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Lien</label>
                                                <input type="text" value={url} onChange={handleUrl} name="url" className="form-control" placeholder='Lien' />
                                                <small className="text-danger">{errorlist.url}</small>

                                            </div>
                                        </div>

                                        <div className="row">


                                            <div className="col-md-6">
                                                <label className="form-label">Début</label>

                                                <Datetime isValidDate={disablePastDt}
                                                    locale="fr-ca" value={start} onChange={handleStart} name="start" />
                                                <small className="text-danger">{errorlist.start}</small>

                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Fin</label>

                                                <Datetime isValidDate={disablePastDt}
                                                    locale="fr-ca" value={end} onChange={handleEnd} name="end" />
                                                <small className="text-danger">{errorlist.end}</small>

                                            </div>
                                        </div>


                                    </div>

                                    <div className="modal-footer">
                                        <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                        <button type="submit" className="btn btn-info">Créer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form ></div> :
                null
            }


            <FullCalendar
                ref={calendarRef}
                locale={frLocale}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                aspectRatio={6}
                height={400}
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
