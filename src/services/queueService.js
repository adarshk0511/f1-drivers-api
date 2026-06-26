const {importQueue} =
    require(
        "../config/queue"
    );

const getWaitingJobs =
    async () => {

        return await importQueue.getWaitingCount();

    };

module.exports = {
    getWaitingJobs
};