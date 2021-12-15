import logger from "../logger";
import AppContext from "./AppContext";
import { useEffect, useState, useContext } from "react";
import { addNote, retrieveNotes } from "../logic";
import Note from "./Note";

function Notes({ onBack }) {
  logger.debug("Notes->render");

  const { onFlowStart, onFlowEnd, onFeedback } = useContext(AppContext);

  const [notes, setNotes] = useState([]);

  useEffect(async () => {
    logger.debug("Note -> useEffect (componentDidMount)");

    const { token } = sessionStorage;

    if (token) {
      try {
        onFlowStart();

        setNotes(await retrieveNotes(token));

        onFlowEnd();
      } catch ({ message }) {
        onFlowEnd();

        onFeedback(message, "warn");
      }
    }
  }, []);

  return (
    <>
      <button className="button--goback" onClick={onBack}>
        <img
          className="img--goback"
          src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-back-basic-ui-elements-flatart-icons-outline-flatarticons.png"
        />
      </button>

      <form
        className="container container--vertical container--gapped"
        onSubmit={async (event) => {
          event.preventDefault();

          const {
            target: { date, content },
          } = event;

          try {
            onFlowStart();

            await addNote(content.value, date.value, sessionStorage.token);

            setNotes(await retrieveNotes(sessionStorage.token));

            onFlowEnd();
          } catch ({ message }) {
            onFlowEnd();

            onFeedback(message, "warn");
          }
        }}
      >
        <div className="">
          <h2 className="addnote">Add Note</h2>
          <input className="container notes" name="date" type="date" />
          <textarea
            className="container notes notes__size"
            name="content"
            rows="10"
            cols="50"
            placeholder="Write your note here"
          ></textarea>
          <button className="button container button--addnote">Add Note</button>
        </div>
      </form>

      {notes.map((noteItem) => (
        <div key={noteItem.id}>
          <Note note={noteItem} />
        </div>
      ))}

    </>
  );
}

export default Notes;
