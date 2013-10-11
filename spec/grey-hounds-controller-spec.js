describe("GreyHoundsController", function() {
  beforeEach(module("angularApp"));
  var controller;
  var scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller("GreyHoundsController", { $scope: scope });
  }));

  describe("getGreyHounds()", function() {
    var httpBackend;

    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
      httpBackend
        .when('GET', 'http://www.example.com/greyhounds')
        .respond(["Penny", "Moon"]);
    }));

    it("should set greyhounds", function() {
      scope.getGreyHounds();
      httpBackend.flush();
      expect(scope.greyHounds).toEqual(["Penny", "Moon"]);
    })
  });

  describe("GreyHound updated thru bacon", function() {
    beforeEach(function() {
      scope.greyHounds = [{ id: 1, name: "Penny" }, { id: 2, name: "Moon" }]
      EQ.push({
        model: {
          id: 1,
          type: "GreyHound",
          name: "Penny Lane"
        }
      })
    });

    it("should update greyhounds", function() {
      penny = scope.greyHounds[0]
      expect(penny.name).toEqual("Penny Lane");
    });
    it("should repond to future events", function() {
      penny = scope.greyHounds[0]
      expect(penny.name).toEqual("Penny Lane");
      EQ.push({
        model: {
          id: 1,
          type: "GreyHound",
          name: "Tip Tenille"
        }
      })
      expect(penny.name).toEqual("Tip Tenille");
      EQ.push({
        model: {
          id: 1,
          type: "GreyHound",
          name: "Pen"
        }
      })
      expect(penny.name).toEqual("Pen");
    });
  });

});