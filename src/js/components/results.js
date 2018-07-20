import {impStatuses} from '../database';
import {bntStatuses} from '../database';
import {bntLinks} from '../database';
import {getNameByStatus} from '../utils/utils-common.js';


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

	var rr = Vue.component('results-rows', {
		template: "#results-rows-template",
		props: { filterSubmitted: Boolean, lc: Number, showAll: Boolean},
		data: function() {
			return {
				searchParams: ['id', 'serviceName', 'lc'],
				oresrows: oresrows
			}
		},
		computed: {
			resrows4Display: function() {
				return createResrows4Display(this.oresrows);
			},
			resrows4Search: function() {
				var tmpResrows = []; 
				var newRow = {};

				this.resrows4Display.forEach(function(elem, index){
					newRow = {'id': elem.id, 'serviceName': elem.serviceName, 'lc': +elem.lc};
					tmpResrows.push(newRow);
				});

				return tmpResrows;
			},
			
			rowIdxs: function() {
				var self = this;
				var indx = [];
				var lc = this.lc;
				var showAll = this.showAll || isEmptySearchQ(lc);

				if ( showAll ) {
					indx = self.resrows4Search.map((elem, index) => index);
				} else {
					self.resrows4Search.forEach((elem, index) => { if (elem.lc === lc) indx.push(index); });
				}
				return indx;
			} 
		},
		methods: {
			prepareResrows: function( sourceObj ) {
				var tmpResrows = sourceObj;

				tmpResrows.forEach( function (elem, index) {
					if (tmpResrows[index].implStatus) {
						tmpResrows[index].implStatusName = getNameByStatus(impStatuses, tmpResrows[index].implStatus);
					}

					if (tmpResrows[index].actions) {
						tmpResrows[index].actions.forEach( function (el, idx) {
							var actionStatus = el.status;

							tmpResrows[index].actions[idx].name = getNameByStatus(bntStatuses, actionStatus);
							tmpResrows[index].actions[idx].link = getNameByStatus(bntLinks,actionStatus);
						});
					}
				});

				return tmpResrows;
			}
		}
	});

	

	var vR = new Vue({
		el: '#v-results',
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

	function createResrows4Display(incomO) {
		var tmpResrows = [];
		Object.assign(tmpResrows, incomO);

		tmpResrows.forEach( function (elem, index) {
			if (tmpResrows[index].implStatus) {
				tmpResrows[index].implStatusName = getNameByStatus(impStatuses, tmpResrows[index].implStatus);
			}

			if (tmpResrows[index].actions) {
				tmpResrows[index].actions.forEach( function (el, idx) {
					var actionStatus = el.status;

					tmpResrows[index].actions[idx].name = getNameByStatus(bntStatuses, actionStatus);
					tmpResrows[index].actions[idx].link = getNameByStatus(bntLinks,actionStatus);
				});
			}
		});

		return tmpResrows;
	}

	function isEmptySearchQ(lc){
		return !lc;
	}
}