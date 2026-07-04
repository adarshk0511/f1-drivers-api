const {
    getImportQueue,
} = require("../config/queueManager");

const getWaitingJobs =
    async () => {
        const importQueue = getImportQueue();

        return await importQueue.getWaitingCount();

    };

module.exports = {
    getWaitingJobs
};