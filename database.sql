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
	pet_id INT,
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
BEGIN;
INSERT INTO owners (first_name, last_name, owner_id) VALUES ('The','Dude',1);
INSERT INTO owners (first_name, last_name, owner_id) VALUES ('Alex','McAlexson',2);
--ROLLBACK
COMMIT;
SELECT * FROM owners;
------pets--------
BEGIN;
INSERT INTO pets (name, breed, color, pet_id) VALUES ('Pupster','Boxer','Typical',1);
INSERT INTO pets (name, breed, color, pet_id) VALUES ('Casper','Cockalier','Blue Merle', 2);
--ROLLBACK
COMMIT;
SELECT * FROM pets;
------visits--------
BEGIN;
INSERT INTO visits (check_in, check_out, pet_id, visit_id) VALUES ('01/01/2018','01/15/2018', 1, 1);
INSERT INTO visits (check_in, check_out, pet_id, visit_id) VALUES ('01/01/2018','01/15/2018', 2, 2);
--ROLLBACK
COMMIT;
SELECT * FROM visits;



