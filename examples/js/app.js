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

