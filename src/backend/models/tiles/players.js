const {queryAndCache} = require('../../querycache')

module.exports = {
    async getPlayersTileNowOnline() {
        return queryAndCache(
            'SELECT PLAYERS as players, DATE as DATE_FORMAT FROM players WHERE server_online=1 ORDER BY DATE_FORMAT DESC LIMIT 1',
            "players_online",
            60,
            false
        )
    },
    async getPlayersTileDaily() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) AS players, DATE_FORMAT(DATE,\'%Y-%m-%d\') AS DATE_FORMAT FROM players WHERE server_online=1 GROUP BY DATE_FORMAT ORDER BY DATE_FORMAT DESC LIMIT 2',
            "players_daily_difference",
            60,
            false
        )
    },
    async getPlayersTileWeekly() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) AS players, DATE_FORMAT(DATE,\'%Y-%m-%v\') AS DATE_FORMAT FROM players WHERE server_online=1 GROUP BY DATE_FORMAT ORDER BY DATE_FORMAT DESC LIMIT 2',
            "players_weekly_difference",
            60,
            false
        )
    },
    async getPlayersTileMonthly() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) AS players, DATE_FORMAT(DATE,\'%Y-%m\') AS DATE_FORMAT FROM players WHERE server_online=1 GROUP BY DATE_FORMAT ORDER BY DATE_FORMAT DESC LIMIT 2',
            "players_monthly_difference",
            60,
            false
        )
    },
    async wrapper() {
        return {
            online: await module.exports.getPlayersTileNowOnline(),
            daily: await module.exports.getPlayersTileDaily(),
            weekly: await module.exports.getPlayersTileWeekly(),
            monthly: await module.exports.getPlayersTileMonthly(),
        };
    }
};