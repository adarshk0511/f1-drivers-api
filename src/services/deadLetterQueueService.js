const { deadLetterQueue } = require("../config/queue");

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

module.exports = {
    getDeadJobs
};