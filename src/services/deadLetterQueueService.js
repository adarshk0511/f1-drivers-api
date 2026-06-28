const { deadLetterQueue } = require("../config/queue");
const { importQueue } =
    require("../config/queue");

const getDeadJobs = async () => {
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

    const deadJob =
        await deadLetterQueue.getJob(jobId);

    if (!deadJob) {
        throw new Error("Dead job not found");
    }

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