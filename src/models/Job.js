const mongoose =
    require("mongoose");

const jobSchema =
    new mongoose.Schema(
        {
            bullJobId: {
                type: String,
                required: true
            },

            raceName: {
                type: String,
                required: true
            },

            status: {
                type: String,
                enum: [
                    "queued",
                    "processing",
                    "completed",
                    "failed"
                ],
                default: "queued"
            }
        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "Job",
        jobSchema
    );