export default function (socaddr, options) {
	var ws = new WebSocket("ws://127.0.0.1:8080/mp_orders_repair.js");
	var onopen = (options && options.onopen) ? options.onopen : onOpenHdl;
	var onerror = (options && options.onerror) ? options.onerror : onErrorHdl;
	var onclose = (options && options.onclose) ? options.onclose : onCloseHdl;

	ws.onopen = onopen;
	ws.onerror = onerror;
	ws.onclose = onclose;

	return ws;

	function onOpenHdl() {
		console.log("Соединение установлено");
	}

	function onErrorHdl(err) {
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

	function onCloseHdl(event) {
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
}