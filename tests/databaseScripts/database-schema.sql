CREATE DATABASE quietavenue;
\connect quietavenue

CREATE TABLE public.states (
	state_id serial4 NOT NULL,
	state text NOT NULL,
	state_abbreviation text NOT NULL,
	CONSTRAINT states_pkey PRIMARY KEY (state_id)
);

CREATE TABLE public.cities (
	city_id serial4 NOT NULL,
	city text NOT NULL,
	state_fk int4 NOT NULL,
	CONSTRAINT cities_pkey PRIMARY KEY (city_id),
	CONSTRAINT cities_estate_fk_fkey FOREIGN KEY (state_fk) REFERENCES public.states(state_id)
);

CREATE TABLE public.cities_suggest (
	city_suggest_id serial4 NOT NULL,
	city_suggest text NOT NULL,
	cities_fk int4 NOT NULL,
	CONSTRAINT cities_suggest_pkey PRIMARY KEY (city_suggest_id),
	CONSTRAINT cities_suggest_cities_fk_fkey FOREIGN KEY (cities_fk) REFERENCES public.cities(city_id)
);

CREATE TABLE public.zip_codes (
	zip_code_id serial4 NOT NULL,
	zip_code text NOT NULL,
	CONSTRAINT zip_codes_pkey PRIMARY KEY (zip_code_id)
);

CREATE TABLE public.estates (
	estate_id serial4 NOT NULL,
	estate_url text UNIQUE NOT NULL,
	address_1 text NOT NULL,
	address_2 text NULL,
	audio_data_link text NULL,
	audio_description text NULL,
	bathroom float8 NULL,
	bedroom float8 NULL,
	creation_date date NULL,
	lot_area float8 NULL,
	price float8 NULL,
	profile_picture text NOT NULL,
	sunrise timestamp NULL,
	sunset timestamp NULL,
	video_link text NULL,
	cities_fk int4 NOT NULL,
	zip_codes_fk int4 NOT NULL,
	CONSTRAINT estates_pkey PRIMARY KEY (estate_id),
	CONSTRAINT estates_cities_fk_fkey FOREIGN KEY (cities_fk) REFERENCES public.cities(city_id),
	CONSTRAINT estates_zip_codes_fk_fkey FOREIGN KEY (zip_codes_fk) REFERENCES public.zip_codes(zip_code_id)
);

CREATE TABLE public.estates_suggest (
	estate_suggest_id serial4 NOT NULL,
	estate_suggest text NOT NULL,
	estates_fk int4 NOT NULL,
	CONSTRAINT estates_suggest_pkey PRIMARY KEY (estate_suggest_id),
	CONSTRAINT estates_suggest_estates_fk_fkey FOREIGN KEY (estates_fk) REFERENCES public.estates(estate_id)
);