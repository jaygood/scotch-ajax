'use strict';

angular.module('phpFormApp')
  .controller('LoginCtrl', function (formService) {
    this.formData = {};
    this.processForm = function(data){
      formService.process(data)
        .success(function(data) {
            console.log(data);
            if (!data.success) {
              // if not successful, bind errors to error variables
                $scope.errorName = data.errors.name;
                $scope.errorSuperhero = data.errors.superheroAlias;
            } else {
              // if successful, bind success message to message
                $scope.message = data.message;
            }
        })
        .error(function(mess, data){
          console.log('mess: ', mess);
          console.log('data: ', data);
        })
        ;
    };
  })

  .service('formService', function($http){
    this.process = function(data){
      return $http({
        method  : 'POST',
        url     : 'process.php',
        data    : data,  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      })
    };
  });
