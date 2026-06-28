const deadLetterQueueService = require(
    "../services/deadLetterQueueService"
);

const getDeadJobs = async (req, res) => {
    try {
        const jobs =
            await deadLetterQueueService.getDeadJobs();

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const retryDeadJob = async (
    req,
    res
) => {

    try {

        const response =
            await deadLetterQueueService.retryDeadJob(
                req.params.id
            );

        res.json(response);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });

    }

};

module.exports = {
    getDeadJobs,
    retryDeadJob
};