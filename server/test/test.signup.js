var axios = require('axios');
var config = require('./testConfig');
axios.post(config.BASEURL+'/api/signup', {
		name: 'wang3',
		password: 'wang3'
	})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});