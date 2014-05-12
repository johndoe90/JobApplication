"use strict";angular.module("jobApplication.services",[]).constant("DataServiceConfig",{url:"http://ec2-54-184-78-20.us-west-2.compute.amazonaws.com:9000/api/query"}),angular.module("jobApplication.directives",[]),angular.module("jobApplication.controllers",[]),angular.module("jobApplication",["ui.router","ngAnimate","ngSanitize","jobApplication.controllers","jobApplication.services","jobApplication.directives"]).config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("info",{"abstract":!0,url:"/info",controller:"InfoController",templateUrl:"partials/info.html"}).state("info.graph",{url:"/graph/:q",controller:"GraphController",templateUrl:"partials/graph.html"}),b.otherwise("/info/graph/")}]),angular.module("jobApplication.controllers").controller("InfoController",["$scope",function(a){var b=!1;a.infos=[{title:"Willkommen,",imageUrls:[],imageTexts:[],body:'zu meinem etwas anderen Bewerbungsschreiben. Hier haben Sie die Möglichkeit einiges Wissenswerte über mich zu erfahren. Dazu müssen Sie nur auf einen der <a href="#" class="query">Links</a> klicken und Sie werden weitere Informationen zu diesem Thema erhalten.'}],a.clicked=function(){b||(b=!0,a.infos.unshift({title:"",imageUrls:[],imageTexts:[],body:"Jedes der runden Elemente ist mit einem oder mehreren Elementen durch eine Linie verbunden. Die Beziehung zwischen zwei Elementen wird durch ein Wort beschrieben. Zur besseren Leserlichkeit, kann jedes Element beliebig verschoben werden (linke Maustaste gedrückt halten). Außerdem ist es möglich jedes Element anzuklicken um zusätzliche Informationen darüber zu erhalten."}))}}]),angular.module("jobApplication.controllers").controller("GraphController",["$scope","$rootScope","$stateParams","$window","$timeout","DataService",function(a,b,c,d,e,f){a.query=c.q||"MATCH (n1:Phillip) RETURN n1",b.$broadcast("start-loading"),f.query({q:a.query}).then(function(c){e(function(){a.graph=c,b.$broadcast("stop-loading")},150)}),d.addEventListener("resize",function(){a.$apply()},!1)}]),angular.module("jobApplication.services").factory("DataService",["$http","$q","DataServiceConfig","GraphConverter",function(a,b,c,d){function e(f){var g=b.defer(),h=JSON.stringify(f),i=e.cache[h];return i?g.resolve(i):a.get(c.url,{params:f}).then(function(a){var b=e.cache[h]=d.convert(a.data);g.resolve(b)}),g.promise}return e.cache={},{query:e}}]),angular.module("jobApplication.directives").directive("graph",["$timeout",function(a){return{link:function(b,c){var d=48,e=c[0].clientWidth,f=c[0].clientHeight,g=d3.scale.category20(),h=d3.layout.force().charge(-2500).gravity(.125).distance(70).linkDistance(180).size([e,f]);h.nodes(b.graph.nodes).links(b.graph.links).start(),h.on("tick",function(){j.attr("x1",function(a){return a.source.x}).attr("y1",function(a){return a.source.y}).attr("x2",function(a){return a.target.x}).attr("y2",function(a){return a.target.y}),k.attr("cx",function(a){return a.x}).attr("cy",function(a){return a.y}),l.attr("x",function(a){return a.x-d}).attr("y",function(a){return a.y-d}),m.attr("transform",function(a){var b=a.target.x-a.source.x,c=a.target.y-a.source.y,d=Math.sqrt(b*b+c*c)||.1,e=c/d,f=b/d,g=8*a.type.length,h=(1-g/d)/2,i=a.source.x+b*h,j=a.source.y+c*h;return"translate("+i+","+j+") matrix("+f+", "+e+", "+-e+", "+f+", 0 , 0)"})});var i=d3.select(c[0]).append("svg").attr("width",e).attr("height",f),j=i.selectAll(".link").data(b.graph.links).enter().append("line").attr("class","link").style("stroke-width",1),k=i.selectAll(".circle21").data(b.graph.nodes).enter().append("circle").attr("r",Math.ceil(1.1*d)).style("fill",function(a){return g(JSON.stringify(a.labels))}),l=i.selectAll(".node").data(b.graph.nodes).enter().append("svg:image").attr("xlink:href",function(a){return a.properties.avatar}).attr("width",2*d).attr("height",2*d).attr("class","node").on("mousedown",function(b){b.down=!0,a(function(){delete b.down},250)}).on("mouseup",function(a){a.down&&b.$apply(function(){b.infos.unshift({imageUrls:a.properties.imageUrls,imageTexts:a.properties.imageTexts,body:a.properties.body,title:a.properties.title})})}).call(h.drag);l.append("title").text(function(a){return a.properties.title});var m=i.selectAll(".link-text").data(b.graph.links).enter().append("text").attr("class","link-text").text(function(a){return a.type});b.$watch(function(){return c[0].clientWidth*c[0].clientHeight},function(){e=c[0].clientWidth,f=c[0].clientHeight,i.attr({width:e,height:f}),h.size([e,f]),h.resume()})}}}]),angular.module("jobApplication.directives").directive("info",["$timeout",function(a){return{restrict:"AE",replace:!0,templateUrl:"partials/template.html",link:function(b,c){b.image=1===b.info.imageUrls.length?!0:!1,b.carousel=b.info.imageUrls.length>1?!0:!1,b.carouselId="carousel_"+Math.floor(99999*Math.random()),a(function(){b.carousel&&c.find("#"+b.carouselId).carousel({interval:4e3,wrap:!1},100)});var d=c.find(".remove");c.on("mouseenter",function(){d.fadeIn(200)}).on("mouseleave",function(){d.fadeOut(200)}),d.on("click",function(){c.animate({height:"0"},400,function(){b.$apply(function(){b.infos.splice(+c.attr("index"),1)})})})}}}]),angular.module("jobApplication.services").factory("GraphConverter",[function(){function a(){this.nodes=[],this.links=[]}return a.prototype.indexOfNode=function(a){for(var b=0;b<this.nodes.length;b++)if(a===this.nodes[b].id)return b;return-1},a.prototype.indexOfLink=function(a){for(var b=0;b<this.links.length;b++)if(a===this.links[b].id)return b;return-1},a.prototype.hasLink=function(a){return this.links.some(function(b){return a.id===b.id})},a.prototype.hasNode=function(a){return this.nodes.some(function(b){return a.id===b.id})},a.prototype.addNode=function(a){this.hasNode(a)||this.nodes.push(a)},a.prototype.addLink=function(a){this.hasLink(a)||this.links.push({id:a.id,type:a.type,properties:a.properties,source:this.indexOfNode(a.startNode),target:this.indexOfNode(a.endNode)})},{convert:function(b){var c=new a;return b.results.forEach(function(a){a.data.forEach(function(a){a.graph.nodes.forEach(function(a){c.addNode(a)}),a.graph.relationships.forEach(function(a){c.addLink(a)})})}),{nodes:c.nodes,links:c.links}}}}]),angular.module("jobApplication.directives").directive("fullscreen",[function(){return{link:function(a,b){var c=b.get(0);b.one("click",function(){c.requestFullscreen?c.requestFullscreen():c.webkitRequestFullscreen?c.webkitRequestFullscreen():c.mozRequestFullScreen?c.mozRequestFullScreen():c.msRequestFullscreen?c.msRequestFullscreen():console.log("fullscreen not supported")})}}}]),angular.module("jobApplication.directives").directive("loader",[function(){return{restrict:"AE",template:'<img src="images/loader.gif" style="display: none; position: absolute; top: 50%; top: calc(50% - 33px); left: 50%; left: calc(50% - 33px); z-index: 250;">',link:function(a,b){a.$on("start-loading",function(){b.children("img:first").show()}),a.$on("stop-loading",function(){b.children("img:first").fadeOut(300)})}}}]),angular.module("jobApplication.directives").directive("browser",[function(){return navigator.sayswho=function(){var a,b=navigator.userAgent,c=b.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i)||[];return/trident/i.test(c[1])?(a=/\brv[ :]+(\d+(\.\d+)?)/g.exec(b)||[],"IE "+(a[1]||"")):(c=c[2]?[c[1],c[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(a=b.match(/version\/([\.\d]+)/i))&&(c[2]=a[1]),c.join(" "))}(),{restrict:"A",replace:!0,template:'<div><div id="wrong-browser" style="display: none; position: absolute; top: 0; left: 0; z-index: 9999; width: 100%; height: 100%; background-color: hsla(0 , 100%, 0%, 0.7);"><div style="position: relative; top: 200px; width: 400px; margin-left: auto; margin-right: auto; color: white; font-family: Menlo,Monaco,Consolas,monospace; font-size: 115%;">Diese Anwendung wurde mit folgenden Browsern getestet: <br> <ul><li>Chrome 34</li><li>Firefox 29</li><li>Internet Explorer 9, 10, 11</li></ul>  Sollten Sie einen anderen Browser verwenden, kann es sein, dass die Seite nicht richtig angezeigt wird.</div></div></div>',link:function(a,b){var c=navigator.sayswho.toLowerCase();0===c.indexOf("chrome")||0===c.indexOf("firefox")||(0===c.indexOf("ie")||0===c.indexOf("msie")?parseInt(c.split(" ")[1])<9&&b.find("#wrong-browser").show():b.find("#wrong-browser").show()),b.on("click",function(){b.find("#wrong-browser").fadeOut()}),console.log(c)}}}]);