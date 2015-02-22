angular.module('app')
    .controller('mvMainCtrl', ['$scope', '$http','$window',
        function ($scope,$http) {

            $scope.messages = [];

            $http.get('/topics')
                .then(function (result) {
                    $scope.topics = result.data;
                }, function (err) {
                    console.log(err);
                });

            var socket = io.connect();

            //socket.emit("join category", "recentMessage");

            socket.on("new message", function (messages) {
                // Add to angular model
                //console.log(JSON.stringify(messages));
                $scope.messages = messages;
                // because are not within angular piece of code we need to rebind
                $scope.$apply();
            });
        }
]);