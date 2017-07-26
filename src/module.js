///<reference path="../../../headers/common.d.ts" />

import angular from 'angular';
import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import {TablePanelCtrl} from 'app/plugins/panel/table/module';

class PercentageTablePanelCtrl extends TablePanelCtrl {

  /** @ngInject */
  constructor($scope, $injector, $rootScope) {
    super($scope, $injector, $rootScope);
    this.$rootScope = $rootScope;
  }

  handleQueryResult(result) {
    if (result.data.length !== 2) {
      let error = new Error();
      error.message = 'Too many series error';
      error.data = 'Metric query returns ' + result.data.length + ' series.\nPercentage stat table panel expects two series.';
      throw error;
    }

    const lengthSerieA = result.data[0].rows.length;
    const lengthSerieB = result.data[1].rows.length;
    const maxLengthSeries = lengthSerieA > lengthSerieB ? lengthSerieA : lengthSerieB;

    if (lengthSerieA !== lengthSerieB) {
     let error = new Error();
     error.message = 'Not same amount of data';
     error.data = 'Serie A has ' + lengthSerieA + ' while Serie B has ' + lengthSerieB;
     throw error;
    }

    for (let i = 0; i < maxLengthSeries; i++) {
      const dataFirst = result.data[0].rows[i][2];
      const dataSecond = result.data[1].rows[i][2];
      const res = (dataFirst / dataSecond) * 100;
      result.data[0].rows[i][2] = res;
    }

    console.log('calling');
    return super.handleQueryResult(result);
  }
}

export {
  PercentageTablePanelCtrl,
  PercentageTablePanelCtrl as PanelCtrl
};
