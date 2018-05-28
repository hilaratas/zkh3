import {declOfNum} from '../utils/utils-common';
import {createMessage} from '../utils/utils-ajax-form';
import {ajaxResponseParse} from '../utils/utils-ajax-form';
import {reloadPage} from '../utils/utils-ajax-form';
import {insertResponseToForm} from '../utils/utils-ajax-form';
import {makeMsgFromArray} from '../utils/utils-ajax-form';
import {ajaxForm} from '../utils/utils-ajax-form';
import {clearValidate} from '../utils/utils-ajax-form';

export default function() {
	const $uslugaChangeStatusInList = $('.js-form-change-status-in-list');

	const orderActionBtns = {
		open: $(`<a class='button button--no-fill js-popup-form-ajax'>открыть</a>`),
		assign: $(`<a class='button button--no-fill js-popup-form-ajax'>назначить</a>`),
		cancel: $(`<a class='button button--no-fill js-popup-form-ajax'>отменить</a>`)
	}

	$uslugaChangeStatusInList.each(function(){
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
			$this_form.find(".js-old-status").val(orderStatus);
		});

		$form.on('close.form', function(){
			var $this_form = $(this);

			$this_form.find(".js-order-id").val('');
			$this_form.find(".js-product-id").val('');
			$this_form.find(".js-old-status").val('');
			clearValidate($this_form);
		});

		$form.on('submit', function(evt){
			var $this_form = $(this);
			var orderId = $this_form.find(".js-order-id").val();
			var productId = $this_form.find(".js-product-id").val();
			// var $openedElem = $.magnificPopup.instance.st.el;
			// var $actionsHolder = $openedElem.closest('.js-order-actions-holder');
			// var $lineForUpdate = $openedElem.parent().parent().parent();
			// var $statusElem = $lineForUpdate.find('.js-order-status');
			// var $oderId = $this_form.find('.js-order-id');
			// var $productId = $this_form.find('.js-product-id');
			// var $oldStatus = $this_form.find('.js-old-status');
			// var orderId = $openedElem.data('order-id');
			// var productId = $openedElem.data('product-id');
			// var oldStatus = $statusElem.data('status');
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
				var $context = this;
				var $orderRow = $(`#last-orders__row--${orderId}-${productId}`);
				var $statusElem = $orderRow.find('.js-order-status');
				var $actionsHolder = $orderRow.closest('.js-order-actions-holder');

				if(responseFromServer.result) {
					var newStatus = responseFromServer.new_status;
					var newStatusCyr = responseFromServer.new_status_cyrillic || undefined;

					$mfpContent = createMessage(messages, 'success');
					insertResponseToForm($context, $mfpContent);
					$statusElem.attr("data-status", newStatus).text(newStatusCyr);
					//$openedElem.remove();

					if( newStatus === 'canceled' ) {
						$actionsHolder.empty();
						var $button = orderActionBtns.open.clone().attr({
							"href": "#popup-сhange-status",
							"data-order-id": orderId,
							"data-product-id": productId
						});

						$button.appendTo($actionsHolder);
						mfp($button);
					}

					if ( newStatus === 'in-progress') {
						$actionsHolder.empty();
						var $buttonAssign = orderActionBtns.assign.clone().attr({
							"href": "#popup-assign-master",
							"data-order-id": orderId,
							"data-product-id": productId
						});
						$buttonAssign.appendTo($actionsHolder);
						mfp($buttonAssign);

						var $buttonCancel = orderActionBtns.cancel.clone().attr({
							"href": "#popup-cancell",
							"data-order-id": orderId,
							"data-product-id": productId
						});
						$buttonCancel.appendTo($actionsHolder);
						mfp($buttonCancel);
					}

					if (newStatus === 'signed' || newStatus === 'objection') {
						$actionsHolder.empty();
					}

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

	function mfp($button) {
		$button.magnificPopup({
            callbacks: {
                open: function () {
                    var mfpInt = $.magnificPopup.instance;
                    mfpInt.content.find('.message').remove();
                    mfpInt.content.find('form').get(0).reset();
                },
                close: function () {
                    var mfpInt = $.magnificPopup.instance;
                    mfpInt.content.find('.message').remove();
                    mfpInt.content.find('form').get(0).reset();
                }
            }
        });
	}
}