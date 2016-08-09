var axios = require('axios');
var config = require('./testConfig');
axios.post(config.BASEURL+'/api/authenticate', {
		name: 'wang2',
		password: 'wang2'
	})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});