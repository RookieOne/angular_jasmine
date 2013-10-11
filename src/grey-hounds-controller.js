App.controller("GreyHoundsController", function($scope, $http, $rootScope, BaconBus) {

  $scope.init = function() {
    $scope.messages = [];
    $scope.greyHounds = [{ id: 1, name: "Penny"}, { id:2, name: "Moon"}];
    $rootScope.people = [{ id: 1, name: "JB" }, { id: 2, name: "Kiyu" }];
  }

  BaconBus.filter("GreyHound", function(msg) {
    $scope.messages.push(msg);
    for(var i=0; i < $scope.greyHounds.length; i++) {
      greyHound = $scope.greyHounds[i];
      if (greyHound.id == msg.model.id) {
        greyHound.name = msg.model.name;
      }
    }
    $scope.$apply();
  });

  $scope.getGreyHounds = function() {

    $http({ method: "GET", url: "http://www.example.com/greyhounds" })
      .success(function(data) {
        $scope.greyHounds = data;
      });
  }

});