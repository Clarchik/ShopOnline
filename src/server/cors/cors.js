var body_parser_1 = require('body-parser');
var Cors = (function () {
    function Cors(app) {
        this.app = app;
        this.setConfig();
    }
    Cors.prototype.setConfig = function () {
        // Allows us to receive requests with data in json format
        this.app.use(body_parser_1["default"].json({ limit: '50mb' }));
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // update to match the domain you will make the request from
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, _id, x-access-token, x-refresh-token');
            res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');
            next();
        });
    };
    return Cors;
})();
exports["default"] = Cors;
