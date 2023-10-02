CREATE TABLE support_allocation_matrix (
  support_allocation_id           SERIAL PRIMARY KEY,
  range_minimum                   INTEGER NOT NULL,
  range_maximum                   INTEGER NOT NULL,
  support_category                VARCHAR(5) NOT NULL,
  support_allocation_text         VARCHAR(255)
);
