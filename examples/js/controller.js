angular.module('app').controller('Index_Ctrl', 
  ['$scope','$dialogs','$log', function($scope,$dialogs,$log){

    $scope.error = function(){
      $log.debug('Error');
      $dialogs.error("This is error messsage");
    }

    $scope.confirm = function(){
      $log.debug('Confirm');
      var dlg = $dialogs.confirm('Please Confirm','Are you under 20 year olds ?');
      dlg.result.then(function(btn){
        $dialogs.notify('Result','You clicked yes');
      });
    }

    $scope.notify = function(){
      $log.debug('Notify');
      $dialogs.notify('My title','You can override this messsage');
    }
    $scope.custom = function(){
      $log.debug('Custom');
      var modal_input_data = {title:'Add new user',label:'Name',description:'Name of user'};
      $scope._openInputModal( modal_input_data,function(name){
        if (name != '')
          $dialogs.notify('New name','You inputted with value ='+name);
      });
    }
  }
]);
