import {declOfNum} from '../utils/utils-common';
import {createMessage} from '../utils/utils-ajax-form';
import {ajaxResponseParse} from '../utils/utils-ajax-form';
import {reloadPage} from '../utils/utils-ajax-form';
import {insertResponseToForm} from '../utils/utils-ajax-form';
import {makeMsgFromArray} from '../utils/utils-ajax-form';
import {ajaxForm} from '../utils/utils-ajax-form';
import {clearValidate} from '../utils/utils-ajax-form';

export default function() {
	const $assignMasterOrAgent = $('#js-form-assign-master, #js-form-usluga-assign-agent');
	let count = 0;

	$assignMasterOrAgent.each(function(index, elem){
		var $form = $(this);

		$form.on('open.form', function(){
			var $this_form = $(this);
			var $openedElem = $.magnificPopup.instance.st.el;
			var orderId = $openedElem.data('order-id');
			var productId = $openedElem.data('product-id');
			var $orderRow = $(`#last-orders__row--${orderId}-${productId}`);
			var $statusElem = $orderRow.find('.js-order-status');
			var orderStatus = $statusElem.data('status');

			$this_form.find(".js-order-id").val(orderId);
			$this_form.find(".js-product-id").val(productId);
		});

		$form.on('close.form', function(){
			var $this_form = $(this);

			$this_form.find(".js-order-id").val('');
			$this_form.find(".js-product-id").val('');
			clearValidate($this_form);
		});

		$form.on('submit', function(){
			var $this_form = $(this);
			var $openedElem = $.magnificPopup.instance.st.el;
			var orderId = $this_form.find(".js-order-id").val();
			var productId = $this_form.find(".js-product-id").val();
			var $orderRow = $('#last-orders__row--' + orderId + '-' + productId);
			var $statusElem = $orderRow.find('.js-order-status');
			var callbacks = {
				success: ajaxSuccess
			}
			var ajaxFormInst = ajaxForm($this_form, callbacks);

			if ( !$this_form.valid() ) {
				return false;
			}

			ajaxFormInst.sendAjax($this_form, callbacks);
			return false;

			function ajaxSuccess(data, textStatus, jqXHR) {
				var responseFromServer = ajaxResponseParse(data);
				var messages = makeMsgFromArray(responseFromServer.messages);
				var $mfpContent;
				var $context = this; // $context - это форма 
				var orderId = $context.find(".js-order-id").val();
				var productId = $context.find(".js-product-id").val();
				var $orderRow = $('#last-orders__row--' + orderId + '-' + productId);
				var $statusElem = $orderRow.find('.js-order-status');

				if(responseFromServer.result) {
					var newStatus = responseFromServer.new_status;
					var newStatusCyr = responseFromServer.new_status_cyrillic || undefined;

					$mfpContent = createMessage(messages, 'success');
					insertResponseToForm($context, $mfpContent);
					$statusElem.attr("data-status", newStatus).text(newStatusCyr);
					$openedElem.remove();

					setTimeout(function(){
						$.magnificPopup.close()
					}, 
					1500);

					if ( $('#js-results-holder').length && $('#js-results-block').length) {
						$.ajax({
							url: '/ajax/updateOrderList.php',
							type: 'post',
							data: {type: window.type, updateOrdersList: 'Y'},
							success: function(html) {
								if (html.length) {
				                    $('#js-results-holder').html(html);
				                    $('#js-results-block').trigger('update');
				                } else {
				                    window.location.reload(true);
				                }
							}
						});
					}
				} else {
					$mfpContent = createMessage(messages, 'error');
					insertResponseToForm($context, $mfpContent);
				}
			}
		});
	});
}