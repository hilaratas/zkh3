import {declOfNum} from '../utils/utils-common';
import {milliToSec} from '../utils/utils-common';
import {createMessage} from '../utils/utils-ajax-form';
import {ajaxResponseParse} from '../utils/utils-ajax-form';
import {reloadPage} from '../utils/utils-ajax-form';
import {insertResponseToForm} from '../utils/utils-ajax-form';
import {makeMsgFromArray} from '../utils/utils-ajax-form';
import {ajaxForm} from '../utils/utils-ajax-form';
import {reloadHref} from '../utils/utils-ajax-form';

export default function() {
	const badResponseJSON = {
		"result": false,
		"messages": ["Неизвестная ошибка сервера. Попробуйте повторить попытку позднее."]
	}

	const orderActionBtns = {
		open: $(`<a class='button button--no-fill js-popup-form-ajax'>открыть</a>`)
	}

	const $passRemind = $('#js-form-password-remind');
	const $passConfirm = $('#js-form-password-confirm');	

	$('.js-form-ajax').each(function(){
		var $this_form = $(this);

		$this_form.on('submit', function(evt){
			var ajaxCallbacks = {
				success: ajaxSuccess
			};

			if ( !$this_form.valid() ) {
				return false;
			}
			
			sendAjax($this_form, ajaxCallbacks);
			return false;

			function ajaxSuccess(data, textStatus, jqXHR) {
				var responseFromServer = ajaxResponseParse(data);
				var messages = makeMsgFromArray(responseFromServer.messages);
				var $mfpContent;
				var $context = this;

				if(responseFromServer.result) {
					$mfpContent = createMessage(messages, 'success');
				} else {
					$mfpContent = createMessage(messages, 'error');
				}

				insertResponseToForm($context, $mfpContent);
			}
			
		});
	});

	$('.js-form-login').each(function(){
		var $this_form = $(this);

		$this_form.on('submit', function(evt){
			var req = $this_form.serialize();
			var ajaxCallbacks = {
				success: ajaxSuccess
			};

			if ( !$this_form.valid() ) {
				return false;
			}
			
			sendAjax($this_form, ajaxCallbacks);
			return false;

			function ajaxSuccess(data, textStatus, jqXHR) {
				var responseFromServer = ajaxResponseParse(data);
				var messages = makeMsgFromArray(responseFromServer.messages);
				var $mfpContent;
				var $context = this;
				var reloadTimeDelay = parseInt($context.data('reload-time-delay')) || 1200; 

				if(responseFromServer.result) {
					$mfpContent = createMessage(messages, 'success');
					reloadPage(reloadTimeDelay);
				} else {
					$mfpContent = createMessage(messages, 'error');
				}

				insertResponseToForm($context, $mfpContent);
			}
			
		});
	});

	$('.js-form-registration').each(function(){
		var $this_form = $(this);

		$this_form.on('submit', function(evt){
			var req = $this_form.serialize();
			var ajaxCallbacks = {
				success: ajaxSuccess
			};

			if ( !$this_form.valid() ) {
				return false;
			}

			sendAjax($this_form, ajaxCallbacks);
			return false;

			function ajaxSuccess(data, textStatus, jqXHR) {
				var responseFromServer = ajaxResponseParse(data);
				var messages = makeMsgFromArray(responseFromServer.messages);
				var $mfpContent;
				var $context = this;
				var reloadTimeDelay = $context.data('reload-time-delay') || 1200; 

				if(responseFromServer.result) {
					$.magnificPopup.open({
						items: {
						    src: '#popup-registration-confirm'
						},
						type: 'inline'
					});
					
				} else {
					$mfpContent = createMessage(messages, 'error');
					insertResponseToForm($context, $mfpContent);
				}	
			}
		});
	});

	$passRemind.on('submit', function(evt){
		var $this_form = $(this);
		var req = $this_form.serialize();
		var ajaxCallbacks = {
			success: ajaxSuccess,
			complete: ajaxCompleteHandler
		};

		if ( !$this_form.valid() ) {
			return false;
		}

		sendAjax($this_form, ajaxCallbacks);
		return false;

		function ajaxSuccess(data, textStatus, jqXHR) {
			var responseFromServer = ajaxResponseParse(data);
			var messages = makeMsgFromArray(responseFromServer.messages);
			var $mfpContent;
			var $context = this;
			var desibledTimeDelay = $context.data('disabled-time-delay') || 30000;
			var $submitButton = $context.find('button[type=submit]');

			if(responseFromServer.result) {
				$passConfirm.find('input, button').prop('disabled', false);
				$passConfirm.find('.js-tel-copy').val( $passRemind.find('.js-tel-for-copy').val() );
				$mfpContent = createMessage(messages, 'success');
				insertResponseToForm($context, $mfpContent);

				$submitButton.prop('disabled', true);
				setTimeout(function(){
					$submitButton.prop('disabled', false);
				}, desibledTimeDelay);

			} else {
				$submitButton.prop('disabled', false);
				$mfpContent = createMessage(messages, 'error');
				insertResponseToForm($context, $mfpContent);
			}	
		}

		function ajaxCompleteHandler(jqXHR, textStatus) {
			var $form = this;

    		$form.removeClass('is-submitted');
    	}
	});

	$passConfirm.on('submit', function(){
		var $this_form = $(this);
		var req = $this_form.serialize();
		var ajaxCallbacks = {
			success: ajaxSuccess
		};

		if ( !$this_form.valid() ) {
			return false;
		}

		sendAjax($this_form, ajaxCallbacks);
		return false;

		function ajaxSuccess(data, textStatus, jqXHR) {
			var responseFromServer = ajaxResponseParse(data);
			var tmpMessages;
			var messages;
			var $mfpContent;
			var $context = this;
			var reloadTimeDelay = 2000;
			var reloadSec;
			var secsName;
			var reloadHrefPage = $context.data('reload-href') || document.location.href;

			if (typeof $context.data('reload-time-delay') !== 'undefined') {
				reloadTimeDelay = $context.data('reload-time-delay');
			}

			if(responseFromServer.result) {
				tmpMessages = responseFromServer.messages;
				if (reloadTimeDelay) {
					reloadSec = milliToSec(reloadTimeDelay);
					secsName = declOfNum(reloadSec, ['секунду', 'секунды', 'секунд']);
					tmpMessages.push(`Страница перезагрузится через ${reloadSec} ${secsName}.`);
				}
				messages = makeMsgFromArray(tmpMessages);

				$mfpContent = createMessage(messages, 'success');
				insertResponseToForm($context, $mfpContent);
				reloadHref(reloadTimeDelay, reloadHrefPage);
			} else {
				messages = makeMsgFromArray(responseFromServer.messages);
				$mfpContent = createMessage(messages, 'error');
				insertResponseToForm($context, $mfpContent);
			}
		}
	});

	$('#reg_in_vckp_checkbox').on('change', function(evt){
		let $checkbox = $(this);
		let $vckpNumber = $('#vckp_number');

		if ( $checkbox.prop('checked') ) {
			$vckpNumber.prop('disabled', false);
		} else {
			$vckpNumber.prop('disabled', true);
		}
	});

	$('.js-popup-login').magnificPopup({
    	type:'inline',
    	closeOnBgClick: false,
    	callbacks: {
    		open: function() {
    			var mfp = $.magnificPopup.instance;
    			var $openedElem = mfp.st.el;
    			var tabNumber = $openedElem.data('tab') || 0;
    			var mfpContent = mfp.content;

    			mfpContent.find(`.js-tab__switcher[data-tab="${tabNumber}"]`).trigger('click');
    		},
    		change: function() {
    			this.content.find('.is-back-holder').show();
    		},
    		close: function() {
    			this.content.find('.is-back-holder').hide();

    			clearForm($passRemind);
    			$passRemind.find('[type=submit]').prop('disabled', false);
    			clearForm($passConfirm);
			}
    	}
    });

    $('.js-form-custom-reset').on('click', function(evt){
    	evt.preventDefault();

    	var $btn = $(this);
    	var src = $btn.attr('href');

    	clearForm($passRemind);
    	$passRemind.find('[type=submit]').prop('disabled', false);
    });

	function sendAjax($form, callbacks) {
		$.ajax({
			type: $form.attr('method'),
			url: $form.attr('action'),
			data: $form.serialize(),
			dataType: 'text',
			context: $form,
			beforeSend: callbacks.beforeSend || ajaxBeforeSendDefHandler,
			success: callbacks.success || null,
			error: callbacks.error || ajaxErrorDefHandler,
			complete: callbacks.complete || ajaxCompleteDefHandler
		});
	}

	function ajaxBeforeSendDefHandler(jqXHR, settings) {
		var $form = this;

    	$form
    		.addClass('is-submitted')
			.find('input[type=submit], button[type=submit]').prop('disabled', true);
    }

    function ajaxCompleteDefHandler(jqXHR, textStatus) {
    	var $form = this;

    	$form
			.removeClass('is-submitted')
			.find('input[type=submit], button[type=submit]').prop('disabled', false);
    }

	function ajaxErrorDefHandler(jqXHR, textStatus, errorThrown) {
		var $form = this;
		var responseFromServer = badResponseJSON;
		var messages = makeMsgFromArray(responseFromServer.messages);
		var $mfpContent = createMessage(messages, 'error');

		insertResponseToForm($form, $mfpContent);
	}

	function clearValidationClass($form) {
		$form.find('input').removeClass('valid error');
	}

	function removeMessage($context) {
		$context.find('.message').remove();
	}

	function clearForm($form) {
    	clearValidationClass($form);
    	$form.validate().resetForm();
    	$form.get(0).reset();
    	removeMessage($form);
	}
}