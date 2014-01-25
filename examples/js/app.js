var app = angular.module('app', [ 
    'ui.bootstrap',
    'dialogs'
  ]);

app.run(function($rootScope,$dialogs) {
  $rootScope.index_controller_template = 'templates/index_ctrl.html';
  $rootScope.input_modal_url = 'templates/inputModal.html';

  $rootScope._openInputModal = function(data, callback){
    $dialogs.create($rootScope.input_modal_url,'InputModalCtrl',data,callback);
  }
});


//Focus on textbox, button
app.directive('focusMe', function($timeout, $parse) {
  return {
    //scope: true,   // optionally create a child scope
    link: function(scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function(value) {
        console.log('value=',value);
        if(value === true) { 
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
      // to address @blesh's comment, set attribute value to 'false'
      // on blur event:
      element.bind('blur', function() {
         console.log('blur textbox');
         //scope.$apply(model.assign(scope, false));
      });
    }
  };
});