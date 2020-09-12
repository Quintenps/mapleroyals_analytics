const {query} = require('../../config/db-connection');
const {queryAndCache} = require('../../querycache')

module.exports = {
    async getPlayersHourlyThisWeek() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%Y-%m-%d %H:%i:00\') as date_format, DAYNAME(date) as day_name FROM players WHERE server_online = TRUE AND DATE_FORMAT(date,\'%Y-%m-%d\') >= DATE_FORMAT(SUBDATE(UTC_TIMESTAMP(), weekday(UTC_TIMESTAMP())),\'%Y-%m-%d\') AND HOUR(date) = HOUR(UTC_TIMESTAMP()) GROUP BY date_format, day_name',
            "players_past_hour",
            60,
            false
        )
    },
    async getPlayersThisWeek() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%Y-%m-%d %H:00:00\') as date_format, DAYNAME(date) as day_name FROM players WHERE server_online = TRUE AND DATE_FORMAT(date,\'%Y-%m-%d\') >= DATE_FORMAT(SUBDATE(UTC_TIMESTAMP(), weekday(UTC_TIMESTAMP())),\'%Y-%m-%d\') GROUP BY date_format, day_name',
            "players_today",
            60,
            false
        )
    },
    async getPlayersWeekly() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, WEEK(date, 1) as week, DAYNAME(date) as day_name, DATE_FORMAT(date,\'%Y-%m-%d\') as date_format FROM players WHERE server_online = TRUE AND date > UTC_TIMESTAMP() - INTERVAL 1 MONTH GROUP BY week, day_name, date_format ORDER BY date_format DESC',
            "players_past_week",
            60,
            false
        )
    },
    async getPlayersLastMonth() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%m-%Y\') as month_format, MONTHNAME(date) as month_name FROM players WHERE server_online = TRUE AND date > UTC_TIMESTAMP() - INTERVAL 1 MONTH GROUP BY month_format, month_name LIMIT 30',
            "players_past_month",
            60,
            false
        )
    }
};