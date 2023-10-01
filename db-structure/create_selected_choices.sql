CREATE TABLE Selected_Choice (
    choices_id           SERIAL PRIMARY KEY,
    pupils_id            INTEGER NOT NULL REFERENCES pupils(pupils_id),
    selected_QA_id       INTEGER NOT NULL REFERENCES selected_QA(selected_QA_id),
    
);
