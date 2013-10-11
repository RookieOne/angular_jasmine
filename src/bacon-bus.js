EQ = new Bacon.Bus();

App.factory("BaconBus", function($rootScope) {

  EQ.filter(function(msg) {
    return msg.model.type == "Person";
  }).onValue(function(msg) {
    for(var i=0; i < $rootScope.people.length; i++) {
      person = $rootScope.people[i];
      if (person.id == msg.model.id) {
        person.name = msg.model.name;
      }
    }
    $rootScope.$apply();
  });


  return {
    filter: function(modelType, fx) {
      EQ.filter(function(msg) {
        return msg.model.type == modelType;
      }).onValue(fx);
    }
  }
});