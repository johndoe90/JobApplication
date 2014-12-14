'use strict';
angular.module('jobApplication.services', []).constant('DataServiceConfig', { url: 'http://mysterious-sands-4193.herokuapp.com/api/query' });
angular.module('jobApplication.directives', []);
angular.module('jobApplication.controllers', []);
angular.module('jobApplication', [
  'ui.router',
  'ngAnimate',
  'ngSanitize',
  'jobApplication.controllers',
  'jobApplication.services',
  'jobApplication.directives'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('info', {
      abstract: true,
      url: '/info',
      controller: 'InfoController',
      templateUrl: 'partials/info.html'
    }).state('info.graph', {
      url: '/graph/:q',
      controller: 'GraphController',
      templateUrl: 'partials/graph.html'
    });
    $urlRouterProvider.otherwise('/info/graph/');
  }
]);
'use strict';
angular.module('jobApplication.controllers').controller('InfoController', [
  '$scope',
  function ($scope) {
    var wasClicked = false;
    $scope.infos = [{
        title: 'Sehr geehrte Damen und Herren,',
        imageUrls: [],
        imageTexts: [],
        body: 'herzlich willkommen zu meinem etwas anderen Bewerbungsschreiben. Hier haben Sie die M\xf6glichkeit einiges Wissenswerte \xfcber mich zu erfahren. Dazu m\xfcssen Sie nur auf einen der <a href="#" class="query">Links</a> klicken und Sie werden weitere Informationen zu diesem Thema erhalten.'
      }];
    $scope.clicked = function () {
      if (!wasClicked) {
        wasClicked = true;
        $scope.infos.unshift({
          title: '',
          imageUrls: [],
          imageTexts: [],
          body: 'Jedes der runden Elemente ist mit einem oder mehreren Elementen durch eine Linie verbunden. Die Beziehung zwischen zwei Elementen wird durch ein Wort beschrieben. Zur besseren Leserlichkeit, kann jedes Element beliebig verschoben werden (linke Maustaste gedr\xfcckt halten). Au\xdferdem ist es m\xf6glich jedes Element anzuklicken um zus\xe4tzliche Informationen dar\xfcber zu erhalten.'
        });
      }
    };
  }
]);
'use strict';
angular.module('jobApplication.controllers').controller('GraphController', [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$window',
  '$timeout',
  'DataService',
  function ($scope, $rootScope, $stateParams, $window, $timeout, DataService) {
    $scope.query = $stateParams.q || 'MATCH (n1:Phillip) RETURN n1';
    $rootScope.$broadcast('start-loading');
    DataService.query({ q: $scope.query }).then(function (graph) {
      $timeout(function () {
        $scope.graph = graph;
        $rootScope.$broadcast('stop-loading');
      }, 150);
    });
    $window.addEventListener('resize', function () {
      $scope.$apply();
    }, false);
  }
]);
'use strict';
angular.module('jobApplication.services').factory('DataService', [
  '$http',
  '$q',
  'DataServiceConfig',
  'GraphConverter',
  function ($http, $q, DataServiceConfig, GraphConverter) {
    function query(params) {
      var deferred = $q.defer(), key = JSON.stringify(params), entry = query.cache[key];
      if (!entry) {
        $http.get(DataServiceConfig.url, { params: params }).then(function (response) {
          var graph = query.cache[key] = GraphConverter.convert(response.data);
          deferred.resolve(graph);
        });
      } else {
        deferred.resolve(entry);
      }
      return deferred.promise;
    }
    query.cache = {};
    return { query: query };
  }
]);
/* global d3 */
'use strict';
angular.module('jobApplication.directives').directive('graph', [
  '$timeout',
  function ($timeout) {
    return {
      link: function (scope, element) {
        var r = 48;
        var width = element[0].clientWidth, height = element[0].clientHeight;
        var color = d3.scale.category20();
        var force = d3.layout.force().charge(-2500).gravity(0.125).distance(70).linkDistance(180).size([
            width,
            height
          ]);
        force.nodes(scope.graph.nodes).links(scope.graph.links).start();
        force.on('tick', function () {
          link.attr('x1', function (d) {
            return d.source.x;
          }).attr('y1', function (d) {
            return d.source.y;
          }).attr('x2', function (d) {
            return d.target.x;
          }).attr('y2', function (d) {
            return d.target.y;
          });
          circle.attr('cx', function (d) {
            return d.x;
          }).attr('cy', function (d) {
            return d.y;
          });
          node.attr('x', function (d) {
            return d.x - r;
          }).attr('y', function (d) {
            return d.y - r;
          });
          linkText.attr('transform', function (d) {
            var dx = d.target.x - d.source.x, dy = d.target.y - d.source.y, dr = Math.sqrt(dx * dx + dy * dy) || 0.1, sinus = dy / dr, cosinus = dx / dr, l = d.type.length * 8, offset = (1 - l / dr) / 2, x = d.source.x + dx * offset, y = d.source.y + dy * offset;
            return 'translate(' + x + ',' + y + ') matrix(' + cosinus + ', ' + sinus + ', ' + -sinus + ', ' + cosinus + ', 0 , 0)';
          });
        });
        var svg = d3.select(element[0]).append('svg').attr('width', width).attr('height', height);
        var link = svg.selectAll('.link').data(scope.graph.links).enter().append('line').attr('class', 'link').style('stroke-width', 1);
        var circle = svg.selectAll('.circle21').data(scope.graph.nodes).enter().append('circle').attr('r', Math.ceil(1.1 * r)).style('fill', function (d) {
            return color(JSON.stringify(d.labels));
          });
        var node = svg.selectAll('.node').data(scope.graph.nodes).enter().append('svg:image').attr('xlink:href', function (d) {
            return d.properties.avatar;
          }).attr('width', r * 2).attr('height', r * 2).attr('class', 'node').on('mousedown', function (d) {
            d.down = true;
            $timeout(function () {
              delete d.down;
            }, 250);
          }).on('mouseup', function (d) {
            if (d.down) {
              scope.$apply(function () {
                scope.infos.unshift({
                  imageUrls: d.properties.imageUrls,
                  imageTexts: d.properties.imageTexts,
                  body: d.properties.body,
                  title: d.properties.title
                });
              });
            }
          }).call(force.drag);
        node.append('title').text(function (d) {
          return d.properties.title;
        });
        var linkText = svg.selectAll('.link-text').data(scope.graph.links).enter().append('text').attr('class', 'link-text').text(function (d) {
            return d.type;
          });
        scope.$watch(function () {
          return element[0].clientWidth * element[0].clientHeight;
        }, function () {
          width = element[0].clientWidth;
          height = element[0].clientHeight;
          svg.attr({
            width: width,
            height: height
          });
          force.size([
            width,
            height
          ]);
          force.resume();
        });
      }
    };
  }
]);
'use strict';
angular.module('jobApplication.directives').directive('feedback', [function () {
    return {
      restrict: 'A',
      replace: true,
      template: '<div style="position: relative;">&nbsp;<div class="query-box" style="position: absolute; right: 10px; top: 0;"><a class="query" href="https://docs.google.com/forms/d/1Ec2c8jM2jtJiYphPuJZWGFWCFzdP2B0pL7iLg0fUGk4/viewform">Feedback</a></div></div>"',
      link: function () {
      }
    };
  }]);
'use strict';
angular.module('jobApplication.directives').directive('info', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'partials/template.html',
      link: function (scope, element) {
        scope.image = scope.info.imageUrls.length === 1 ? true : false;
        scope.carousel = scope.info.imageUrls.length > 1 ? true : false;
        scope.carouselId = 'carousel_' + Math.floor(Math.random() * 99999);
        $timeout(function () {
          if (scope.carousel) {
            element.find('#' + scope.carouselId).carousel({
              interval: 4000,
              wrap: false
            }, 100);
          }
        });
        var remove = element.find('.remove');
        element.on('mouseenter', function () {
          remove.fadeIn(200);
        }).on('mouseleave', function () {
          remove.fadeOut(200);
        });
        remove.on('click', function () {
          element.animate({ 'height': '0' }, 400, function () {
            scope.$apply(function () {
              scope.infos.splice(+element.attr('index'), 1);
            });
          });
        });
      }
    };
  }
]);
'use strict';
angular.module('jobApplication.services').factory('GraphConverter', [function () {
    function Graph() {
      this.nodes = [];
      this.links = [];
    }
    Graph.prototype.indexOfNode = function (nodeId) {
      for (var i = 0; i < this.nodes.length; i++) {
        if (nodeId === this.nodes[i].id) {
          return i;
        }
      }
      return -1;
    };
    Graph.prototype.indexOfLink = function (linkId) {
      for (var i = 0; i < this.links.length; i++) {
        if (linkId === this.links[i].id) {
          return i;
        }
      }
      return -1;
    };
    Graph.prototype.hasLink = function (link) {
      return this.links.some(function (currentLink) {
        return link.id === currentLink.id;
      });
    };
    Graph.prototype.hasNode = function (node) {
      return this.nodes.some(function (currentNode) {
        return node.id === currentNode.id;
      });
    };
    Graph.prototype.addNode = function (node) {
      if (!this.hasNode(node)) {
        this.nodes.push(node);
      }
    };
    Graph.prototype.addLink = function (relationship) {
      if (!this.hasLink(relationship)) {
        this.links.push({
          id: relationship.id,
          type: relationship.type,
          properties: relationship.properties,
          source: this.indexOfNode(relationship.startNode),
          target: this.indexOfNode(relationship.endNode)
        });
      }
    };
    return {
      convert: function (data) {
        var graph = new Graph();
        data.results.forEach(function (currentResult) {
          currentResult.data.forEach(function (currentData) {
            currentData.graph.nodes.forEach(function (currentNode) {
              graph.addNode(currentNode);
            });
            currentData.graph.relationships.forEach(function (currentRelationship) {
              graph.addLink(currentRelationship);
            });
          });
        });
        return {
          nodes: graph.nodes,
          links: graph.links
        };
      }
    };
  }]);
'use strict';
angular.module('jobApplication.directives').directive('fullscreen', [function () {
    return {
      link: function ($scope, $element) {
        var el = $element.get(0);
        $element.one('click', function () {
          if (el.requestFullscreen) {
            el.requestFullscreen();
          } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
          } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
          } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
          } else {
            console.log('fullscreen not supported');
          }
        });
      }
    };
  }]);
'use strict';
angular.module('jobApplication.directives').directive('loader', [function () {
    return {
      restrict: 'AE',
      template: '<img src="images/loader.gif" style="display: none; position: absolute; top: 50%; top: calc(50% - 33px); left: 50%; left: calc(50% - 33px); z-index: 250;">',
      link: function ($scope, $element) {
        $scope.$on('start-loading', function () {
          $element.children('img:first').show();
        });
        $scope.$on('stop-loading', function () {
          $element.children('img:first').fadeOut(300);
        });
      }
    };
  }]);
'use strict';
angular.module('jobApplication.directives').directive('browser', [function () {
    navigator.sayswho = function () {
      var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
      }
      M = M[2] ? [
        M[1],
        M[2]
      ] : [
        navigator.appName,
        navigator.appVersion,
        '-?'
      ];
      if ((tem = ua.match(/version\/([\.\d]+)/i)) != null)
        M[2] = tem[1];
      return M.join(' ');
    }();
    return {
      restrict: 'A',
      replace: true,
      template: '<div><div id="wrong-browser" style="display: none; position: absolute; top: 0; left: 0; z-index: 9999; width: 100%; height: 100%; background-color: hsla(0 , 100%, 0%, 0.7);"><div style="position: relative; top: 200px; width: 400px; margin-left: auto; margin-right: auto; color: white; font-family: Menlo,Monaco,Consolas,monospace; font-size: 115%;">Diese Anwendung wurde mit folgenden Browsern getestet: <br> <ul><li>Chrome 34</li><li>Firefox 29</li><li>Internet Explorer 9, 10, 11</li></ul>  Sollten Sie einen anderen Browser verwenden, kann es sein, dass die Seite nicht richtig angezeigt wird.</div></div></div>',
      link: function (scope, element) {
        var browser = navigator.sayswho.toLowerCase();
        if (browser.indexOf('chrome') === 0) {
        } else if (browser.indexOf('firefox') === 0) {
        } else if (browser.indexOf('ie') === 0 || browser.indexOf('msie') === 0) {
          if (parseInt(browser.split(' ')[1]) < 9) {
            element.find('#wrong-browser').show();
          }
        } else {
          element.find('#wrong-browser').show();
        }
        element.on('click', function () {
          element.find('#wrong-browser').fadeOut();
        });
        console.log(browser);
      }
    };
  }]);