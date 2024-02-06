import app from "./app.js";
import logger from "./configs/logger.config.js";

//env variables
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    logger.info({ message: `listening on ${PORT} ...` });
})