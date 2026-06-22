const queueService =
    require(
        "../services/queueService"
    );

const getQueueStats =
    async (
        req,
        res
    ) => {

        const waiting =
            await queueService.getWaitingJobs();

        res.json({
            waiting
        });

    };

module.exports = {
    getQueueStats
};