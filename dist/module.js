'use strict';

System.register(['angular', 'lodash', 'jquery', 'moment', 'app/plugins/panel/table/module'], function (_export, _context) {
  "use strict";

  var angular, _, $, moment, TablePanelCtrl, _createClass, PercentageTablePanelCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_appPluginsPanelTableModule) {
      TablePanelCtrl = _appPluginsPanelTableModule.TablePanelCtrl;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('PanelCtrl', _export('PercentageTablePanelCtrl', PercentageTablePanelCtrl = function (_TablePanelCtrl) {
        _inherits(PercentageTablePanelCtrl, _TablePanelCtrl);

        /** @ngInject */
        function PercentageTablePanelCtrl($scope, $injector, $rootScope) {
          _classCallCheck(this, PercentageTablePanelCtrl);

          var _this = _possibleConstructorReturn(this, (PercentageTablePanelCtrl.__proto__ || Object.getPrototypeOf(PercentageTablePanelCtrl)).call(this, $scope, $injector));

          _this.$rootScope = $rootScope;
          return _this;
        }

        _createClass(PercentageTablePanelCtrl, [{
          key: 'handleQueryResult',
          value: function handleQueryResult(result) {
            if (result.data.length !== 2) {
              var error = new Error();
              error.message = 'Too many series error';
              error.data = 'Metric query returns ' + result.data.length + ' series.\nPercentage stat table panel expects two series.';
              throw error;
            }

            var lengthSerieA = result.data[0].rows.length;
            var lengthSerieB = result.data[1].rows.length;
            var maxLengthSeries = lengthSerieA > lengthSerieB ? lengthSerieA : lengthSerieB;

            if (lengthSerieA !== lengthSerieB) {
              var _error = new Error();
              _error.message = 'Not same amount of data';
              _error.data = 'Serie A has ' + lengthSerieA + ' while Serie B has ' + lengthSerieB;
              throw _error;
            }

            for (var i = 0; i < maxLengthSeries; i++) {
              var dataFirst = result.data[0].rows[i][2];
              var dataSecond = result.data[1].rows[i][2];
              var res = dataFirst / dataSecond * 100;
              result.data[0].rows[i][2] = res;
            }

            this.setTimeQueryEnd();
            this.loading = false;

            // check for if data source returns subject
            if (result && result.subscribe) {
              this.handleDataStream(result);
              return;
            }

            if (this.dashboard.snapshot) {
              this.panel.snapshotData = result.data;
            }

            if (!result || !result.data) {
              console.log('Data source query result invalid, missing data field:', result);
              result = { data: [] };
            }

            this.events.emit('data-received', result.data);
          }
        }]);

        return PercentageTablePanelCtrl;
      }(TablePanelCtrl)));

      _export('PercentageTablePanelCtrl', PercentageTablePanelCtrl);

      _export('PanelCtrl', PercentageTablePanelCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
