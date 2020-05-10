var express = require('express');
var router = express.Router();

const {getMostPopularStatsWrapper} = require('../models/popular-tiles');
const {getStatsWrapper} = require('../models/stats/wrapper')
const {getPlayersLastHour, getPlayersToday, getPlayersLastWeek, getPlayersLastMonth} = require('../models/charts/players');

router.get('/', function (req, res) {
    res.sendStatus(200)
});

router.get('/stats', async function (req, res) {
    let value = await getStatsWrapper();
    res.send(value);
});

router.get('/stats/popular', async function (req, res) {
    let value = await getMostPopularStatsWrapper();
    res.send(value);
});

router.get('/players/hour', async function (req, res) {
    let value = await getPlayersLastHour();
    res.send(value);
});

router.get('/players/today', async function (req, res) {
    let value = await getPlayersToday();
    res.send(value);
});

router.get('/players/week', async function (req, res) {
    let value = await getPlayersLastWeek();
    res.send(value);
});

router.get('/players/month', async function (req, res) {
    let value = await getPlayersLastMonth();
    res.send(value);
});

module.exports = router;
