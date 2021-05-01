CREATE TABLE "gallery" (
"id" SERIAL PRIMARY KEY,
"path" varchar(120) not null,
"description" varchar(120) not null,
"likes" INTEGER default 0
);

INSERT INTO "gallery" ("path", "description", "likes")
VALUES 
('images/goat_small.jpg', 'Photo of a goat taken at Glacier National Park.', 0), 
('images/big-boat.JPG','BIG shipping boat coming in to the oakland yard', 0), 
('images/lands-end.JPG', 'Water and plant life at Lands End', 0), 
('images/moma.JPG', 'funny art at the Museum of Modern Art', 0 ),
('images/napa-valley.JPG', 'Larkmead Cellars in Napa Valley', 0),
('images/oakland-bridge.JPG', 'View from a big hill, looking out on the bay and Oakland bridge', 0);

SELECT * FROM "gallery";