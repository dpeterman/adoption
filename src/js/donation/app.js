(function() {
  'use strict';

  var TOTAL_AMOUNTS = 200;
  var BROAD_AMOUNT_STEPS = 10;

  var module = angular.module('donationApp', []);

  module.controller('DonationController', ['$scope', function($scope) {
    $scope.userSelections = [];
    $scope.selectedBroadAmount = null;
    $scope.broadAmounts = [];
    $scope.subAmounts = {};

    for(var i = BROAD_AMOUNT_STEPS; i <= TOTAL_AMOUNTS; i += BROAD_AMOUNT_STEPS) {
      $scope.broadAmounts.push(i);
    }

    $scope.broadAmounts.forEach(function(amt) {
      $scope.subAmounts[amt] = [];

      for(var i = amt - BROAD_AMOUNT_STEPS + 1; i <= amt; i++) {
        $scope.subAmounts[amt].push(i);
      }
    });

    $scope.setSelectedBroadAmount = function(bAmt) {
      $scope.selectedBroadAmount = bAmt;
    };

    $scope.clearSelectedBroadAmount = function() {
      $scope.selectedBroadAmount = null;
    };

    $scope.toggleAmount = function(amt) {
      if($scope.isSelectedAmount(amt)) {
        $scope.removeSelectedAmount(amt);
      } else {
        $scope.addSelectedAmount(amt);
      }
    };

    $scope.addSelectedAmount = function(amt) {
        if(!$scope.isSelectedAmount(amt)) {
          $scope.userSelections.push(amt);
        }
    };

    $scope.isSelectedAmount = function(amt) {
      return $scope.userSelections.indexOf(amt) >= 0;
    };

    $scope.removeSelectedAmount = function(amount) {
      $scope.userSelections.splice($scope.userSelections.indexOf(amount), 1);
    };

    $scope.getTotalSelectedAmount = function() {
      var total = 0;

      $scope.userSelections.forEach(function(amt) {
        total += amt;
      });

      return total;
    };
  }]);

})();
