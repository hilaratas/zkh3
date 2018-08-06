import {impStatuses} from '../database';
import {bntStatuses} from '../database';
import {bntLinks} from '../database';
import {getNameByStatus} from '../utils/utils-common.js';
import {resultsRows} from '../components/results-rows.js';

export default function () {

	var hResults = document.getElementById('v-results');
	var hResHolder = document.getElementById('v-results__holder');

	if ( !hResults ) {
		return;
	}

	var oresrows = {};
	var oldFilterParams = {};
	var rowsFilterParams = {};

	Object.assign(oresrows, window.oresrows);
	Object.assign(oldFilterParams, window.filterParams);
	Object.assign(rowsFilterParams, window.filterParams);

	var vR = new Vue({
		el: '#v-results',
		components: {resultsRows: resultsRows},
		data: {
			load: false,
			showAll: true,
			filterSubmitted: false,
			filterParams: window.filterParams,
			oldFilterParams: oldFilterParams,
			rowsFilterParams: rowsFilterParams
		},
		mounted: function() {
			this.load = true;
		},
		methods: {
			submitHdl: function(event) {
				event.preventDefault();

				if ( this.showAll ) {
					this.rowsFilterParams.lc = +this.filterParams.lc;
					Object.assign(this.oldFilterParams, this.filterParams);
					this.showAll = false;
				} else {
					if ( !isIqualOjects(this.oldFilterParams, this.filterParams) ) {
						this.rowsFilterParams.lc = +this.filterParams.lc;
						Object.assign(this.oldFilterParams, this.rowsFilterParams);
					}
				}

				this.showAll = false;	
			}
		}
	});

	function isIqualOjects(aO, bO) {
		var aKeys = Object.keys(aO);
		var bKeys = Object.keys(bO);
		var result = true;

		if(aKeys.length !== bKeys.length) 
			return false;

		for (var i = 0; i < aKeys.length; i++ ) {
			if (aO[aKeys[i]] !== bO[aKeys[i]] ) { 
				result = false;
				break;
			}
		}
		return result;
	};

}