CREATE TABLE question (
  question_id        SERIAL PRIMARY KEY,
  criterion_code     VARCHAR(5) NOT NULL,
  question_text      VARCHAR(255) NOT NULL
);