(function (exports) {

    var _ = require('lodash');
    var mockMessageData = require('../data/mockMessages.json');

    var data = [];

    exports.getInitialMessages = function (numberOfMessages) {

        // Get sample of numberOfMessages data points
        data =  _.sample(mockMessageData, numberOfMessages)
            .map(function (message) {
                message.time_sent = (new Date()).toISOString();
                return message;
            });
        return data;
    };

    exports.subscribeForLatestMessages = function (millisecondsTimeInterval, callback) {

        setInterval( function () {
            // Drop oldest and push a new one onto the end
            data = _.drop(data, 1);
            var newItem = _.sample(mockMessageData, 1)
                .map(function (message) {
                    message.time_sent = (new Date()).toISOString();
                    return message;
                })[0];
            data.push(newItem);
            callback(data);
            //console.log('mockMessageData sending: %s %d', JSON.stringify(data), data.length);
        },millisecondsTimeInterval);
    };

}(module.exports));