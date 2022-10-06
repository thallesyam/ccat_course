create table item (
	id_item serial primary key,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

insert into item (description, price, width, height, length, weight) values ('Guitarra', 1000, 100, 30, 10, 3);
insert into item (description, price, width, height, length, weight) values ('Amplificador', 5000, 50, 50, 50, 20);
insert into item (description, price, width, height, length, weight) values ('Cabo', 30, 10, 10, 10, 1);