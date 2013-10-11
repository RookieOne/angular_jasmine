// bus = new Bacon.Bus();
// bus.push("Hello World");
// myProp = bus.toProperty();
// x = null;
// monkey = {
//   setIt: function(m) {
//     x = m;
//   }
// }

// myProp.assign(monkey, "setIt");


App.controller("GreyHoundsController", function($scope, $http) {

  EQ.filter(function(msg) {
    return msg.model.type == "GreyHound";
  }).onValue(function(msg) {
    for(var i=0; i < $scope.greyHounds.length; i++) {
      greyHound = $scope.greyHounds[i];
      if (greyHound.id == msg.model.id) {
        greyHound.name = msg.model.name;
      }
    }
    $scope.$apply();
  });

  $scope.init = function() {
    $scope.greyHounds = [{ id: 1, name: "Penny"}, { id:2, name: "Moon"}];
  }

  $scope.getGreyHounds = function() {

    $http({ method: "GET", url: "http://www.example.com/greyhounds" })
      .success(function(data) {
        $scope.greyHounds = data;
      });
  }

});