app.service('XService', ['$rootScope', '$http', function($rootScope, $http) {
  'use strict';

    this.style = { textFontSize: 8, textFontColor: "#000000" }

    var that = this;

    //Reset preference if another user logs in.
    this.resetPreference = function() {
      that.style = { textFontSize: 8, textFontColor: "#000000"}
    }
    // Setting prefernece for the model.
    this.init = function(username) {
      var getPreferenceUrl = that.getX(username).then(function(res) {
        if (res.length != 0) {
          var preference = res[0];
          //Assign preference values for each annotation.
          that.style.textFontSize = parseInt(preference.textFontSize);
          that.style.textFontColor = preference.textFontColor;
        }
      })
    }

    this.setX = function(username, jsonString) {
      var setX = '/api/setX/' + username;
      $http({
        url: setXUrl,
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        data: {jsonPreference}
      }).success(function(res) {
        return "Success";
      }).error(function(res) {
        return "Error";
      })
    }

    this.getX = function(username) {
      var getXUrl = '/api/getX/' + username;
      return $http.get(getXUrl).then(function(res) {
        return res.data;
      });
    }
}]);