CREATE TABLE form_qa (
  form_qa_id           SERIAL PRIMARY KEY,
  question_id          INTEGER NOT NULL REFERENCES question (question_id),
  answer_id            INTEGER NOT NULL REFERENCES answer (answer_id)
);