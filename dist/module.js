'use strict';

System.register(['angular', 'lodash', 'jquery', 'moment', 'app/core/utils/file_export', 'app/plugins/sdk', './transformers', './editor', './column_options', './renderer', 'tether-drop'], function (_export, _context) {
  "use strict";

  var angular, _, $, moment, FileExport, MetricsPanelCtrl, transformDataToTable, tablePanelEditor, columnOptionsTab, TableRenderer, Drop, _createClass, _get, PercentageTablePanelCtrl;

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
    }, function (_appCoreUtilsFile_export) {
      FileExport = _appCoreUtilsFile_export;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_transformers) {
      transformDataToTable = _transformers.transformDataToTable;
    }, function (_editor) {
      tablePanelEditor = _editor.tablePanelEditor;
    }, function (_column_options) {
      columnOptionsTab = _column_options.columnOptionsTab;
    }, function (_renderer) {
      TableRenderer = _renderer.TableRenderer;
    }, function (_tetherDrop) {
      Drop = _tetherDrop.default;
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

      _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
          var parent = Object.getPrototypeOf(object);

          if (parent === null) {
            return undefined;
          } else {
            return get(parent, property, receiver);
          }
        } else if ("value" in desc) {
          return desc.value;
        } else {
          var getter = desc.get;

          if (getter === undefined) {
            return undefined;
          }

          return getter.call(receiver);
        }
      };

      _export('PanelCtrl', _export('PercentageTablePanelCtrl', PercentageTablePanelCtrl = function (_MetricsPanelCtrl) {
        _inherits(PercentageTablePanelCtrl, _MetricsPanelCtrl);

        /** @ngInject */
        function PercentageTablePanelCtrl($scope, $injector, templateSrv, annotationsSrv, $sanitize) {
          _classCallCheck(this, PercentageTablePanelCtrl);

          var _this = _possibleConstructorReturn(this, (PercentageTablePanelCtrl.__proto__ || Object.getPrototypeOf(PercentageTablePanelCtrl)).call(this, $scope, $injector));

          _this.pageIndex = 0;

          _this.panelDefaults = {
            targets: [{}],
            transform: 'timeseries_to_columns',
            pageSize: null,
            showHeader: true,
            styles: [{
              type: 'date',
              pattern: 'Time',
              alias: 'Time',
              dateFormat: 'YYYY-MM-DD HH:mm:ss'
            }, {
              unit: 'short',
              type: 'number',
              alias: '',
              decimals: 2,
              colors: ["rgba(245, 54, 54, 0.9)", "rgba(237, 129, 40, 0.89)", "rgba(50, 172, 45, 0.97)"],
              colorMode: null,
              pattern: '/.*/',
              thresholds: []
            }],
            columns: [],
            scroll: true,
            fontSize: '100%',
            sort: { col: 0, desc: true }
          };

          if (_this.panel.styles === void 0) {
            _this.panel.styles = _this.panel.columns;
            _this.panel.columns = _this.panel.fields;
            delete _this.panel.columns;
            delete _this.panel.fields;
          }

          _.defaults(_this.panel, _this.panelDefaults);

          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('data-error', _this.onDataError.bind(_this));
          _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('init-panel-actions', _this.onInitPanelActions.bind(_this));
          return _this;
        }

        _createClass(PercentageTablePanelCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Options', tablePanelEditor, 2);
            this.addEditorTab('Column Styles', columnOptionsTab, 3);
          }
        }, {
          key: 'onInitPanelActions',
          value: function onInitPanelActions(actions) {
            actions.push({ text: 'Export CSV', click: 'ctrl.exportCsv()' });
          }
        }, {
          key: 'issueQueries',
          value: function issueQueries(datasource) {
            this.pageIndex = 0;

            if (this.panel.transform === 'annotations') {
              this.setTimeQueryStart();
              return this.annotationsSrv.getAnnotations({ dashboard: this.dashboard, panel: this.panel, range: this.range }).then(function (annotations) {
                return { data: annotations };
              });
            }

            return _get(PercentageTablePanelCtrl.prototype.__proto__ || Object.getPrototypeOf(PercentageTablePanelCtrl.prototype), 'issueQueries', this).call(this, datasource);
          }
        }, {
          key: 'onDataError',
          value: function onDataError(err) {
            this.dataRaw = [];
            this.render();
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {
            this.dataRaw = dataList;
            this.pageIndex = 0;

            // automatically correct transform mode based on data
            if (this.dataRaw && this.dataRaw.length) {
              if (this.dataRaw[0].type === 'table') {
                this.panel.transform = 'table';
              } else {
                if (this.dataRaw[0].type === 'docs') {
                  this.panel.transform = 'json';
                } else {
                  if (this.panel.transform === 'table' || this.panel.transform === 'json') {
                    this.panel.transform = 'timeseries_to_rows';
                  }
                }
              }
            }

            this.render();
          }
        }, {
          key: 'handleQueryResult',
          value: function handleQueryResult(result) {
            if (result.data.length !== 2) {
              "";
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
            return _get(PercentageTablePanelCtrl.prototype.__proto__ || Object.getPrototypeOf(PercentageTablePanelCtrl.prototype), 'handleQueryResult', this).call(this, result);
          }
        }, {
          key: 'render',
          value: function render() {
            this.table = transformDataToTable(this.dataRaw, this.panel);
            this.table.sort(this.panel.sort);
            this.renderer = new TableRenderer(this.panel, this.table, this.dashboard.isTimezoneUtc(), this.$sanitize, this.templateSrv);

            return _get(PercentageTablePanelCtrl.prototype.__proto__ || Object.getPrototypeOf(PercentageTablePanelCtrl.prototype), 'render', this).call(this, this.table);
          }
        }, {
          key: 'toggleColumnSort',
          value: function toggleColumnSort(col, colIndex) {
            // remove sort flag from current column
            if (this.table.columns[this.panel.sort.col]) {
              this.table.columns[this.panel.sort.col].sort = false;
            }

            if (this.panel.sort.col === colIndex) {
              if (this.panel.sort.desc) {
                this.panel.sort.desc = false;
              } else {
                this.panel.sort.col = null;
              }
            } else {
              this.panel.sort.col = colIndex;
              this.panel.sort.desc = true;
            }
            this.render();
          }
        }, {
          key: 'exportCsv',
          value: function exportCsv() {
            FileExport.exportTableDataToCsv(this.renderer.render_values());
          }
        }, {
          key: 'link',
          value: function link(scope, elem, attrs, ctrl) {
            var data;
            var panel = ctrl.panel;
            var pageCount = 0;
            var formaters = [];

            function getTableHeight() {
              var panelHeight = ctrl.height;

              if (pageCount > 1) {
                panelHeight -= 26;
              }

              return panelHeight - 31 + 'px';
            }

            function appendTableRows(tbodyElem) {
              ctrl.renderer.setTable(data);
              tbodyElem.empty();
              tbodyElem.html(ctrl.renderer.render(ctrl.pageIndex));
            }

            function switchPage(e) {
              var el = $(e.currentTarget);
              ctrl.pageIndex = parseInt(el.text(), 10) - 1;
              renderPanel();
            }

            function appendPaginationControls(footerElem) {
              footerElem.empty();

              var pageSize = panel.pageSize || 100;
              pageCount = Math.ceil(data.rows.length / pageSize);
              if (pageCount === 1) {
                return;
              }

              var startPage = Math.max(ctrl.pageIndex - 3, 0);
              var endPage = Math.min(pageCount, startPage + 9);

              var paginationList = $('<ul></ul>');

              for (var i = startPage; i < endPage; i++) {
                var activeClass = i === ctrl.pageIndex ? 'active' : '';
                var pageLinkElem = $('<li><a class="table-panel-page-link pointer ' + activeClass + '">' + (i + 1) + '</a></li>');
                paginationList.append(pageLinkElem);
              }

              footerElem.append(paginationList);
            }

            function renderPanel() {
              var panelElem = elem.parents('.panel');
              var rootElem = elem.find('.table-panel-scroll');
              var tbodyElem = elem.find('tbody');
              var footerElem = elem.find('.table-panel-footer');

              elem.css({ 'font-size': panel.fontSize });
              panelElem.addClass('table-panel-wrapper');

              appendTableRows(tbodyElem);
              appendPaginationControls(footerElem);

              rootElem.css({ 'max-height': panel.scroll ? getTableHeight() : '' });
            }

            // hook up link tooltips
            elem.tooltip({
              selector: '[data-link-tooltip]'
            });

            elem.on('click', '.table-panel-page-link', switchPage);

            var unbindDestroy = scope.$on('$destroy', function () {
              elem.off('click', '.table-panel-page-link');
              unbindDestroy();
            });

            ctrl.events.on('render', function (renderData) {
              data = renderData || data;
              if (data) {
                renderPanel();
              }
              ctrl.renderingCompleted();
            });
          }
        }]);

        return PercentageTablePanelCtrl;
      }(MetricsPanelCtrl)));

      PercentageTablePanelCtrl.templateUrl = 'module.html';

      _export('PercentageTablePanelCtrl', PercentageTablePanelCtrl);

      _export('PanelCtrl', PercentageTablePanelCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
