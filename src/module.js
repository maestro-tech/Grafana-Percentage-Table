///<reference path="../../../headers/common.d.ts" />

import angular from 'angular';
import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import {PanelCtrl} from 'app/plugins/sdk';
import {TablePanelCtrl} from 'app/plugins/panel/table/module.js';

// class PercentageTablePanelCtrl extends PanelCtrl {
//
//   /** @ngInject */
//   constructor($scope, $injector, $rootScope) {
//     super($scope, $injector, $rootScope);
//     this.$rootScope = $rootScope;
//
//     _.defaults(this.panel, this.panelDefaults);
//   }
//
//   handleQueryResult(result) {
//     if (result.data.length !== 2) {""
//       let error = new Error();
//       error.message = 'Too many series error';
//       error.data = 'Metric query returns ' + result.data.length + ' series.\nPercentage stat table panel expects two series.';
//       throw error;
//     }
//
//     const lengthSerieA = result.data[0].rows.length;
//     const lengthSerieB = result.data[1].rows.length;
//     const maxLengthSeries = lengthSerieA > lengthSerieB ? lengthSerieA : lengthSerieB;
//
//     if (lengthSerieA !== lengthSerieB) {
//      let error = new Error();
//      error.message = 'Not same amount of data';
//      error.data = 'Serie A has ' + lengthSerieA + ' while Serie B has ' + lengthSerieB;
//      throw error;
//     }
//
//     for (let i = 0; i < maxLengthSeries; i++) {
//       const dataFirst = result.data[0].rows[i][2];
//       const dataSecond = result.data[1].rows[i][2];
//       const res = (dataFirst / dataSecond) * 100;
//       result.data[0].rows[i][2] = res;
//     }
//     return super.handleQueryResult(result);
//   }
// }
//
// PercentageTablePanelCtrl.templateUrl = 'module.html';

console.log(TablePanelCtrl.prototype.__proto__);

export {
  TablePanelCtrl,
  TablePanelCtrl as PanelCtrl
};
