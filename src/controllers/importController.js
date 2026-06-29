const {importQueue} =
    require("../config/queue");
const Job =
    require("../models/Job");
const { raceImportCounter } = require("../config/prometheus");


const importRace = async (
    req,
    res,
    next
) => {

    try {

        

        raceImportCounter.inc();
        
        const {
            raceName
        } = req.body;

        // Create DB record first

        const dbJob =
            await Job.create({
                raceName,
                requestId: req.requestId,
                status: "queued",
                bullJobId: "pending"
            });

        // Then create BullMQ job

        const bullJob =
    await importQueue.add(
        "importRace",

        {
            raceName,
            dbJobId: dbJob._id.toString(),
            requestId: req.requestId
        },

        {
            attempts: 3,

            backoff: {
                type: "fixed",
                delay: 5000
            }
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

        logger.error({
            error: error.message,
            requestId: req.requestId
        }, "Error in importRace");
        next(error);

    }

};

module.exports = {
    importRace
};