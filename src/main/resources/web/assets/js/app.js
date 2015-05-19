// Generated by CoffeeScript 1.9.0
(function() {
  var app;

  app = angular.module('RoutePlanner', ['ngProgress', 'ngAnimate']);

  app.directive("application", function() {
    var directive;
    directive = {};
    directive.restrict = "E";
    directive.templateUrl = "/assets/templates/application.html";
    directive.controller = "ApplicationController";
    return directive;
  });

  app.controller('ApplicationController', [
    '$scope', '$http', 'ngProgress', function($scope, $http, ngProgress) {
      ngProgress.height('6px');
      ngProgress.color('#FFBB00');
      $scope.getLocationFrom = function(val) {
        $scope.listVisibleFrom = val ? true : false;
        return $scope.getLocation(val);
      };
      $scope.getLocationTo = function(val) {
        $scope.listVisibleTo = val ? true : false;
        return $scope.getLocation(val);
      };
      $scope.getLocation = function(val) {
        return $http.get('/api/nodes/' + val).then(function(response) {
          return $scope.list = response.data;
        });
      };
      $scope.setFrom = function(item) {
        $scope.listVisibleFrom = false;
        $scope.from = item.id;
        return $scope.fromStation = item.name;
      };
      $scope.setTo = function(item) {
        $scope.listVisibleTo = false;
        $scope.to = item.id;
        return $scope.toStation = item.name;
      };
      $scope.performSearch = function() {
        if (($scope.from == null) || ($scope.to == null)) {
          alert('Du måste specificera både start- och slutdestination.');
          return;
        }
        ngProgress.start();
        return $http.get('/api/route/' + $scope.from + '/' + $scope.to).then(function(response) {
          $scope.errorAvailable = false;
          $scope.resultsAvailable = false;
          if (response.data.error != null) {
            $scope.errorAvailable = true;
            $scope.error = response.data.error;
            switch (response.data.error) {
              case "RouteNotFound":
                $scope.errorMsg = "Ingen resväg hittades mellan de valda destinationerna.";
                break;
              case "StationsNotInDataStore":
                $scope.errorMsg = "Ogiltig start- eller slutdestination.";
                break;
              case "MustChooseRoute":
                $scope.errorMsg = "Start- och slutdestination måste vara skilda.";
                break;
              default:
                $scope.errorMsg = "Tekniskt fel, kontakta systemadministratören.";
            }
          }
          if (response.data.response != null) {
            $scope.results = response.data;
            $scope.resultsAvailable = true;
          }
          return ngProgress.complete();
        });
      };
      $scope.getCostString = function(cost) {
        switch (cost) {
          case -1:
            return "Låg";
          case 0:
            return "Medelhög";
          case 1:
            return "Mycket hög";
        }
      };
      return $scope.showRouteType = 'TIME';
    }
  ]);

}).call(this);

//# sourceMappingURL=app.js.map
