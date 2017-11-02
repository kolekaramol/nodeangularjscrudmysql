var app = angular.module('myApp',['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'templates/home.html' ,
        controller: 'myController'
       })
        .when('/customers', {
        templateUrl: 'templates/list.html',
        controller: 'myController'
       })
        .when('/customers/create', {
        templateUrl: 'templates/add.html',
        controller: 'myController'
       })
        .when('/customers/edit/:id', {
        templateUrl: 'templates/edit.html',
        controller: 'myController'
       })
        .when('/customers/show/:id', {
        templateUrl: 'templates/show.html',
        controller: 'myController'
    })
     .when('/customers/search', {
        templateUrl: 'templates/search.html',
        controller: 'myController'
       });
});