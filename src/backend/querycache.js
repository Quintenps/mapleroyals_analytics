const {query} = require('./config/db-connection');
const NodeCache = require("node-cache");
const nodeCacheInstance = new NodeCache();

module.exports = {

    async queryAndCache(dbQuery, cache_key, ttl, firstRowOnly) {
        let value = nodeCacheInstance.get(cache_key);
        if (value == undefined) {
            value = await query(dbQuery);
            nodeCacheInstance.set(cache_key, (firstRowOnly ? value[0] : value), ttl)
            return (firstRowOnly ? value[0] : value);
        }
        return value;
    },

}