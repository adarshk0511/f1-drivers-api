const Job =
    require(
        "../models/Job"
    );

const getJobById =
    async (jobId) => {

        return await Job.findOne({
            bullJobId:
                jobId
        });

    };

module.exports = {
    getJobById
};