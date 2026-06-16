const jobService =
    require(
        "../services/jobService"
    );

const getJobStatus =
    async (
        req,
        res,
        next
    ) => {

        try {

            const job =
                await jobService.getJobById(
                    req.params.id
                );

            if (!job) {

                return res
                    .status(404)
                    .json({
                        message:
                            "Job not found"
                    });

            }

            res.json(job);

        } catch (error) {

            next(error);

        }

    };

module.exports = {
    getJobStatus
};