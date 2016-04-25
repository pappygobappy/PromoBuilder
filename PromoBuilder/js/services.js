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
app.factory("PdfGenerator", function(){
  
  return false;
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
    students.addStudent = function(firstname, lastname, birthdate, kyudan, testrank, testcolor, promo) {
      if(connection){ 
        var promoid
        students.$add({
          firstname: firstname,
          lastname: lastname,
          birthdate: birthdate,
          applications: {},
        }).then(function(ref){
          var promoref = new Firebase("https://popping-torch-3108.firebaseio.com/Promotionals/"+promo.$id);
          //var firepromo = $firebaseObject(promoref);
          ref.child('applications/'+promo.$id).set({
            kyudan: kyudan,
            testrank: testrank,
            testcolor: testcolor,
          }); 
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