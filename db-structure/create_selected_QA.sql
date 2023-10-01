CREATE TABLE Selected_QA (
    selected_QA_id             SERIAL PRIMARY KEY,
    Question_id                INTEGER NOT NULL REFERENCES Questions(Question_id),
    selected_answer_id         INTEGER NOT NULL REFERENCES Answer(selected_answer_id),
    teacher_comment            VARCHAR(255)
    
);
  