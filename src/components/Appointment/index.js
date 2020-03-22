import "../Appointment/styles.scss"
import React from "react";
import Header from "components/Appointment/Header.js"
import Empty from "components/Appointment/Empty.js"
import Show from "components/Appointment/Show"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

export default function Appointment(props) {

  const {
    id,
    time,
    interviewers,
    interviewersForDay,
    bookInterview,
    cancelInterview
  } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
   
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
const interviewer = props.interview && props.interview.interviewer || [];
console.log("Here is the data I have ", props)
  return (
    <article className="appointment">
      <Header time={props.time}/>
      
      
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === CREATE && <Form 
      // onChange={(event) => setName(event.target.value)}
      value={props.id}
      interviewers={interviewer}
      onCancel={() => {back()}} 
      
      />}
      {mode === SHOW && (
        <Show
            student={props.interview.student}

          interviewers={interviewer}
          onCancel={() => transition(EMPTY)}
          // onSave={save}
        />
      )}
      {/* {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={back}
          onConfirm={destroy}
          appointmentId={id}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewersForDay}
          onCancel={() => back()}
          onSave={save}
          name={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"ERROR SAVE"} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"ERROR DELETE"} onClose={() => back()} />
      )} */}
    </article>
  );
}

// {mode === SHOW && (
//   <Show
//     student={props.interview.student}
//     interviewer={props.interview.interviewer}
//   />
// )}    </article>
//   )
// }

