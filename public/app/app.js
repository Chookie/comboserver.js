(function () {

    var app = angular.module('app', ['ngRoute']);

    app.config( function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl' })
        ;
    });

}());