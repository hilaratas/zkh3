export default function () {

	var hResults = document.getElementById('v-results');
	var hResHolder = document.getElementById('v-results__holder');

	if ( !hResults ) {
		return;
	}

	Vue.component('results-rows', {
		template: "#results-rows-template",
		props: ["resrow"]
	});

	var vm = new Vue({
		el: '#v-results',
		data: {
			oresrows : window.resrows
		},
		methods: {
		},
		computed: {
			resrows: function() {
				var tmpResrows = this.oresrows;
				var statuses = {
					'new': 'новый',
					'in-progress': 'в процессе',
					'appointed' : 'назначен',
					'run' : 'выполняется',
					'ready' : 'выполнен',
					'canceled' : 'отменен'
				}

				var bntStatuses = {
					'appoint' : 'назначить',
					'cancel' : 'отменить',
					'close' : 'закрыть',
					'open' : 'открыть'
				}

				var bntLinks = {
					'appoint' : '#popup-assign-master',
					'cancel' : '#popup-cancel',
					'close' : '#popup-change-status',
					'open' : '#popup-change-status'
				}

				console.log(this.oresrows);

				tmpResrows.forEach( function (elem, index) {
					if (tmpResrows[index].implStatus) {
						tmpResrows[index].implStatusName = statuses[tmpResrows[index].implStatus];
					}

					if (tmpResrows[index].actions) {
						tmpResrows[index].actions.forEach( function (el, idx) {
							var actionStatus = el.status;

							tmpResrows[index].actions[idx].name =  bntStatuses[actionStatus];
							tmpResrows[index].actions[idx].link = bntLinks[actionStatus];
						});
					}
				});
				return tmpResrows;
			}
		}
	});

}