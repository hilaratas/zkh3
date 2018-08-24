import {impStatuses} from '../database';
import {bntStatuses} from '../database';
import {bntLinks} from '../database';
import {getNameByStatus} from '../utils/utils-common.js';

export var resultsRows = {
	name: 'results-rows',
	template: "#results-rows-template",
	props: { filterSubmitted: Boolean, lc: Number, showAll: Boolean, oresrows: Array},
	data: function() {
		return {
			searchParams: ['id', 'serviceName', 'lc']
		}
	},
	computed: {
		resrows4Display: function() {
			return this.createResrows4Display(this.oresrows);
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
			var showAll = this.showAll || this.isEmptySearchQ(lc);

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
		},
		createResrows4Display: function (incomO) {
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
		},
		isEmptySearchQ: function(lc){
			return !lc;
		},
		popupHdl: function(){
			var btn = event.target;
			var target = btn.getAttribute('data-src');
			var row = btn.closest('tr');

			row.classList.add('is-selected');
			$.fancybox.open({
				src  : target,
				type : 'inline',
				opts : {
					beforeClose: function( instance, current ) {
						var $opElem = instance.$lastFocus;
						var $row = $opElem.closest('tr');

						$row.removeClass('is-selected');			
					} 
				}
			});

			return false;
		}
	}
};