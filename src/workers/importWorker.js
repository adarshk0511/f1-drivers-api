const {
    Worker
} = require("bullmq");

const worker =
    new Worker(
        "import-race",

        async (job) => {

            console.log(
                "Processing:",
                job.data
            );

            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        5000
                    )
            );

            console.log(
                "Completed:",
                job.data
            );

        },

        {
            connection: {
                host: "redis",
                port: 6379
            }
        }
    );

console.log(
    "Worker Started"
);