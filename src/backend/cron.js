var cron = require("node-schedule");
var axios = require("axios");
const {query} = require('./config/db-connection');

cron.scheduleJob('*/5 * * * *', async function () {
    try {
        await axios.get('https://mapleroyals.com/api/v1/get_status',
            {headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64); github.com/Quintenps/mapleroyals_analytics'}}
        ).then(function(response){
            query('INSERT INTO players SET ?', {
                players: response.data.onlineCount,
                server_online: response.data.online
            });
        }).catch(function(err){
            console.log("MapleRoyals API fetch failed", err)
        });
    } catch (err) {
        console.error("Cronjob error", err);
    }
});


