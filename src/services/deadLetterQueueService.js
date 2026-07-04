const {
    getImportQueue,
    getDeadLetterQueue
} = require("../config/queueManager");

const getDeadJobs = async () => {

    const deadLetterQueue =
    getDeadLetterQueue();
    const jobs = await deadLetterQueue.getJobs([
        "waiting",
        "delayed",
        "failed",
        "completed"
    ]);

    return jobs.map(job => ({
        id: job.id,
        name: job.name,
        data: job.data,
        attemptsMade: job.attemptsMade,
        timestamp: job.timestamp
    }));
};

const retryDeadJob = async (jobId) => {

    const deadLetterQueue =
    getDeadLetterQueue();
    const deadJob =
        await deadLetterQueue.getJob(jobId);

    if (!deadJob) {
        throw new Error("Dead job not found");
    }

    const importQueue = getImportQueue();

    await importQueue.add(
        "importRace",

        {
            raceName: deadJob.data.raceName,
            dbJobId: deadJob.data.dbJobId
        },

        {
            attempts: 3,

            backoff: {
                type: "fixed",
                delay: 5000
            }
        }
    );

    await deadJob.remove();

    return {
        message: "Job retried successfully"
    };

};

module.exports = {
    getDeadJobs,
    retryDeadJob
};