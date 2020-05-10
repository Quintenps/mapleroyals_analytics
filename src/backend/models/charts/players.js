const {query} = require('../../config/db-connection');
const {queryAndCache} = require('../../querycache')

module.exports = {
    async getPlayersLastHour() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%d-%m-%Y %H:%i:00\') as date_format, DAYNAME(date) as day_name FROM players WHERE server_online = TRUE AND date > UTC_TIMESTAMP() - INTERVAL 1 HOUR GROUP BY date_format, day_name ORDER BY date_format ASC LIMIT 12',
            "players_past_hour",
            60,
            false
        )
    },
    async getPlayersToday() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%d-%m-%Y %H:00:00\') as date_format, DAYNAME(date) as day_name FROM players WHERE server_online = TRUE AND DATE_FORMAT(date, \'%Y-%m-%d\') = CURDATE() GROUP BY date_format, day_name ORDER BY date_format ASC LIMIT 24',
            "players_today",
            60,
            false
        )
    },
    async getPlayersLastWeek() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%d-%m-%Y\') as day_format, DAYNAME(date) as day_name FROM players WHERE server_online = TRUE AND date > UTC_TIMESTAMP() - INTERVAL 1 WEEK GROUP BY day_format, day_name LIMIT 7',
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