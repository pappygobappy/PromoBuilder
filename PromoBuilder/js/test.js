var app = angular.module('myApp', ['firebase', 'ngMaterial']);

app.factory("connection", function(){
  var status = true
  var connectedRef = new Firebase("https://popping-torch-3108.firebaseio.com/.info/connected");
  connectedRef.on("value", function(snap){
    if(snap.val() === true){
      status = false
    }
    else
      status = true
  })
  return status;
});

app.factory("promotionals", ["$firebaseArray", "connection",
  function($firebaseArray, connection) {
    // create a reference to the database where we will store our data
    var ref = new Firebase("https://popping-torch-3108.firebaseio.com/Promotoinals");
    var promo = $firebaseArray(ref)
    promo.addPromotional = function(date, type) {
      if(connection){
        promo.$add({
          date: date,
          type: type
        });
      }
      else{
        promos = JSON.parse(localStorage.getItem("Promotionals"));
        if(!promos)
          promos = [{date:"2.2", type:"poop"}];
        promos.push({
          date: date,
          type: type
        })
        localStorage.setItem("Promotionals", JSON.stringify(promos))
      }
    }
    return promo;
  }
]);

app.controller("MyCtrl", function($scope, $mdDialog, promotionals){
  $scope.promos = promotionals
  $scope.promos.$loaded().then(function() {
    $scope.loaded = true; // true
  })
  $scope.showDialog = function($event){
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent : parentEl,
      targetEvent: $event,
      templateUrl: "modalContent.html",
      controller: "DialogController"
    });
  }
});

app.controller("DialogController", function($scope, $mdDialog, promotionals){
  $scope.ok = function(){
    var date = ""
    var ageType = ""
    date = $scope.promoDate.toLocaleDateString()
    ageType = $scope.promoType
    promotionals.addPromotional(date, ageType)
    $mdDialog.hide();
  }
})
