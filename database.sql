--------CREATE TABLES--------
--------Owners--------
BEGIN;
CREATE TABLE owners (
	id serial primary key not null,
	owner_id INT,
	first_name varchar(25),
	last_name varchar(25)
	);
--ROLLBACK;
COMMIT;
SELECT * FROM owners;
--------pets--------	
BEGIN;
CREATE TABLE pets (
	id serial primary key not null,
	pets_id INT,
	name varchar(25),
	breed varchar(50),
	color varchar(25),
	owner_id INT
	);
--ROLLBACK;
COMMIT;
SELECT * FROM pets;
--------visits--------
BEGIN;
CREATE TABLE visits (
	id serial primary key not null,
	visit_id INT,
	check_in date,
	check_out date,
	pet_id INT
	);
--ROLLBACK;
COMMIT;
SELECT * FROM visits;

---------INSERT INTO---------
--------owners--------
--BEGIN;
--INSERT INTO owners (first_name, last_name) VALUES ('','',);
--INSERT INTO owners (first_name, last_name) VALUES ('','',);
--INSERT INTO owners (first_name, last_name) VALUES ('','',);
--INSERT INTO owners (first_name, last_name) VALUES ('','',);
--INSERT INTO owners (first_name, last_name) VALUES ('','',);
----ROLLBACK
--COMMIT;
--SELECT * FROM owners;
--------pets--------
--BEGIN;
--INSERT INTO pets (name, breed) VALUES ('','','');
--INSERT INTO pets (name, breed) VALUES ('','','');
--INSERT INTO pets (name, breed) VALUES ('','','');
----ROLLBACK
--COMMIT;
--SELECT * FROM pets;
--------visits--------
--BEGIN;
--INSERT INTO  () VALUES ();
--INSERT INTO  () VALUES ();
--INSERT INTO  () VALUES ();
--INSERT INTO  () VALUES ();
--INSERT INTO  () VALUES ();
--INSERT INTO  () VALUES ();
--INSERT INTO  () VALUES ();
----ROLLBACK
--COMMIT;
--SELECT * FROM visits;



