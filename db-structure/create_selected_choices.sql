CREATE TABLE selected_choices (
    choices_id           SERIAL PRIMARY KEY,
    pupil_id             INTEGER NOT NULL REFERENCES pupil(pupil_id),
    selected_qa_id       INTEGER NOT NULL REFERENCES selected_qa(selected_qa_id)
    );
