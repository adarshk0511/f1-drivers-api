const redisClient =
    require("../config/redis");

const DEFAULT_EXPIRY = 60;

const get = async (key) => {

    return await redisClient.get(key);

};

const set = async (

    key,

    value,

    expiry = DEFAULT_EXPIRY

) => {

    await redisClient.set(

        key,

        value,

        {

            EX: expiry,

        }

    );

};

const del = async (key) => {

    await redisClient.del(key);

};

module.exports = {
    get,
    set,
    del,
};