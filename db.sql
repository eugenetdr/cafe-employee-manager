CREATE TABLE employee_data ( 
    sn INT AUTO_INCREMENT,
    id VARCHAR(11) NOT NULL UNIQUE,
    name CHAR(255) NOT NULL,
    email_address CHAR(255) NOT NULL,
    phone_number CHAR(8) NOT NULL,
    gender CHAR(10) NOT NULL,
    cafe_id CHAR(7),
    start_date DATE NOT NULL,
    PRIMARY KEY (sn, id)
);

-- DELIMITER $$
-- CREATE TRIGGER tg_employee_insert
-- BEFORE INSERT ON employee_data
-- FOR EACH ROW
-- BEGIN
--   DECLARE max_id int;
--   SELECT MAX(COALESCE(MAX(sn), 0)) INTO max_id FROM employee_data ;
--   SET NEW.id = CONCAT('UI', LPAD(max_id+1, 9, '0'));
-- END$$
-- DELIMITER ;

CREATE TABLE cafe_data (
    sn INT AUTO_INCREMENT,
    id CHAR(7) NOT NULL UNIQUE,
    name CHAR(255) NOT NULL,
    description VARCHAR(655) NOT NULL,
    logo LONGBLOB,
    location CHAR(255) NOT NULL,
    PRIMARY KEY (sn, id)
);

-- DELIMITER $$
-- CREATE TRIGGER tg_cafe_insert
-- BEFORE INSERT ON cafe_data
-- FOR EACH ROW
-- BEGIN
  -- SET NEW.id = CONCAT('CAFE', LPAD(LAST_INSERT_ID()+1, 3, '0'));
-- END$$
-- DELIMITER ;

INSERT INTO cafe_data (id, name, description, location)
VALUES
  ('CAFE001', 'Penguin Cafe', 'Penguin Cafe provides the best coffee in the area!', 'Central'),
  ('CAFE002', 'Flamingo Cafe', 'Flamingo Cafe provides the best coffee in the area!', 'East'),
  ('CAFE003', 'Swan Cafe', 'Swan Cafe provides the best coffee in the area!', 'North'),
  ('CAFE004', 'Parrot Cafe', 'Parrot Cafe provides the best coffee in the area!', 'West'),
  ('CAFE005', 'Canary Cafe', 'Canary Cafe provides the best coffee in the area!', 'East'),
  ('CAFE006', 'Owl Cafe', 'Owl Cafe provides the best coffee in the area!', 'East');

-- -- Necessary to insert separately for the trigger to function properly
INSERT INTO employee_data (id, name, email_address, phone_number, gender, cafe_id, start_date)
VALUES
  ('UI000000001', 'Lance', 'Lance@mail.com', '93268189', 'Male', 'CAFE003', '2015-06-03'),
  ('UI000000002', 'Regina', 'Regina@mail.com', '81574082', 'Female', 'CAFE003', '2016-01-25'),
  ('UI000000003', 'Bob', 'Bob@mail.com', '90386062', 'Male', 'CAFE001', '2016-08-04'),
  ('UI000000004', 'James', 'James@mail.com', '91112454', 'Male', 'CAFE004', '2017-03-14'),
  ('UI000000005', 'Patricia', 'Patricia@mail.com', '93126872', 'Female', 'CAFE001', '2017-04-06'),
  ('UI000000006', 'Jennifer', 'Jennifer@mail.com', '87014375', 'Female', 'CAFE001', '2017-05-10'),
  ('UI000000007', 'Linda', 'Linda@mail.com', '97435102', 'Female', 'CAFE005', ' 2017-07-13'),
  ('UI000000008', 'David', 'David@mail.com', '89905637', 'Male', 'CAFE001', ' 2017-10-23'),
  ('UI000000009', 'Tommy', 'Tommy@mail.com', '86029305', 'Male', 'CAFE001', '2017-12-22'),
  ('UI000000010', 'Michael', 'Michael@mail.com', '96724157', 'Male', 'CAFE004', '2018-04-11'),
  ('UI000000011', 'Susan', 'Susan@mail.com', '85234846', 'Female', 'CAFE003', '2019-01-18'),
  ('UI000000012', 'Jessica', 'Jessica@mail.com', '83662528', 'Female', 'CAFE006', '2019-09-26'),
  ('UI000000013', 'Sally', 'Sally@mail.com', '95409551', 'Female', 'CAFE001', '2020-02-27'),
  ('UI000000014', 'Robert', 'Robert@mail.com', '91934223', 'Male', 'CAFE002', '2020-04-16'),
  ('UI000000015', 'Charles', 'Charles@mail.com', '91332676', 'Male', 'CAFE004', '2020-06-04'),
  ('UI000000016', 'Christopher', 'Christopher@mail.com', '93164538', 'Male', 'CAFE004', '2020-06-05'),
  ('UI000000017', 'Daniel', 'Daniel@mail.com', '95285482', 'Male', 'CAFE005', '2021-05-06'),
  ('UI000000018', 'Missy', 'Missy@mail.com', '99501532', 'Female', 'CAFE002', '2021-08-16'),
  ('UI000000019', 'Kimberly', 'Kimberly@mail.com', '89342309', 'Female', 'CAFE003', '2021-08-20'),
  ('UI000000020', 'Michelle', 'Michelle@mail.com', '83386604', 'Female', 'CAFE001', '2021-10-04'),
  ('UI000000021', 'Paul', 'Paul@mail.com', '95008334', 'Male', 'CAFE006', '2022-02-09'),
  ('UI000000022', 'Kenneth', 'Kenneth@mail.com', '89927927', 'Male', 'CAFE005', '2022-12-09'),
  ('UI000000023', 'Betty', 'Betty@mail.com', '89616656', 'Female', 'CAFE005', '2022-12-12'),
  ('UI000000024', 'Lisa', 'Lisa@mail.com', '82776215', 'Female', 'CAFE004', '2023-01-16'),
  ('UI000000025', 'Carol', 'Carol@mail.com', '80424123', 'Female', 'CAFE006', '2023-01-26'),
  ('UI000000026', 'Aaron', 'Aaron@mail.com', '83088654', 'Male', NULL, '2023-02-20');


-- INSERT INTO cafe_data (id, name, description, location)
-- VALUES('CAFE001', 'Penguin Cafe', 'Penguin Cafe provides the best coffee in the area!', 'Central');
-- INSERT INTO cafe_data (name, description, location)
-- VALUES('CAFE002', 'Flamingo Cafe', 'Flamingo Cafe provides the best coffee in the area!', 'East');
-- INSERT INTO cafe_data (name, description, location)
-- VALUES('CAFE003', 'Swan Cafe', 'Swan Cafe provides the best coffee in the area!', 'North');
-- INSERT INTO cafe_data (name, description, location)
-- VALUES('CAFE004', 'Parrot Cafe', 'Parrot Cafe provides the best coffee in the area!', 'West');
-- INSERT INTO cafe_data (name, description, location)
-- VALUES('CAFE005', 'Canary Cafe', 'Canary Cafe provides the best coffee in the area!', 'East');
-- INSERT INTO cafe_data (name, description, location)
-- VALUES('CAFE006', 'Owl Cafe', 'Owl Cafe provides the best coffee in the area!', 'East');

-- -- -- Necessary to insert separately for the trigger to function properly
-- INSERT INTO employee_data (id, name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000001', 'Bob', 'Bob@mail.com', '90386062', 'Male', 'CAFE001', '2016-08-04');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000002', 'Tommy', 'Tommy@mail.com', '86029305', 'Male', 'CAFE001', '2017-12-22');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000003', 'Sally', 'Sally@mail.com', '95409551', 'Female', 'CAFE001', '2020-02-27');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000004', 'Robert', 'Robert@mail.com', '91934223', 'Male', 'CAFE002', '2020-04-16');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000005', 'Missy', 'Missy@mail.com', '99501532', 'Female', 'CAFE002', '2021-08-16');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000006', 'Lance', 'Lance@mail.com', '93268189', 'Male', 'CAFE003', '2015-06-03');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000007', 'Regina', 'Regina@mail.com', '81574082', 'Female', 'CAFE003', '2016-01-25');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000008', 'James', 'James@mail.com', '91112454', 'Male', 'CAFE004', '2017-03-14');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000009', 'Patricia', 'Patricia@mail.com', '93126872', 'Female', 'CAFE001', '2017-04-06');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000010', 'Jennifer', 'Jennifer@mail.com', '87014375', 'Female', 'CAFE001', '2017-05-10');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000011', 'Linda', 'Linda@mail.com', '97435102', 'Female', 'CAFE005', ' 2017-07-13');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000012', 'David', 'David@mail.com', '89905637', 'Male', 'CAFE001', ' 2017-10-23');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000013', 'Michael', 'Michael@mail.com', '96724157', 'Male', 'CAFE004', '2018-04-11');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000014', 'Susan', 'Susan@mail.com', '85234846', 'Female', 'CAFE003', '2019-01-18');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000015', 'Jessica', 'Jessica@mail.com', '83662528', 'Female', 'CAFE006', '2019-09-26');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000016', 'Charles', 'Charles@mail.com', '91332676', 'Male', 'CAFE004', '2020-06-04');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000017', 'Christopher', 'Christopher@mail.com', '93164538', 'Male', 'CAFE004', '2020-06-05');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000018', 'Daniel', 'Daniel@mail.com', '95285482', 'Male', 'CAFE005', '2021-05-06');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000019', 'Kimberly', 'Kimberly@mail.com', '89342309', 'Female', 'CAFE003', '2021-08-20');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000020', 'Michelle', 'Michelle@mail.com', '83386604', 'Female', 'CAFE001', '2021-10-04');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000021', 'Paul', 'Paul@mail.com', '95008334', 'Male', 'CAFE006', '2022-02-09');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000022', 'Kenneth', 'Kenneth@mail.com', '89927927', 'Male', 'CAFE005', '2022-12-09');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000023', 'Betty', 'Betty@mail.com', '89616656', 'Female', 'CAFE005', '2022-12-12');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000024', 'Lisa', 'Lisa@mail.com', '82776215', 'Female', 'CAFE004', '2023-01-16');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000025', 'Carol', 'Carol@mail.com', '80424123', 'Female', 'CAFE006', '2023-01-26');
-- INSERT INTO employee_data (name, email_address, phone_number, gender, cafe_id, start_date)
-- VALUES ('UI000000026', 'Aaron', 'Aaron@mail.com', '83088654', 'Male', NULL, '2023-02-20');
