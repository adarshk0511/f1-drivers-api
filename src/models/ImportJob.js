const mongoose =
    require("mongoose");

const importJobSchema =
    new mongoose.Schema(
        {
            raceName: String,
            status: String
        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "ImportJob",
        importJobSchema
    );