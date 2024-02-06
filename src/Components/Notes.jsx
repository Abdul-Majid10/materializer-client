import React from "react";
import "../Styles/note.css";

const Notes = (props) => {
    return (
        <>
            <div className="note-box mt-auto">
                {Object.entries(props.noteData).map(([key, value]) =>
                    value.map((element, index) => (
                        <div className={key} key={`${key}-${index}`}>
                            {" - " + element}
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default Notes;
