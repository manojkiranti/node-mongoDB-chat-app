import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";

// dotEnv config
dotenv.config();

// create express app
const app = express();

// middleware
app.use(helmet());

// morgan.middleware
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}
// parse json request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sanitize request data    
app.use(ExpressMongoSanitize());

// enable cookies parser
app.use(cookieParser());

// gzip compression
app.use(compression());

app.post("/", (req, res) => {
    console.log(req.body)
    res.send("Hello from the server");
});

export default app;