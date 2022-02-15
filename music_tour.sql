create table band (
	band_id serial,
	name varchar(255),
	genre text,
	available_start_time timestamp,
	end_time timestamp
);

create table "events" (
	event_id serial,
	name varchar(255),
	date date,
	start_time timestamp,
	end_time timestamp
);

create table stage (
	stage_id serial,
	stage_name varchar(255)
);

create table meet_greet (
	meet_greet_id serial,
	event_id int,
	band_id int,
	meet_start_time timestamp,
	meet_end_time timestamp
);

create table set_time (
	set_time_id serial,
	event_id int,
	stage_id int,
	band_id int,
	start_time timestamp,
	end_time timestamp
);

create table stage_event (
	stage_events_id serial,
	stage_id int,
	event_id int
);