/// <reference path="../defs.d.ts"/>
/// <reference path="../plugins/includes.ts"/>

/// <reference path="../../includes.ts"/>
var PipelineExample;
(function (PipelineExample) {
    var pluginName = 'hawtio-pipeline-example';
    var log = Logger.get(pluginName);
    var _module = angular.module(pluginName, []);
    _module.config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'test-plugins/example/html/examplePlugin.html'
            });
        }]);
    _module.controller('PipelineExample.Controller', ['$scope', function ($scope) {
            $scope.model = {
                // can filter the stages via this guy
                filterText: ''
            };
            var logLink = 'http://myjenkins/logs/blah';
            var builds = [];
            // failed build
            builds.push({
                displayName: "#1",
                id: 1,
                number: 1,
                building: false,
                $logLink: logLink,
                $timestamp: new Date().getTime(),
                result: 'FAILED',
                stages: [
                    {
                        stageName: 'foo',
                        status: 'SUCCESS',
                        duration: 300,
                        $startTime: new Date().getTime(),
                        $logLink: logLink
                    },
                    {
                        stageName: 'bar',
                        status: 'FAILED',
                        duration: 300,
                        $startTime: new Date().getTime(),
                        $logLink: logLink
                    }
                ]
            });
            // successful build
            builds.push({
                displayName: "#2",
                id: 2,
                number: 2,
                building: false,
                result: 'SUCCESS',
                $logLink: logLink,
                $timestamp: new Date().getTime(),
                stages: [
                    {
                        stageName: 'foo',
                        status: 'SUCCESS',
                        duration: 300,
                        $startTime: new Date().getTime(),
                        $logLink: logLink
                    },
                    {
                        stageName: 'bar',
                        status: 'SUCCESS',
                        duration: 300,
                        $startTime: new Date().getTime(),
                        $logLink: logLink
                    }
                ]
            });
            // pending build
            builds.push({
                displayName: "#3",
                id: 3,
                number: 3,
                building: true,
                $logLink: logLink,
                $timestamp: new Date().getTime(),
                stages: [
                    {
                        stageName: 'foo',
                        status: 'SUCCESS',
                        duration: 300,
                        $startTime: new Date().getTime(),
                        $logLink: logLink
                    },
                    {
                        stageName: 'bar',
                        status: 'RUNNING',
                        duration: 300,
                        $startTime: new Date().getTime(),
                        $logLink: logLink
                    }
                ]
            });
            // hide the log panel
            $scope.hideLogs = true;
            // Show the log link in the header
            $scope.listView = false;
            // Set the appropriate icon and background class
            builds.forEach(function (build) {
                build.stages.forEach(function (stage) {
                    stage.$iconClass = HawtioPipelineView.createBuildStatusIconClass(stage.status);
                    stage.$backgroundClass = HawtioPipelineView.createBuildStatusBackgroundClass(stage.status);
                });
            });
            setTimeout(function () {
                $scope.builds = builds;
                Core.$apply($scope);
            }, 10);
        }]);
    hawtioPluginLoader.addModule(pluginName);
})(PipelineExample || (PipelineExample = {}));

angular.module("hawtio-pipeline-view-test-templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("test-plugins/example/html/examplePlugin.html","<div class=\"container-fluid\" ng-controller=\"PipelineExample.Controller\">\r\n\r\n  <style>\r\n  .inline-block {\r\n    display: inline-block;\r\n  }\r\n  </style>\r\n\r\n  <div ng-repeat=\"build in builds\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <hawtio-pipeline-view></hawtio-pipeline-view>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n");}]); hawtioPluginLoader.addModule("hawtio-pipeline-view-test-templates");