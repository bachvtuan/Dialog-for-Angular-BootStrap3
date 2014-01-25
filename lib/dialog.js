/**
 * Note: This version requires Angular UI Bootstrap >= v0.10.0 which support bootstrap3
 * This module is folked from tool which support bootstrap2.3.2 from url http://codepen.io/m-e-conroy/pen/ALsdF
 */

//== Controllers =============================================================//

angular.module('dialogs.controllers',['ui.bootstrap.modal'])

  /**
   * Error Dialog Controller 
   */
  .controller('errorDialogCtrl',['$scope','$modalInstance','msg',function($scope,$modalInstance,msg){
    //-- Variables -----//
    
    $scope.msg = (angular.isDefined(msg)) ? msg : 'An unknown error has occurred.';
    
    //-- Methods -----//
    
    $scope.close = function(){
      $modalInstance.close();
    }; // end close
  }]) // end ErrorDialogCtrl
  
  /**
   * Notify Dialog Controller 
   */
  .controller('notifyDialogCtrl',['$scope','$modalInstance','header','msg',function($scope,$modalInstance,header,msg){
    //-- Variables -----//
    
    $scope.header = (angular.isDefined(header)) ? header : 'Notification';
    $scope.msg = (angular.isDefined(msg)) ? msg : 'Unknown application notification.';
    
    //-- Methods -----//
    
    $scope.close = function(){
      $modalInstance.close();
    }; // end close
  }]) // end WaitDialogCtrl
  
  /**
   * Confirm Dialog Controller 
   */
  .controller('confirmDialogCtrl',['$scope','$modalInstance','header','msg',function($scope,$modalInstance,header,msg){
    //-- Variables -----//
    
    $scope.header = (angular.isDefined(header)) ? header : 'Confirmation';
    $scope.msg = (angular.isDefined(msg)) ? msg : 'Confirmation required.';
    
    //-- Methods -----//
    
    $scope.no = function(){
      $modalInstance.dismiss('no');
    }; // end close
    
    $scope.yes = function(){
      $modalInstance.close('yes');
    }; // end yes
  }]); // end ConfirmDialogCtrl / dialogs.controllers
  
  
//== Services ================================================================//

angular.module('dialogs.services',['ui.bootstrap.modal','dialogs.controllers'])

  /**
   * Dialogs Service 
   */
  .factory('$dialogs',['$modal',function($modal){
    return {
      error : function(msg){
        return $modal.open({
          templateUrl : '/dialogs/error.html',
          controller : 'errorDialogCtrl',
          resolve : {
            msg : function() { return angular.copy(msg); }
          }
        }); // end modal.open
      }, // end error
      notify : function(header,msg){
        return $modal.open({
          templateUrl : '/dialogs/notify.html',
          controller : 'notifyDialogCtrl',
          resolve : {
            header : function() { return angular.copy(header); },
            msg : function() { return angular.copy(msg); }
          }
        }); // end modal.open
      }, // end notify
      
      confirm : function(header,msg){
        return $modal.open({
          templateUrl : '/dialogs/confirm.html',
          controller : 'confirmDialogCtrl',
          resolve : {
            header : function() { return angular.copy(header); },
            msg : function() { return angular.copy(msg); }
          }
        }); // end modal.open
      }, // end confirm
      
      create : function(url,ctrlr,data,callback_ok, callback_cancel){
        var modalInstance = $modal.open({
          templateUrl: url,
          controller: ctrlr,
          resolve: {
            data : function() { return angular.copy(data); }
          }
        });
        modalInstance.result.then(function (result_data) {
          if ( angular.isDefined(callback_ok) ){
            callback_ok(result_data);
          }
          
        }, function () {
          if ( angular.isDefined(callback_cancel)){
            callback_cancel();
          }
        });
      } 
    }
  }]); // end $dialogs / dialogs.services
  
  
//== Module ==================================================================//

angular.module('dialogs',['dialogs.services','ngSanitize']) // requires angular-sanitize.min.js (ngSanitize) //code.angularjs.org/1.2.8/angular-sanitize.min.js
  // Add default templates via $templateCache
  .run(['$templateCache',function($templateCache){
    $templateCache.put('/dialogs/error.html','<div class="error_modal"><div class="modal-header dialog-header-error">    <h4><i class="glyphicon glyphicon-warning-sign" /> Error</h4></div><div class="modal-body">{{msg}}</div> <div class="modal-footer"><button class="btn btn-primary" ng-click="close()"  focus-me="{{true}}">Close</button></div></div>');
    $templateCache.put('/dialogs/notify.html','<div class="notify_modal"><div class="modal-header dialog-header-notify">    <h4><i class="glyphicon glyphicon-info-sign" /> {{header}}</h4></div><div class="modal-body">    {{msg}}</div> <div class="modal-footer"><button class="btn btn-primary" ng-click="close()"  focus-me="{{true}}">Close</button></div></div>');
    $templateCache.put('/dialogs/confirm.html','<div class="confirm_modal"><div class="modal-header dialog-header-confirm"><h4><i class="glyphicon glyphicon-check" /> {{header}}</h4></div><div class="modal-body"><p ng-bind-html="msg"></p></div>  <div class="modal-footer">      <button class="btn btn-primary" ng-click="yes()">Yes</button>      <button class="btn btn-warning" ng-click="no()" focus-me="{{true}}">No</button></div></div>');
  }]); 

