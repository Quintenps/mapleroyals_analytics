const {queryAndCache} = require('../../querycache')

module.exports = {
    async getPlayersByDay() {
        return queryAndCache(
            'SELECT ROUND(AVG(`players`), 0) AS players, DATE_FORMAT(DATE,\'%Y-%m-%d\') AS DATE_FORMAT FROM players WHERE server_online=1 GROUP BY DATE_FORMAT ORDER BY DATE_FORMAT ASC',
            "players_past_hour",
            60,
            false
        )
    },
};