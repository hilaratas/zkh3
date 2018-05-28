import {declOfNum} from '../utils/utils-common';
import {createMessage} from '../utils/utils-ajax-form';
import {ajaxResponseParse} from '../utils/utils-ajax-form';
import {reloadPage} from '../utils/utils-ajax-form';
import {insertResponseToForm} from '../utils/utils-ajax-form';
import {makeMsgFromArray} from '../utils/utils-ajax-form';
import {ajaxForm} from '../utils/utils-ajax-form';
import {reloadHref} from '../utils/utils-ajax-form';

export default function() {
	const $orderChangeStatus = $('.js-form-order-change-status');
	// const $orderCancell = $('#js-form-order-cancell');
	let count = 0;

	$('body').on('submit', '.js-form-order-change-status', function(evt){
		var $this_form = $(this);
		var $openedElem = $.magnificPopup.instance.st.el;
		var $lineForUpdate = $openedElem.parent().parent().parent();
		var $statusElem = $lineForUpdate.find('.js-order-status');
		var orderId = $openedElem.data('order-id');
		var orderStatus = $statusElem.data('status');
		var callbacks = {
			success: ajaxSuccess
		}
		var ajaxFormInst = ajaxForm($this_form, callbacks);

		if ( !$this_form.valid() ) {
			return false;
		}

		$this_form.find(".js-order-id").val(orderId);
		$this_form.find(".js-old-status").val(orderStatus);

		ajaxFormInst.sendAjax($this_form, callbacks);
		return false;

		function ajaxSuccess(data, textStatus, jqXHR) {
			var responseFromServer = ajaxResponseParse(data);
			var tmpMessages;
			var messages;
			var messages = makeMsgFromArray(responseFromServer.messages);
			var $mfpContent;
			var $context = this;
			var reloadTimeDelay = $context.data('reload-time-delay') || 2000;

			if(responseFromServer.result) {
				var newStatus = responseFromServer.new_status;
				var newStatusCyr = responseFromServer.new_status_cyrillic || undefined;
				var loc = document.location;
				var href = loc.host + loc.pathname + loc.search + '#last-orders__row--' + orderId;

				tmpMessages = responseFromServer.messages;
				if (reloadTimeDelay) {
					var reloadSec = (reloadTimeDelay/1000).toFixed(0);
					let secsName = declOfNum(reloadSec, ['секунду', 'секунды', 'секунд']);
					tmpMessages.push(`Страница перезагрузится через ${reloadSec} ${secsName}`);
				}
				messages = makeMsgFromArray(tmpMessages);

				$mfpContent = createMessage(messages, 'success');
				insertResponseToForm($context, $mfpContent);
				$statusElem.attr("data-status", newStatus).text(newStatusCyr);
				$openedElem.remove();

				reloadHref(reloadTimeDelay, href);
				
				$.ajax({
					url: '/ajax/updateOrderList.php',
					type: 'post',
					data: {type: 'operator', updateOrdersList: 'Y'},
					success: function(html) {
						if (html.length) {
		                    $('#js-results-holder').html(html);
		                    $('#js-results-block').trigger('update');
		                } else {
		                    window.location.reload(true);
		                }
					}
				});
			} else {
				$mfpContent = createMessage(messages, 'error');
				insertResponseToForm($context, $mfpContent);
			}
		}
	});

}