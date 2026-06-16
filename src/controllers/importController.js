const importQueue =
    require("../config/queue");
const Job =
    require("../models/Job");

const importRace = async (
    req,
    res,
    next
) => {

    try {

        const {
            raceName
        } = req.body;

        const bullJob =
            await importQueue.add(
                "importRace",
                {
                    raceName
                }
            );

        const job =
            await Job.create({
                bullJobId:
                    bullJob.id,
                raceName,
                status:
                    "queued"
            });

        res.status(202).json({
            message:
                "Job queued",
            jobId:
                bullJob.id
        });

    } catch (error) {

        next(error);

    }

};

module.exports = {
    importRace
};