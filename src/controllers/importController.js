const importQueue =
    require("../config/queue");

const importRace = async (
    req,
    res
) => {

    const {
        raceName
    } = req.body;

    const job =
        await importQueue.add(
            "importRace",
            {
                raceName
            }
        );

    res.status(202).json({
        message:
            "Race import queued",
        jobId: job.id
    });

};

module.exports = {
    importRace
};