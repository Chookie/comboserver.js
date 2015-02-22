(function () {

    var socket = require('socket.io');
    var mockMessageData = require('../data/mockMessages.json');
    var _ = require('lodash');

    module.exports.init = function (server) {
        var io = socket.listen(server);

        console.log('recentMessages initialising');

        io.sockets.on('connection', function (socket) {
            console.log("Socket was connected");

/*            socket.on("join category", function (category) {
                socket.join(category);
            });*/

            // Get sample of 10 data point
            var data = _.sample(mockMessageData, 10)
                .map(function (message) {
                    message.time_sent = (new Date()).toISOString();
                    return message;
                });

            setInterval( function () {
                // Drop oldest and push a new one onto the end
                data = _.drop(data, 1);
                var newItem = _.sample(mockMessageData, 1)
                    .map(function (message) {
                        message.time_sent = (new Date()).toISOString();
                        return message;
                    })[0];
                data.push(newItem);
                socket.broadcast.emit("new message", data);
                //console.log('mockMessageData sending: %s %d', JSON.stringify(data), data.length);
            },2000);
        });
    };

}());