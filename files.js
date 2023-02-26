const { workingDIR } = require("./getWorkingDir")
const path = require("path");
const { serverCode, ControllerBaseCode, routesCode, VerifyAccessTokenCode, ValidationErrorMapperCode, SendResponseCode, SignAccessTokenCode, indexCode, env, keyGenCode } = require("./contents");

const files = [
    {
        name: "server.js",
        inside: path.join(workingDIR, "app"),
        content: serverCode
    },
    {
        name: "ControllerBase.js",
        inside: path.join(workingDIR, "app", "http", "controllers"),
        content: ControllerBaseCode
    },
    {
        name: "auth.controller.js",
        inside: path.join(workingDIR, "app", "http", "controllers", "auth"),
        content: ''
    },
    {
        name: "routes.js",
        inside: path.join(workingDIR, "app", "routes"),
        content: routesCode
    },
    {
        name: "auth.router.js",
        inside: path.join(workingDIR, "app", "routes", "auth"),
        content: ''
    },
    {
        name: "ValidationErrorMapper.js",
        inside: path.join(workingDIR, "app", "http", "middlewares"),
        content: ValidationErrorMapperCode
    },
    {
        name: "VerifyAccessToken.js",
        inside: path.join(workingDIR, "app", "http", "middlewares"),
        content: VerifyAccessTokenCode
    },
    {
        name: "auth.validator.js",
        inside: path.join(workingDIR, "app", "http", "validations", "auth"),
        content: ''
    },
    {
        name: "SignAccessToken.js",
        inside: path.join(workingDIR, "app", "utils"),
        content: SignAccessTokenCode
    },
    {
        name: "SendResponse.js",
        inside: path.join(workingDIR, "app", "utils"),
        content: SendResponseCode
    },
    {
        name: "functions.js",
        inside: path.join(workingDIR, "app", "utils"),
        content: ''
    },
    {
        name: "KeyGenerator.js",
        inside: path.join(workingDIR, "app", "utils"),
        content: keyGenCode
    },
    {
        name: "index.js",
        inside: workingDIR,
        content: indexCode
    },
    {
        name: ".env",
        inside: workingDIR,
        content: env
    }
];


module.exports = {
    files
}
