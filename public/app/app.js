(function () {
    console.log('mvMainCtrl initialising');

    var app = angular.module('app', ['ngRoute']);

    app.config( function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        console.log('mvMainCtrl initialising');

        $routeProvider
            .when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl' })
        ;
    });

}());