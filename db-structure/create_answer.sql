CREATE TABLE answer (
  answer_id          SERIAL PRIMARY KEY,
  question_id        INTEGER NOT NULL REFERENCES question(question_id),
  option_position    INTEGER NOT NULL,
  answer_text        VARCHAR(500) NOT NULL,
  answer_score       INTEGER NOT NULL
);