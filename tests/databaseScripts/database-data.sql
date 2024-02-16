\connect quietavenue;
INSERT INTO public.states (state, state_abbreviation) 
VALUES ('California', 'CA'),
('Texas', 'TX');
INSERT INTO public.cities (city, state_fk) 
VALUES ('Foster City', 1),
('Dallas', 2),
('Irving', 2),
('100 Pines', 2);
INSERT INTO public.zip_codes (zip_code) 
VALUES (94044),
(75212),
(75061),
(10010);

INSERT INTO public.estates (address_1, audio_data_link, audio_description, bathroom, bedroom,
                           creation_date, lot_area, price, profile_picture, video_link, city_fk,
                           zip_code_fk)
VALUES (
	'1020 Helm Ln',
	'assets/1020-Helm-Ln-Foster-City-CA-94044/1020-Helm-Ln-Foster-City-CA-94404-audio-data.json',
    'This is a quiet house. You will hear some dogs and many birds due to the closeness with the Foster City lake. There is also, occasionally a light plane passing by due to the small airport close by, and the sound of a few car, leaf blower and garbage trucks',
    2.5,
    3,
    '2023-10-12',
    1530,
    1749012,
    'assets/1020-Helm-Ln-Foster-City-CA-94404/1020-Helm-Ln-Foster-City-CA-94404-main-pic.jpg',
    'https://player.vimeo.com/video/826411325?h=3b090b7149&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
    1,
	1
),
(   
    '2141 Mills Ave',
	'assets/2141-Mills-Ave-Foster-City-CA-94404/2141-Mills-Ave-Foster-City-CA-94404-audio-data.json',
    'The noise and business outside of this home are lower than 90 percent of single-family homes',
    2,
    3,
    '2023-10-13',
    1356,
    1349032,
    'assets/2141-Mills-Ave-Foster-City-CA-94404/2141-Mills-Ave-Foster-City-CA-94404-main-pic.jpg',
    'https://player.vimeo.com/video/826411325?h=3b090b7149&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
    1,
	1
);

INSERT INTO public.estates (address_1, profile_picture, city_fk, zip_code_fk)
VALUES (
    '3716 Canada Dr',
    'assets/3716-Canada-Dr-Dallas-TX-75212/profile-pic-3716-Canada-Dr-Dallas-TX-75212.webp',
    2,
    2
),
(
    '3843 Bernal Dr',
    'assets/3843-Bernal-Dr-Dallas-TX-75212/profile-pic-3843-Bernal-Dr-Dallas-TX-7521.webp',
    2,
    2
),
(
    '2602 Ridgewood St',
    'assets/2602-Ridgewood-St-Irving-TX-75062/profile-pic-2602-Ridgewood-St-Irving-TX-75062.webp',
    3,
    3
),
(
    '1001 Nursery Rd',
    'assets/1001-Nursery-Rd-Irving-TX-75062/profile-pic-1001-Nursery-Rd-Irving-TX-75062.webp',
    3,
    3
);