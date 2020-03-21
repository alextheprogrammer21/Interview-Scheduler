import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview } from 'helpers/selectors.js'
import useVisualMode from "hooks/useVisualMode";

const axios = require('axios').default;

export default function Application(props) {
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers')),
    ]).then((all) => {
      setState(prev => ({ days: all[0].data, appointments: all[1].data, third: all[2].data }));
      console.log("here's the intervierewrs", all[2].data);
    });

  },[]);

  const appointments = getAppointmentsForDay(state, state.day)
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList 
      days={state.days} 
      day={state.day} 
      setDay={setDay} />
      {/* setState({ ...state, day: "Tuesday" }); */}

      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />

      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          return (
            <Appointment key = {appointment.id} {...appointment} /> 
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

