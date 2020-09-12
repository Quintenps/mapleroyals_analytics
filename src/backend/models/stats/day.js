const {query} = require('../../config/db-connection');
const {queryAndCache} = require('../../querycache');

module.exports = {
    async getPopularDayWeekly() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%d-%m-%Y\') as day_format, DAYNAME(date) as day_name FROM players WHERE server_online = TRUE AND WEEK(date,\'%Y-%m-%d\') = WEEK(UTC_TIMESTAMP()) AND DATE_FORMAT(date,\'%Y-%m\') = DATE_FORMAT(UTC_TIMESTAMP(),\'%Y-%m\') GROUP BY day_format, day_name ORDER BY players desc LIMIT 1',
            "POPULAR_DAY_WEEKLY",
            60,
            true
        )
    },
    async getPopularDayMonthly() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%d-%m-%Y\') as day_format, DAYNAME(date) as day_name FROM players WHERE server_online = TRUE AND DATE_FORMAT(date,\'%Y-%m\') = DATE_FORMAT(UTC_TIMESTAMP(),\'%Y-%m\') GROUP BY day_format, day_name ORDER BY players desc LIMIT 1',
            "POPULAR_DAY_MONTHLY",
            60,
            true
        )
    }
}