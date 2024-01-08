\connect quietavenue;
INSERT INTO public.states (state, state_abbreviation) VALUES ('California', 'CA');
INSERT INTO public.cities (city, state_fk) VALUES ('Foster City', 1);
INSERT INTO public.zip_codes (zip_code) VALUES (94404);

INSERT INTO public.estates (estate_url, address_1, audio_data_link, audio_description, bathroom, bedroom,
                           creation_date, lot_area, price, profile_picture, sunrise, sunset, video_link, city_fk,
                           zip_code_fk)
VALUES (
    '1020-Helm-Ln-Foster-City-CA-94404',
	'1020 Helm Ln',
	'assets/1020-Helm-Ln-Foster-City-CA-94404/1020-Helm-Ln-Foster-City-CA-94404-audio-data.json',
    'This is a quiet house. You will hear some dogs and many birds due to the closeness with the Foster City lake. There is also, occasionally a light plane passing by due to the small airport close by, and the sound of a few car, leaf blower and garbage trucks',
    2.5,
    3,
    '2023-10-12',
    1530,
    1749012,
    'assets/1020-Helm-Ln-Foster-City-CA-94404/1020-Helm-Ln-Foster-City-CA-94404-main-pic.jpg',
    '2020-02-13 05:43:00.000',
    '2020-02-13 20:19:00.000',
    'https://player.vimeo.com/video/826411325?h=3b090b7149&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
    1,
	1
),
(   
    '2141-Mills-Ave-Foster-City-CA-94404',
    '2141 Mills Ave',
	'assets/2141-Mills-Ave-Foster-City-CA-94404/2141-Mills-Ave-Foster-City-CA-94404-audio-data.json',
    'The noise and business outside of this home are lower than 90 percent of single-family homes',
    2,
    3,
    '2023-10-13',
    1356,
    1349032,
    'assets/2141-Mills-Ave-Foster-City-CA-94404/2141-Mills-Ave-Foster-City-CA-94404-main-pic.jpg',
    '2022-03-06 06:53:00.000',
    '2022-03-06 18:18:00.000',
    'https://player.vimeo.com/video/826411325?h=3b090b7149&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
    1,
	1
);
