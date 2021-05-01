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
    let queryText = `SELECT * FROM "gallery";`;
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

module.exports = router;