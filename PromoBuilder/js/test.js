var app = angular.module('myApp', ['firebase', 'ngMaterial', 'ngRoute']);

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
  otherwise({
    redirectTo: "/home"
  });
}]);

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
    var ref = new Firebase("https://popping-torch-3108.firebaseio.com/Promotionals");
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

app.factory("students", ["$firebaseArray", "$firebaseObject", "connection",
  function($firebaseArray, $firebaseObject, connection) {
    // create a reference to the database where we will store our data
    var ref = new Firebase("https://popping-torch-3108.firebaseio.com/Students");
    var students = $firebaseArray(ref)
    students.addStudent = function(name, color, promo) {
      if(connection){
        var stu = students.$add({
          name: name,
          color: color,
        }).then(function(ref){
          var promoref = new Firebase("https://popping-torch-3108.firebaseio.com/Promotionals/"+promo.$id);
          //var firepromo = $firebaseObject(promoref);
          ref.child('Promotionals/'+promo.$id).set(true);
          console.log(ref);
          promoref.child("Students").child(ref.key()).set(true)
        });
      }
      else{
        /*promos = JSON.parse(localStorage.getItem("Promotionals"));
        if(!promos)
          promos = [{date:"2.2", type:"poop"}];
        promos.push({
          date: date,
          type: type
        })
        localStorage.setItem("Promotionals", JSON.stringify(promos))*/
      }
    }
    return students;
  }
]);

app.controller("MyCtrl", function($scope, $mdDialog, $mdSidenav, promotionals){
  $scope.date = Date;
  $scope.promos = promotionals
  $scope.promos.$loaded().then(function() {
    $scope.loaded = true; // true
  })
  $scope.showDialog = function($event){
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent : parentEl,
      targetEvent: $event,
      templateUrl: "html/modalContent.html",
      controller: "DialogController"
    });
  }
  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
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
  $scope.cancel = function(){
    $mdDialog.hide();
  }
})

app.controller("PromotionalController", function($scope, $location, $routeParams, $mdDialog, promotionals, students){
  $scope.promos = promotionals
  $scope.loading = true;
  $scope.promos.$loaded().then(function() {
      console.log($scope.promos.$getRecord($routeParams.promoID));
      console.log($routeParams.promoID);
      $scope.promo = $scope.promos.$getRecord($routeParams.promoID);
      $scope.loading = false;
      $scope.students = []
      var ref = new Firebase("https://popping-torch-3108.firebaseio.com/")
      ref.child("Promotionals/"+$scope.promo.$id+"/Students").on("child_added", function(snapshot){
        console.log(snapshot.key())
        ref.child("Students/"+snapshot.key()).once('value', function(snapshot){
          $scope.students.push(snapshot.val())
        })
      })

  });
  $scope.showDialog = function($event){
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent : parentEl,
      targetEvent: $event,
      templateUrl: "html/addStudent.html",
      controller: "AddStudentCtrl",
      locals: {promo: $scope.promo},
    });
  }
  
})

app.controller("AddStudentCtrl", function($scope, $mdDialog, promo, students){
  $scope.ok = function(){
    var name = $scope.name
    var color = $scope.color
    students.addStudent(name, color, promo)
    $mdDialog.hide();
  }
  $scope.cancel = function(){
    $mdDialog.hide();
  }
})
