app.controller("MyCtrl", function($window, $scope, $mdDialog, $mdSidenav, promotionals){
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
  $scope.promoView = function(id){
    var date = new Date($scope.promos.$getRecord(id).date)
    ipcRenderer.send("folder", date.toDateString());
    $window.location.href = "#promo/"+id;
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

app.controller("PromotionalController", function($scope, $location, $routeParams, $mdDialog, $firebaseObject, PdfGenerator, promotionals, students, RANKS, COLORS){
  $scope.promos = promotionals
  $scope.loading = true;
  var tabs = [{tab: "All", students: []}];
  COLORS.forEach(function (item){
    tabs.push({tab: item, students: []});
  })
  $scope.tabs = tabs;
  var selectedColor = "All";
  var ref = {};
  $scope.selectedIndex = 0;
  $scope.studentTables = []
  var folder = ""


  $scope.promos.$loaded().then(function() {
      //console.log($scope.promos.$getRecord($routeParams.promoID));
      console.log($routeParams.promoID);
      $scope.promo = $scope.promos.$getRecord($routeParams.promoID);
      //$scope.promo.$loaded().then(function(){
        // $scope.promo.date)
      
      $scope.loading = false;
      $scope.downloading = false;
      $scope.studentTables = []
      $scope.studentTables[0] = []

      ref = new Firebase("https://popping-torch-3108.firebaseio.com/")
      //folder = $scope.promo.date;
      ref.child("Promotionals/"+$scope.promo.$id+"/Students").on("child_added", function(snapshot){
        var sturef = ref.child("Students/"+snapshot.key())
        console.log(snapshot.key())
        var stu = $firebaseObject(sturef);
        stu.$loaded().then(function (){
          //if(selectedColor == "All" || stu.applications[$routeParams.promoID].testcolor == selectedColor)
          $scope.tabs[0].students.push(stu)
          $scope.tabs[COLORS.indexOf(stu.applications[$routeParams.promoID].testcolor) + 1].students.push(stu);
          /*$scope.tabs[0].students.sort(function(a, b){
            return a.lastname > b.lastname;
          });*/
          $scope.tabs[0].students.sort(function(a, b){
            var aOrder = parseInt(a.applications[$routeParams.promoID].testrank.substring(0,2));
            var bOrder = parseInt(b.applications[$routeParams.promoID].testrank.substring(0,2));
            //console.log(aOrder)
            if(a.applications[$routeParams.promoID].kyudan == "Dan")
              aOrder -= 10;
            if(b.applications[$routeParams.promoID].kyudan == "Dan")
              bOrder -= 10;
            if(a.lastname > b.lastname)
              aOrder -= 0.5;
            else if (a.lastname < b.lastname)
              bOrder -= 0.5;
            if(a.firstname > b.firstname)
              aOrder -= 0.2;
            else
              bOrder -= 0.2;
            if(a.applications[$routeParams.promoID].kyudan == "Dan" && b.applications[$routeParams.promoID].kyudan == "Dan")
              return aOrder - bOrder;
            return bOrder - aOrder;
          });
          $scope.tabs[COLORS.indexOf(stu.applications[$routeParams.promoID].testcolor) + 1].students.sort(function(a, b){
            return a.lastname > b.lastname;
          });
          $scope.tabs[COLORS.indexOf(stu.applications[$routeParams.promoID].testcolor) + 1].students.sort(function(a, b){
            var aOrder = parseInt(a.applications[$routeParams.promoID].testrank.substring(0,2));
            var bOrder = parseInt(b.applications[$routeParams.promoID].testrank.substring(0,2));
            //console.log(aOrder)
            if(a.lastname > b.lastname)
              aOrder -= 0.5;
            else if(a.lastname < b.lastname)
              bOrder -= 0.5;
            if(a.firstname > b.firstname)
              aOrder -= 0.2;
            else
              bOrder -= 0.2;
            if(a.applications[$routeParams.promoID].kyudan == "Dan" && b.applications[$routeParams.promoID].kyudan == "Dan")
              return aOrder - bOrder;
            return bOrder - aOrder;
          });
          //$scope.studentTables[COLORS.indexOf(stu.applications[$routeParams.promoID].testcolor)].push(stu)
        });
        
      });

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
  $scope.tabSelected = function(tab){
    selectedColor = tab
    
  }

  $scope.generateCertificates = function(tab){
    $scope.downloading = true;
    var doc = new jsPDF('p', 'mm', 'letter');
    var width = doc.internal.pageSize.width;    
    var height = doc.internal.pageSize.height;

    for (var i = 0, len = tab.students.length; i < len; i++) {
      addCertificate(tab.students[i], $scope.promo, doc, width, height);
      if(i < len-1)
        doc.addPage();
    }
    
    //doc.text(35, 25, "Paranyan loves jsPDF");
    //doc.addImage(CERTIFICATEDATA, 'PNG', -5, -6, width+13 , height + 16);
    //doc.setFontSize(10);
    //doc.text(35, 25, "Paranyan loves jsPDF");
    //doc.text("Paranyan loves jsPDF", 35, 25, "", "", "center");
    //doc.output('datauri');
    doc.save(tab.tab+" Certificates.pdf");
    $scope.downloading = false;
    
  }

  $scope.generateRankingSheets = function(tab){
    var doc = new jsPDF('p', 'mm', 'letter');
    var width = doc.internal.pageSize.width;    
    var height = doc.internal.pageSize.height;
    doc.addImage(RANKINGSHEETDATA, 'JPG', -5, -6, width+13 , height + 16);
    var currentRank = tab.students[0].applications[$scope.promo.$id].testrank;
    doc.setFont("Arial")
    doc.setFontSize(28);
    //doc.setFontType("bold");
    doc.text(currentRank+" "+tab.students[0].applications[$scope.promo.$id].kyudan+" "+tab.students[0].applications[$scope.promo.$id].testcolor+" Belt", width/2, 28, "center");
    var count = 1;
    var x = width/2+17;
    var y = 0;
    doc.setFontSize(17);
    //doc.setFontStyle("");
    for(var i = 0; i < tab.students.length; i++){
      if(count == 5 || tab.students[i].applications[$scope.promo.$id].testrank != currentRank){
        count = 1;
        currentRank = tab.students[i].applications[$scope.promo.$id].testrank;
        doc.addPage();
        doc.addImage(RANKINGSHEETDATA, 'JPG', -5, -6, width+13 , height + 16);
        doc.setFontSize(28);
        //doc.setFontType("bold");
        doc.text(currentRank+" "+tab.students[i].applications[$scope.promo.$id].kyudan+" "+tab.students[i].applications[$scope.promo.$id].testcolor+" Belt", width/2, 28, "center");
        doc.setFontSize(17);
        //doc.setFontStyle("");
      }
      switch(count){
        case 1:
          y = 79;
          break;
        case 2:
          y = 135;
          break;
        case 3:
          y = 190;
          break;
        default:
          y = 248;
          
      }
      doc.text(tab.students[i].firstname+" "+tab.students[i].lastname, x, y);
      count++;
    }
    doc.save(tab.tab+" Judges Packet.pdf")
  }
  
})

app.controller("AddStudentCtrl", function($scope, $mdDialog, promo, students, RANKS, COLORS){
  $scope.ranks = RANKS;
  $scope.colors = COLORS;
  
  $scope.kyudan = "Kyu";

  

  $scope.ok = function(){
    var firstname = $scope.firstname;
    var lastname = $scope.lastname;
    var birthdate = $scope.birthdate.toLocaleDateString();
    var kyudan = $scope.kyudan;
    var testrank = $scope.testrank;
    var testcolor = $scope.testcolor;
    students.addStudent(firstname, lastname, birthdate, kyudan, testrank, testcolor, promo)
    $mdDialog.hide();
  }
  $scope.cancel = function(){
    $mdDialog.hide();
  }
  $scope.deriveColor = function(){
    console.log($scope.testrank)
    switch($scope.testrank + " " + $scope.kyudan){
      case "10th Kyu":
        color = "Yellow";
        break;
      case "9th Kyu":
      case "8th Kyu":
        color = "Blue";
        break;
      case "7th Kyu":
      case "6th Kyu":
        color = "Green";
        break;
      case "5th Kyu":
      case "4th Kyu":
        color = "Purple";
        break;
      case "3rd Kyu":
      case "2nd Kyu":
      case "1st Kyu":
        color = "Brown";
        break;
      case "":
        color = ""
        break;
      default:
        color = "Black";
    }
    $scope.testcolor = color;
  }
})

function addCertificate(student, promo, doc, width, height){
  doc.addImage(CERTIFICATEDATA, 'PNG', -5, -6, width+13 , height + 16);
  doc.setFontSize(20);
  doc.text(student.firstname+" "+student.lastname, width/2+1, height/2-18, "center");
  doc.text(student.applications[promo.$id].testrank+" "+student.applications[promo.$id].kyudan+" "+student.applications[promo.$id].testcolor+" Belt", width/2-1, height/2+6, "center");
  doc.setFontSize(15);
  console.log(promo.date)
  doc.text(promo.date, 72, 166, "center");
  doc.text("Sue Miller, Nobu Kaji", 67, 183, "center");
  doc.text("10th Dan", 150, 194, "center");
}