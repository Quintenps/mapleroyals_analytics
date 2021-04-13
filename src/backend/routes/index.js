var express = require('express');
var router = express.Router();

const {getPlayersByDay} = require('../models/charts/players');

router.get('/', async function(req, res){
    res.send(200);
});

router.get('/players', async function (req, res) {
    let value = await getPlayersByDay();
    res.send(value);
});

module.exports = router;
