export const createFunctionReadyServerJs = port => {
    return `const express = require("express");
const app = express();
const { appRouter } = require("./src/routes/app.routes");

// Basic app configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router configuration.
app.use(appRouter);

// NotFound Handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: "Page not found!",
    data: null,
    error: null,
  });
});

// Error handler
app.use((err, req, res, next) => {
    let status = err?.status ?? err?.statusCode;
    if (!status || isNaN(+status) || status > 511 || status < 200 ) status = 500;
    res.status(500).json({
        message: err?.message ?? err?.stack ?? "INTERNAL_SERVER_ERROR"
    })
})

app.listen(${port}, () => console.log('🚀 APP running on http://localhost:${port} 🎉'))`
}


export const appRouterCode = `const appRouter = require('express').Router();

appRouter.get('/', (req, res) => {
    return res.status(200).json({
        status: 200,
        success: true,
        message: 'APP bootstrapped successfully! 🎉',
        data: null,
        error: null
    })
})

module.exports = {
    appRouter
}
`

export const OOPRIndexJs =`const express = require('express');
const Router = require("./routes/router");

module.exports = class Application {
    #app = express();
    #PORT;
    #DB_URL;
    constructor(PORT, DB_URL) {
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.ConfigApplication();
        this.ConnectToDB();
        this.CreateServer();
        this.CreateRoutes();
        this.ErrorHandler();
    }

    ConfigApplication() {
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: true }));
    }

    CreateServer() {
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log('🚀 Server listening on port http://localhost:' + this.#PORT);
        });
    }

    ConnectToDB() {}

    CreateRoutes() {
        this.#app.use(Router);
    }

    ErrorHandler() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'This route was not found on the server',
                data: null,
                error: '404 Not Found',
            })
        })
        this.#app.use((error, req, res, next) => {
            const status = error.status || error.code || 500
            const message = error.message || error.msg || 'INTERNAL SERVER ERROR'
            return res.status(status).json({
                status,
                success: false,
                message,
                data: null,
                error: {
                    status,
                    message
                }
            })
        })
    }
}
`

export const controllerBase = `const autoBind = require("auto-bind");

module.exports = class Controller {
    constructor() {
        autoBind(this);
    }
}`

export const OOPServerJsCode = port => `const Application = require("./app/index");

// Enter your database url.
new Application(${port}, "dbAddr")
`

export const OOPRouter = `const Router = require('express').Router();
Router.get('/', (req, res) => {
    return res.status(200).json({
        status: 200,
        success: true,
        message: '🎉 APP Bootstrapped successfully.',
        data: null,
        error: null
    })
});

module.exports = Router;
`