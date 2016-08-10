angular.module('app').controller('TimeRecordsCtrl',['$scope',function($scope){
  $scope.timeRecords = [
    {
      dateAt:'2016-08-08',
      workingHours:3,
      description:'working on angular client'
    },
    {
      dateAt:'2016-08-08',
      workingHours:5,
      description:'working on angular client'
    },
    {
      dateAt:'2016-08-07',
      workingHours:3,
      description:'working on angular client'
    }
    ];   
  // $scope.resetNewRecordForm = function(){
  //   $scope.record = {
  //     date:'2016-08-09',
  //     workingHours:0,
  //     description:''};
  // }

  $scope.addTimeRecord = function(){
    if($scope.record){
      $scope.timeRecords.unshift({
        dateAt:$scope.record.date,
        workingHours:$scope.record.whours,
        description:$scope.record.desc
      });
      
    }
    $scope.record = null;
  }    
  // $scope.resetNewRecordForm();
}]);