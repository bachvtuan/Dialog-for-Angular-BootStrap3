Dialog-for-Angular-BootStrap3
=============================

This dialog module is modified from the module which support angularjs bootstrap v0.6.0. it supported twitter bootstrap 2.3.2 at here [Link](http://codepen.io/m-e-conroy/pen/ALsdF)  
Since angujarjs-bootstrap updated to v0.10.0. that module doesn't display properly with twitter bootstrap 3.   
So I modified it to working well with twitter bootstrap 3.  
##Here is 4 methods in Dialogs module 
- __error__ : display error message
- __notify__  : display notification message
- __confirm__: confirm user's choice
- __create__: support create custom modal template for specific purposes.

You can take a look at example how to use it.   

###Below is quick guide:  
Include ui.bootstrap and dialogs module

     var app = angular.module('app', [ 
      'ui.bootstrap',
      'dialogs'
     ]);

__In your controller__ : to use error, confirm, notify like this

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

About custom modal, You can take a look at example. Basically, You create custom controller and custom template . when done, You can use code below to show custom modal:

     $dialogs.create(input_modal_template_ url,custom_controller,data,callback);
