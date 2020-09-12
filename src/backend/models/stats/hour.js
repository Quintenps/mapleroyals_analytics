const {query} = require('../../config/db-connection');
const {queryAndCache} = require('../../querycache');

module.exports = {
    async getPopularHourDaily() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%H:00:00\') as hour_date FROM players WHERE server_online = TRUE AND DATE_FORMAT(date,\'%d-%m-%Y\') = DATE_FORMAT(UTC_TIMESTAMP(),\'%d-%m-%Y\') GROUP BY hour_date ORDER BY players DESC LIMIT 1',
            "POPULAR_HOUR_DAY",
            60,
            true
        )
    },
    async getPopularHourWeekly() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%H:00:00\') as hour_date FROM players WHERE server_online = TRUE AND WEEK(date, \'%Y-%m-%d\') = WEEK(UTC_TIMESTAMP()) AND DATE_FORMAT(date, \'%Y-%m\') = DATE_FORMAT(UTC_TIMESTAMP(), \'%Y-%m\') GROUP BY hour_date ORDER BY players DESC LIMIT 1',
            "POPULAR_HOUR_MONTHLY",
            60,
            true
        )
    },
    async getPopularHourMonthly() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%H:00:00\') as hour_date FROM players WHERE server_online = TRUE AND DATE_FORMAT(date,\'%m-%Y\') = DATE_FORMAT(UTC_TIMESTAMP(),\'%m-%Y\') GROUP BY hour_date ORDER BY players DESC LIMIT 1',
            "POPULAR_HOUR_MONTHLY",
            60,
            true
        )
    }
}