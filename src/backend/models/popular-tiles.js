const {queryAndCache} = require('../querycache')

module.exports = {
    async getMostPlayersEver() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%d-%m-%Y\') as day_format, DAYNAME(date) as day_name FROM players WHERE server_online = TRUE GROUP BY day_format, day_name ORDER BY players DESC LIMIT 1',
            "most_players",
            2400,
            true
        )
    },
    async getMostPopularMonth() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%m-%Y\') as day_format, MONTHNAME(date) as month_name FROM players WHERE server_online = TRUE GROUP BY day_format, month_name ORDER BY players DESC LIMIT 1',
            "most_popular_month",
            2400,
            true
        )
    },
    async getMostPopularDay() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%d-%m-%Y\') as day_format, DAYNAME(date) as day_name FROM players WHERE server_online = TRUE GROUP BY day_format, day_name ORDER BY players DESC LIMIT 1',
            "most_popular_day",
            2400,
            true
        )
    },
    async getMostPopularHour() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) as players, DATE_FORMAT(date,\'%H:00:00\') as hour_date, DATE_FORMAT(date,\'%d-%m-%Y %H:00:00\') as full_date FROM players WHERE server_online = TRUE GROUP BY hour_date, full_date ORDER BY players DESC LIMIT 1',
            "most_popular_hour",
            2400,
            true
        )
    },
    async getMostPopularStatsWrapper() {
        return {
            mostPlayers: await module.exports.getMostPlayersEver(),
            mostPopularMonth: await module.exports.getMostPopularMonth(),
            mostPopularDay: await module.exports.getMostPopularDay(),
            MostPopularHour: await module.exports.getMostPopularHour()
        };
    }
};