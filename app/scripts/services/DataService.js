'use strict';

angular
	.module('jobApplication.services')
	.factory('DataService', ['$http', '$q', 'DataServiceConfig', 'GraphConverter', function($http, $q, DataServiceConfig, GraphConverter){
		function query(params) {
			var deferred = $q.defer(),
					key = JSON.stringify(params),
					entry = query.cache[key];

			if (!entry) {
				$http
					.get(DataServiceConfig.url, {params: params})
					.then(function(response) {
						var graph = query.cache[key] = GraphConverter.convert(response.data);
						deferred.resolve(graph);
					});
			} else {
				deferred.resolve(entry);
			}

			return deferred.promise;
		}

		query.cache = {};
		return {
			query: query
		};
	}]);