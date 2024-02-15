import mongoose from 'mongoose';
import app from "./app.js";
import logger from "./configs/logger.config.js";

//env variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

//exit on mognodb error
mongoose.connection.on("error", (err) => {
    logger.error(`Mongodb connection error : ${err}`);
    process.exit(1);
});

//mongodb debug mode
if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
};

//mongodb connection
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => logger.info("Connected to Mongodb."));

let server = app.listen(PORT, () => {
    logger.info({ message: `listening on ${PORT} ...` });
});

//handle server errors
const exitHandler = () => {
    if (server) {
        logger.info("Server closed. exit");
        process.exit(1);
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.log("error", error)
    logger.error(error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed.");
            // Ensure all cleanup has finished before exiting.
            process.exit(0); // Use 0 to indicate a successful, intentional exit
        });
    }
});