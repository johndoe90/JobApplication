'use strict';

angular
	.module('jobApplication.services')
	.factory('DataService', ['$http', '$q', 'DataServiceConfig', 'GraphConverter', function($http, $q, DataServiceConfig, GraphConverter){
		function query(params) {
			var deferred = $q.defer(),
					key = JSON.stringify(params);

			if (!query.cache[key]) {
				$http
					.get(DataServiceConfig.url, {params: params})
					.then(function(response) {
						query.cache[key] = response.data;
						deferred.resolve(GraphConverter.convert(response.data));
					});
			} else {
				deferred.resolve(GraphConverter.convert(query.cache[key]));
			}

			return deferred.promise;
		}

		query.cache = {};
		return {
			query: query
		};
	}]);