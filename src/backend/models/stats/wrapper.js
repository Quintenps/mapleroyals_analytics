const {getAverageDailyPlayers, getAverageWeeklyPlayers, getAverageMonthlyPlayers} = require('./avg-players')
const {getPopularHourDaily, getPopularHourWeekly, getPopularHourMonthly} = require('./hour')
const {getPopularDayWeekly, getPopularDayMonthly} = require('./day')
const {getMostPlayersEver, getMostPopularHour, getMostPopularDay} = require('../popular-tiles')

module.exports = {
    async getStatsWrapper() {
        return {
            daily: {
                "avg_players": await getAverageDailyPlayers(),
                "popular_hour": await getPopularHourDaily()
            },
            weekly: {
                "avg_players": await getAverageWeeklyPlayers(),
                "popular_hour": await getPopularHourWeekly(),
                "popular_day": await getPopularDayWeekly()
            },
            monthly: {
                "avg_players": await getAverageMonthlyPlayers(),
                "popular_hour": await getPopularHourMonthly(),
                "popular_day": await getPopularDayMonthly()
            },
            all_time: {
                "avg_players": await getMostPlayersEver(),
                "popular_hour": await getMostPopularHour(),
                "popular_day": await getMostPopularDay(),
            }
        };
    }
}