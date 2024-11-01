create table Images (
	image_id serial primary key,
	image_url varchar(2048),
	user_id int
)

INSERT INTO public.images (
image_id, image_url, user_id) VALUES (
'3213123'::integer, '"https://blog.sabrillu.com/wp-content/uploads/2020/11/dscf6574.jpg",
'::character varying, '23123'::integer)
 returning image_id;