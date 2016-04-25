var app = angular.module('myApp', ['firebase', 'ngMaterial', 'ngRoute']);

app.constant("RANKS", ["10th", "9th", "8th", "7th", "6th", "5th", "4th", "3rd", "2nd", "1st"]);
app.constant("COLORS", ["Yellow", "Blue", "Green", "Purple", "Brown", "Black"]);
const ipcRenderer = require('electron').ipcRenderer;

app.config(["$routeProvider", function($routeProvider, promotionals){
  $routeProvider.
  when("/home", {
    templateUrl: "html/home.html",
    controller: "MyCtrl"
  }).
  when("/promo/:promoID", {
    templateUrl: "html/promotionalView.html",
    controller: "PromotionalController",
  }).
  when("/pdf", {
    controller: "PdfController"
  }).
  otherwise({
    redirectTo: "/home"
  });
}]);



