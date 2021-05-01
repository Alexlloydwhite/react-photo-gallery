const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// PUT Route
router.put('/:id', (req, res) => {
   let id = req.params.id
   console.log('in /like PUT request:', req.params.id);
    // query to send to db
    let queryText = `UPDATE "gallery" SET "likes" = likes + 1 WHERE id=$1;`;
    // sending query to db via pool
    pool.query(queryText, [id])
        .then( result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error making put request:', error);
            res.sendStatus(500);
        })
}); // END PUT Route

// GET Route
router.get('/', (req, res) => {
    // query text to send to db
    let queryText = `SELECT * FROM "gallery" ORDER BY "id";`;
    // sending query to db via pool
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`error making query ${queryText}`, error);
            res.sendStatus(500);
        })
}); // END GET Route

// POST Route
router.post('/', (req, res) => {
    // setting variables
    let path = req.body.path;
    let description = req.body.description;
    // query text for db
    let queryText = `INSERT INTO "gallery" ("path", "description")
                        VALUES ($1, $2);`;

    pool.query(queryText, [path, description] )
        .then ( result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`error making db query ${queryText}`, error);
            res.sendStatus(500);
        })
}) // END POST Route

module.exports = router;