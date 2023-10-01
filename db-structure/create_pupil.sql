CREATE TABLE pupil (
  pupil_id           SERIAL PRIMARY KEY,
  pupil_nickname     VARCHAR(50) NOT NULL,
  teacher_id         INTEGER NOT NULL REFERENCES teacher (teacher_id),
  last_update        TIMESTAMP NOT NULL,
  override_score     INTEGER,
  override_comment   VARCHAR(255)
);