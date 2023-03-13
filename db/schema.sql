CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    imagem_url TEXT,
    user_id INTEGER
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);



INSERT INTO dishes (title, imagem_url) VALUES ('cake', 'https://www.simplyrecipes.com/thmb/sNCusJn2CeRRr7hQ5V-ljTTqCS8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Unicorn-Cake-Lead-1-30eccf41bba749958631c1a011317d81.jpg');

INSERT INTO dishes (title, imagem_url) VALUES ('pudding', 'https://www.simplyrecipes.com/thmb/sNCusJn2CeRRr7hQ5V-ljTTqCS8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Unicorn-Cake-Lead-1-30eccf41bba749958631c1a011317d81.jpg');

INSERT INTO dishes (title, imagem_url) VALUES ('cake', 'https://www.vanillacupcakery.com.au/wp-content/uploads/2017/04/Chocolate-Drip-Cake-001-256x256.jpg');

DELETE FROM dishes WHERE id = 5;

INSERT INTO users (email) VALUES ('tales@dummy.com');


ALTER TABLE dishes ADD COLUMN user_id INTEGER;