const serverCode = `const express = require("express");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { default: mongoose } = require("mongoose");
const { MainRouter } = require("./routes/routes");
require('dotenv').config();

module.exports = class Server {
    #app = express();
    #DB_URL;
    #PORT;
    constructor(PORT = process.env.PORT, DB_URL = process.env.DB_URL) {
        this.#DB_URL = DB_URL;
        this.#PORT = PORT;
        this.ConfigServer();
        this.ConnectToMongoDB();
        this.CreateServer();
        this.CreateRoutes();
        this.ErrorHandler();
    }

    CreateRoutes() {
        this.#app.use(MainRouter)
    }

    ConnectToMongoDB() {
        mongoose.connect(this.#DB_URL, (err) => {
            if (!err) return console.log("Established Connection to Mongo");
            return console.log(err)
        })
        mongoose.connection.on("connected", () => {
            console.log("Connected To Mongo")
        })
        mongoose.connection.on("disconnect", () => {
            console.log("Disconnected From Mongo")
        })
    }

    CreateServer() {
        const http = require("http");
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log('Server listening on >> ' + this.#PORT)
        })
    }

    ConfigServer() {
        const corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200
        };

        this.#app.use(cors(corsOptions));
        this.#app.use(morgan("dev"))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, '..', "public")));
    }

    ErrorHandler() {
        this.#app.use((req, res, next) => {
            next(createHttpError.NotFound("Route not found 🔍"))
        })
        this.#app.use((error, req, res, next) => {
            const serverError = createHttpError.InternalServerError()
            const status = error.status || serverError.status
            const message = error.message || serverError.message
            return res.status(status).json({
                status,
                message
            })
        })
    }

}`;

const ControllerBaseCode = `const AutoBind = require("auto-bind");

module.exports = class ControllerBase {
    constructor() {
        AutoBind(this)
    }
}
`;

const routesCode = `const httpStatus = require("http-status");
const { SendResponse } = require("../utils/SendResponse");

const MainRouter = require("express").Router();

MainRouter.get("/", (req, res) => {
    return SendResponse(res, httpStatus.OK, true, "Index Page")
})

module.exports = {
    MainRouter
}
`;

const ValidationErrorMapperCode = `const { validationResult } = require("express-validator");
const httpStatus = require("http-status");
const { SendResponse } = require("../../utils/SendResponse");

const validationErrorsMapper = (req, res, next) => {
    let messages = {}
    const result = validationResult(req)
    // console.log(result.errors);
    if (result?.errors?.length > 0) {
        result?.errors.forEach(err => {
            messages[err.param] = err.msg;
        })
        return SendResponse(res, httpStatus.BAD_REQUEST, false, messages)
    }
    next()
}

module.exports = {
    validationErrorsMapper
}

`;

const VerifyAccessTokenCode = `const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
// const { UserModel } = require("../../models/User.models");
require("dotenv").config();

async function GetTokenFromHeader (headers) {
    const token = await headers?.authorization?.split(" ")[1] || [];
    if (token) return token;
    throw createHttpError.Unauthorized("You have to login first to access this page!");
}

async function VerifyAccessToken (req, res, next) {
    try {
        const token = await GetTokenFromHeader(req.headers).then(token => token);
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            try {
                if (err) throw createHttpError.Unauthorized("You have to login first to access this page!");
                const { username } = payload;
                const user = await UserModel.findOne({ $or: [ { username }, { email: username }]})
                if (!user) throw createHttpError.Unauthorized("Your email and password does not match. Please try again.")
                req.user = user;
                return next();
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    VerifyAccessToken
}
`;

const SendResponseCode = `const SendResponse = (res, status, success, msg) => {
    const json = {
        status,
        success,
        response: msg
    }
    return res.status(status).json(json);
}

module.exports = {
    SendResponse
}

`;

const SignAccessTokenCode = `const jwt = require("jsonwebtoken");
require("dotenv").config();

const SignAccessToken = (payload) => {
    const { username } = payload;

    const AccessToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d"
    })

    return AccessToken;
}

module.exports = {
    SignAccessToken
}

`;

const indexCode = `const server = require("./app/server");
require('dotenv').config();

new server(process.env.PORT, process.env.DB_URL)`;

const secondIndexCode = `const express = require('express');
const createHttpError = require('http-errors');
const { MainRouter } = require('./routes/routes');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}))
app.use(morgan('tiny'));
app.use(MainRouter);
app.use((req, res, next) => {
    next(createHttpError.NotFound("Route not found 🔍"))
})
app.use((error, req, res, next) => {
    const serverError = createHttpError.InternalServerError()
    const status = error.status || serverError.status
    const message = error.message || serverError.message
    return res.status(status).json({
        status,
        message
    })
})

app.listen(process.env.PORT, () => console.log('listening on: >> http://localhost:' + process.env.PORT));`;

const env = `PORT=5000
DB_URL=mongodb://127.0.0.1:27017/my-app
JWT_SECRET_KEY=`;

const keyGenCode = `const crypto = require("crypto");
const { log: print } = console;

const key = crypto.randomBytes(42).toString("hex");
print(key)`;

module.exports = {
    serverCode,
    ControllerBaseCode,
    routesCode,
    ValidationErrorMapperCode,
    VerifyAccessTokenCode,
    SendResponseCode,
    SignAccessTokenCode,
    indexCode,
    secondIndexCode,
    env,
    keyGenCode
}