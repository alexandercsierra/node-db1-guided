const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*').from('posts')
        .then(posts=>{
            res.status(200).json(posts)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'server error'})
        })

});

router.get('/:id', (req, res) => {
    db('posts').where({id: req.params.id})
        //just give me first record. Useful when expecting one result, because then it will return the object without having to specify posts[0] as below.
        .first()
        .then(post=>{
            //will always return an array
            // res.status(200).json(posts[0]);
            res.status(200).json(post);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'server error'})
        })
});

router.post('/', (req, res) => {
    //insert into posts () values ()
    const postInfo = req.body;
    //will generate a warning on console when using sqlite
    db('posts').insert(postInfo, 'id')
        .then(ids=>{
            res.status(201).json(ids);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'server error'})
        })
});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;