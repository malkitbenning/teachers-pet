CREATE TABLE answer (
  answer_id          SERIAL,
  question_id        INTEGER NOT NULL REFERENCES question(question_id),
  option_position    INTEGER NOT NULL,
  answer_text        VARCHAR(500) NOT NULL,
  answer_score       INTEGER NOT NULL,
  PRIMARY KEY (answer_id, question_id),
    CONSTRAINT fk_question_id
        FOREIGN KEY(answer_id) 
            REFERENCES answer(answer_id)
);