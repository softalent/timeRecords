
angular.module('app').controller('TimeRecordsCtrl',['$scope','TimeRecordsSvc', function($scope,TimeRecordsSvc){
  
  $scope.timeRecords = TimeRecordsSvc.getAll().success(function(records){
    records.forEach(function(record){
      var temp = new Date(record.atDate);
      console.log(temp.toISOString());
      record.atDate = temp.toISOString().slice(0,10);
    });
    console.log(records);
    $scope.timeRecords = records; 

  });
  $scope.addTimeRecord = function(){
    if($scope.record){
      var newRecord={};
      newRecord.atDate = $scope.record.date;
      newRecord.workingHours = $scope.record.whours;
      newRecord.description = $scope.record.desc;

      TimeRecordsSvc.create(newRecord).success(function(record){
        $scope.timeRecords.unshift(newRecord);
        $scope.record = null;
      })

      
    }
   
  }    
  // $scope.resetNewRecordForm();
}]);