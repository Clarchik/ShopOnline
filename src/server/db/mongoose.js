var mongoose_1 = require('mongoose');
var MongoDB = (function () {
    function MongoDB() {
        this.setMongoConfig();
    }
    MongoDB.prototype.setMongoConfig = function () {
        mongoose_1["default"].Promise = global.Promise;
        mongoose_1["default"].connect('mongodb+srv://admin:adminnimda@cluster0-lppdm.azure.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(function () {
            console.log('Connected to MongoDB successfully :)');
        }).catch(function (e) {
            console.log('Error while attempting to connect to MongoDB');
            console.log(e);
        });
        mongoose_1["default"].set('useCreateIndex', true);
        mongoose_1["default"].set('useFindAndModify', false);
    };
    return MongoDB;
})();
exports.MongoDB = MongoDB;
