var express = require('express');
var router = express.Router();

const {getPlayersDailyAll, getPlayersDailyMonth, getPlayersDailyWeek} = require('../models/charts/players');
const {wrapper} = require('../models/tiles/players');

router.get('/', async function(req, res){
    res.send(200);
});



// Charts
router.get('/players/chart/daily/all', async function (req, res) {
    let value = await getPlayersDailyAll();
    res.send(value);
});

router.get('/players/chart/daily/month', async function (req, res) {
    let value = await getPlayersDailyMonth();
    res.send(value);
});

router.get('/players/chart/daily/week', async function (req, res) {
    let value = await getPlayersDailyWeek();
    res.send(value);
});

// Tiles
router.get('/players/tiles', async function (req, res) {
    let value = await wrapper();
    res.send(value);
});

module.exports = router;
