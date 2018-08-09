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

	var oresrows = [];
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
			oresrows: [],
			oldFilterParams: oldFilterParams,
			rowsFilterParams: rowsFilterParams
		},
		created: function () {
			var ws = new WebSocket("ws://127.0.0.1:8080/mp_orders_repair.js");
			var self = this;
			ws.onopen = function(){
				console.log("Соединение установлено");
			};

			ws.onerror = function(err) {
				var popupHtml = `<div class="popup">
				        <div class="popup__header-holder">
				            <div class="popup-toggle-menu">
				                <div class="popup-toggle-menu__list">
				                    <div class="popup-toggle-menu__item"><span class="popup-toggle-menu__link is-active">Внимание!</span></div>
				                </div>
				            </div>
				        </div>
				        <div class="popup__text-holder">
				        	Соединение с сервером разорвано. <br> Данные в таблице не обновляются
				        </div>
				    </div>`;

				$.magnificPopup.open({
				  items: {
				    src: popupHtml,
				    type: 'inline'
				  }
				});
			}

			ws.onmessage = function(event) {
				var data = event.data;
				self.oresrows = JSON.parse(data);
			}

			ws.onclose = function(event) {
				var popupHtml = `<div class="popup">
				        <div class="popup__header-holder">
				            <div class="popup-toggle-menu">
				                <div class="popup-toggle-menu__list">
				                    <div class="popup-toggle-menu__item"><span class="popup-toggle-menu__link is-active">Внимание!</span></div>
				                </div>
				            </div>
				        </div>
				        <div class="popup__text-holder">
				        	Соединение с сервером разорвано <br> Данные в таблице не обновляются
				        </div>
				    </div>`;

				$.magnificPopup.open({
				  items: {
				    src: popupHtml, // can be a HTML string, jQuery object, or CSS selector
				    type: 'inline'
				  }
				});

			}

			Object.assign(this.oresrows, window.oresrows);

			return this.oresrows;

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