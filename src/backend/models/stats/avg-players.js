const {query} = require('../../config/db-connection');
const {queryAndCache} = require('../../querycache');

module.exports = {
    async getAverageDailyPlayers() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players FROM players WHERE server_online = TRUE AND DATE_FORMAT(date, \'%Y-%m-%d\') = CURDATE()',
            "PLAYERS_DAILY",
            60,
            true
        )
    },
    async getAverageWeeklyPlayers() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players FROM players WHERE server_online = TRUE AND WEEK(date, \'%Y-%m-%d\') = WEEK(CURDATE()) AND DATE_FORMAT(date, \'%Y-%m\') = DATE_FORMAT(CURDATE(), \'%Y-%m\')',
            "PLAYERS_WEEKLY",
            60,
            true
        )
    },
    async getAverageMonthlyPlayers() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players FROM players WHERE server_online = TRUE AND DATE_FORMAT(date, \'%Y-%m\') = DATE_FORMAT(CURDATE(), \'%Y-%m\')',
            "PLAYERS_MONTHLY",
            60,
            true
        )
    }
}