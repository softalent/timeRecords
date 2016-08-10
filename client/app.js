angular.module('app',[]);
angular.module('app').service('TimeRecordsSvc',['$http', function($http){
	var baseURL = 'http://localhost:8080'
	this.getAll = function(){
		console.log(baseURL + '/api/timeRecords');
		return $http.get(baseURL + '/api/timeRecords');
	}
	this.create = function(record){
		console.log(record);
		return $http.post( baseURL + '/api/timeRecords',record);
	}
}]);