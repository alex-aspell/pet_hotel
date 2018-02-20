--------CREATE TABLES--------
--------Owners--------
BEGIN;
CREATE TABLE owners (
	owner_id serial primary key not null,
	first_name varchar(25),
	last_name varchar(25)
	);
--ROLLBACK;
COMMIT;
SELECT * FROM owners;
--------pets--------	
BEGIN;
CREATE TABLE pets (
	pet_id serial primary key not null,
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
	owner_id INT REFERENCES owners ON DELETE RESTRICT,
	pet_id INT REFERENCES pets ON DELETE CASCADE,
	check_in date,
	check_out date,
	PRIMARY KEY (owner_id, pet_id)
	);
--ROLLBACK;
COMMIT;
SELECT * FROM visits;

---------INSERT INTO---------
--------owners--------
BEGIN;
INSERT INTO owners (first_name, last_name) VALUES ('The','Dude');
INSERT INTO owners (first_name, last_name) VALUES ('Alex','McAlexson');
--ROLLBACK
COMMIT;
SELECT * FROM owners;
------pets--------
BEGIN;
INSERT INTO pets (name, breed, color) VALUES ('Pupster','Boxer','Typical');
INSERT INTO pets (name, breed, color) VALUES ('Casper','Cockalier','Blue Merle');
--ROLLBACK
COMMIT;
SELECT * FROM pets;
------visits--------
BEGIN;
INSERT INTO visits (check_in, check_out, owner_id, pet_id) VALUES ('01/01/2018','01/15/2018',1,1);
INSERT INTO visits (check_in, check_out, owner_id, pet_id) VALUES ('01/01/2018','01/15/2018',2,2);
--ROLLBACK
COMMIT;
SELECT * FROM visits;