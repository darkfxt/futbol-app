/**
 * Created by MATIASJ on 8/11/2016.
 */
var u       = undefined
    path    = require('path'),
    rootPath  = path.normalize(__dirname + '/../..');

var Config = (function () {

    _env = process.env.NODE_ENV || "development";
    console.log("rootpath "+rootPath);

    var _config = {
        env: _env,
        URI_DB: "mongodb://iatsu_fxt:5010Foxy@127.0.0.1:27017/fxtests",
        //version: package.version,
        port : 3000,
        default_domain : "ARG" ,
        locales : [],
        rootPath: rootPath
    };

    console.log(JSON.stringify(_config));
    //componentsConfig = componentsConfig(require("./env/"+ _env ));

    return _config;

}) ();


module.exports = Config;