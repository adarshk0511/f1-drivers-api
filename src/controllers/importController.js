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

        // Create DB record first

        const dbJob =
            await Job.create({
                raceName,
                status: "queued",
                bullJobId: "pending"
            });

        // Then create BullMQ job

        const bullJob =
            await importQueue.add(
                "importRace",
                {
                    raceName,
                    dbJobId:
                        dbJob._id.toString()
                }
            );

        // Update DB record

        dbJob.bullJobId =
            bullJob.id.toString();

        await dbJob.save();

        res.status(202).json({
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