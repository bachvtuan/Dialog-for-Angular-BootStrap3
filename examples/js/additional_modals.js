
angular.module('app').controller('InputModalCtrl',function($scope,$modalInstance,data){
  
  $scope.form_data = {name : typeof data.name !== "undefined" ? data.name:""};
  $scope.title = data.title;
  $scope.label = data.label;
  $scope.description = data.description;

  $scope.cancel = function(){
    $modalInstance.dismiss('cancel');
  }; // end cancel
  
  $scope.ok = function(){
    $modalInstance.close($scope.form_data.name);
  }; // end save
  
  $scope.hitEnter = function(evt){
    if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.name,null) || angular.equals($scope.name,'')))
        $scope.ok();
  }; // end hitEnter
});

