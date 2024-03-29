import React from "react";
const axios = require("axios").default;

export default function useApplicationData() {
  const [state, setState] = React.useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 5
  });

  const setDay = day => setState({ ...state, day });

  let calenderDay = "Monday";

  for (const element in state.days) {
    if (state.day === state.days[element].name) {
      calenderDay = element;
    }
  }

  React.useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then(all => {
      setState(prev => ({
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState(state => ({ ...state, appointments }));
      Promise.all([axios.get("/api/days")]).then(([days]) => {
        setState(state => ({ ...state, days: days.data }));
      });
    });
  }

  const getSpotsForDay = state => {
    const dayFound = { ...state.days.find(obj => obj.name === state.day) };
    let spots = 0;
    for (const appointmentId of dayFound.appointments) {
      if (state.appointments[appointmentId].interview === null) {
        spots++;
      }
    }
    const dayIndex = dayFound.id - 1;
    return { spots, dayIndex };
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newStateTemp = { ...state, appointments };
    const { spots, dayIndex } = getSpotsForDay(newStateTemp);

    const daySpotsUpdate = { ...state.days[dayIndex], spots };

    const updatedDays = [...state.days];
    updatedDays[dayIndex] = daySpotsUpdate;

    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/appointments/${id}`)
        .then(function(res) {
          setState({ ...state, appointments, days: updatedDays });
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject();
        });
    });
  };
  return { state, setDay, bookInterview, cancelInterview };
}
