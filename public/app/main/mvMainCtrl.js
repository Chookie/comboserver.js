angular.module('app')
    .controller('mvMainCtrl', ['$scope',
        function ($scope) {
            $scope.topics = [{"topic" : "topic 1"},{"topic" : "topic 2"}];
        }
]);