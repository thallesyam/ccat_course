drop table item
drop table zipcode
drop table coupon
drop table order
drop table order_item

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

create table zipcode (
	code text primary key,
	street text,
	neighborhood text,
	lat numeric,
	long numeric
);

insert into zipcode (code, street, neighborhood, lat, long) values ('88015600', 'Rua Almirante Lamego', 'Centro', -27.5945, -48.5477);
insert into zipcode (code, street, neighborhood, lat, long) values ('22060030', 'Rua Aires Saldanha', 'Copacabana', -22.9129, -43.2003);

create table coupon (
	id_coupon serial primary key,
	code text,
  percentage integer
);

insert into coupon (code, percentage) values ('VALE20', 20);

create table "order" (
	id_order serial primary key,
	coupon_code text,
	coupon_percentage integer,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	sequence integer,
	total numeric
);

create table order_item (
	id_order integer references "order" (id_order),
	id_item integer references item (id_item),
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
)