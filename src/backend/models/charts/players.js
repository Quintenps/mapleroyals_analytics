const {queryAndCache} = require('../../querycache')

module.exports = {
    async getPlayersDailyAll() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) AS players, DATE_FORMAT(DATE,\'%Y-%m-%d\') AS DATE_FORMAT FROM players WHERE server_online=1 GROUP BY DATE_FORMAT ORDER BY DATE_FORMAT ASC',
            "players_daily_all",
            60,
            false
        )
    },
    async getPlayersDailyMonth() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) AS players, DATE_FORMAT(DATE,\'%Y-%m-%d\') AS DATE_FORMAT FROM players WHERE server_online=1 GROUP BY DATE_FORMAT ORDER BY DATE_FORMAT DESC LIMIT 30',
            "players_daily_month",
            60,
            false
        )
    },
    async getPlayersDailyWeek() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) AS players, DATE_FORMAT(DATE,\'%Y-%m-%d\') AS DATE_FORMAT FROM players WHERE server_online=1 GROUP BY DATE_FORMAT ORDER BY DATE_FORMAT DESC LIMIT 7',
            "players_daily_week",
            60,
            false
        )
    },
};