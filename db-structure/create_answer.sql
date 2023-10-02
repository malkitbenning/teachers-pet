CREATE TABLE answer (
  answer_id          SERIAL PRIMARY KEY,
  option_position    INTEGER NOT NULL,
  answer_text        VARCHAR(255) NOT NULL,
  answer_score       INTEGER NOT NULL
);