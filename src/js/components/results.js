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

	var vFM = new Vue({
		el: '#v-filter-mode',
		data: {
			useVue: false
		},
		methods: {
			changeFilterMode: function (val) {
				this.useVue = val;
			}
		}
	});

	Vue.component('results-rows', {
		template: "#results-rows-template",
		data: function() {
			return { load: false }
		},
		computed: {
			resrows: function() {
				var tmpResrows = window.oresrows;

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

	var vFilter = new Vue({
		el: '#v-filter-form',
		data: {
			filterParams: window.filterParams,
			useVue: vFM.useVue || false
		},
		methods: {
			submitHdl: function(event) {
				if ( vFM.useVue ) {
					event.preventDefault();
				}
			}
		}
	});

	var vR = new Vue({
		el: '#v-results',
		data: {
			load: false
		},
		mounted: function() {
			this.load = true;
		}

	});



}