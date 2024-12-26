create table Users (

	user_id varchar(2048) primary key,
	username varchar(2048),
	user_email varchar(2048),
	description text,
	user_avatar varchar(2048)

);


create table Posts (

	post_id serial primary key,
	user_id varchar(2048)
	image_url varchar(2048),
	post_description varchar(2048),
	created_at timestamptz,
	CONSTRAINT user_id FOREIGN KEY (user_id)
    	REFERENCES Users(user_id)

);


create table Comments (

	comment_id serial primary key,
	user_id varchar(2048),
	post_id integer,
	comment text,
	time_of_comment timestamptz,
	CONSTRAINT user_id FOREIGN KEY (user_id)
    	REFERENCES Users(user_id),
    	CONSTRAINT post_id FOREIGN KEY (post_id)
    	REFERENCES Posts(post_id)

);

create table Likes (

	like_id serial primary key,
	created_at timestamptz,
	user_id varchar(2048),
	post_id integer,
	CONSTRAINT user_id FOREIGN KEY (user_id)
    	REFERENCES Users(user_id),
    	CONSTRAINT post_id FOREIGN KEY (post_id)
    	REFERENCES Posts(post_id)
	
);

