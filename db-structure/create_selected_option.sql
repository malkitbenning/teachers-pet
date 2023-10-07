CREATE TABLE selected_option (
    pupil_id                   INTEGER NOT NULL,
    answer_id                  INTEGER NOT NULL,
    teacher_comment            VARCHAR(255),
    PRIMARY KEY (pupil_id, question_id, answer_id),
    CONSTRAINT fk_pupil 
        FOREIGN KEY(pupil_id) 
            REFERENCES pupil(pupil_id),
    CONSTRAINT fk_answer
        FOREIGN KEY(answer_id) 
            REFERENCES answer(answer_id)     
);
    