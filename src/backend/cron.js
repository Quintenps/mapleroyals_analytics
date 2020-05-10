var cron = require("node-schedule");
var axios = require("axios");
const {query} = require('./config/db-connection');

cron.scheduleJob('*/5 * * * *', async function () {
    try {
        const response = await axios.get('https://mapleroyals.com/api/v1/get_status',
            {headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64); PlayerAnalytics/mapleroyals.quinten.dev'}}
        ).then(function(response){
            query('INSERT INTO players SET ?', {
                players: data.onlineCount,
                server_online: data.online
            });
        }).catch(function(err){
            console.log("MapleRoyals API fetch failed", err)
        });
    } catch (err) {
        console.error("Cronjob error", err);
    }
});


