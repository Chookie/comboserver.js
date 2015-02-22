angular.module('app')
    .controller('mvMainCtrl', ['$scope', '$http',
        function ($scope,$http) {

            $http.get('/topics')
                .then(function (result) {
                    $scope.topics = result.data;
                }, function (err) {
                    console.log(err);
                });

            $http.get('/messages')
                .then(function (result) {
                    $scope.messages = result.data;
                }, function (err) {
                    console.log(err);
                });
        }
]);