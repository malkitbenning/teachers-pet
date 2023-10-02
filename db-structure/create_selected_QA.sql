CREATE TABLE selected_qa (
    selected_qa_id             SERIAL PRIMARY KEY,
    question_id                INTEGER NOT NULL REFERENCES question(question_id),
    selected_answer_id         INTEGER NOT NULL REFERENCES answer(answer_id),
    teacher_comment            VARCHAR(255)
);
  