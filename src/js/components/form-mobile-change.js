import {ajaxResponseParse} from '../utils/utils-ajax-form';
import {insertResponseToForm} from '../utils/utils-ajax-form';
import {makeMsgFromArray} from '../utils/utils-ajax-form';
import {createMessage} from '../utils/utils-ajax-form';
import {ajaxForm} from '../utils/utils-ajax-form';

export default function() {
	const $mobileChange = $('#js-form-mobile-change');
	const $mobileConfirm = $('#js-form-mobile-confirm');

	$('.js-popup-mobile-change').on('click', function(){
        let $input = $(this);
        let href = $input.data('href');

        $.magnificPopup.open({
        	closeOnBgClick: false,
            type:'inline',
            items: {
            	src: href,
            	type:'inline',
            },
            callbacks: {
                open: function() {
                    var mfpInt = $.magnificPopup.instance;

                    mfpInt.handleEl = $input;
                    $mobileChange.find('[type=submit]').prop('disabled', false);
                    $mobileConfirm.find('[type=submit]').prop('disabled', true);
                },
                close: function() {
                    var mfpInt = $.magnificPopup.instance;
                    var $form = mfpInt.content.find('form');
                    var $message = mfpInt.content.find('.message');

                    $mobileChange.find('[type=submit]').prop('disabled', true);
                    $mobileConfirm.find('[type=submit]').prop('disabled', false);

                    removeMessage($message);
                    clearValidate($form);

                    delete mfpInt.handleEl;
                }  
            }
        });
    });

    function removeMessage($message) {
        $message.remove();
    }

    function clearValidate($form) {
        $form.get(0).reset();
        $form.find('input, select').removeClass('valid error');
        $form.find('label.error').remove();
    }

	$mobileChange.on('submit', function(){
		var $this_form = $(this);
		var req = $this_form.serialize();
		var callbacks = {
			success: ajaxSuccess,
			complete: ajaxCompleteHandler
		};

		if ( !$this_form.valid() ) {
			return false;
		}

		var ajaxFormInst = new ajaxForm($this_form, callbacks);

		ajaxFormInst.sendAjax($this_form, callbacks);
		return false;

		function ajaxSuccess(data, textStatus, jqXHR) {
			var responseFromServer = ajaxResponseParse(data);
			var messages = makeMsgFromArray(responseFromServer.messages);
			var $mfpContent;
			var $context = this;
			var $submitButton = $context.find('button[type=submit]');
			var desibledTimeDelay = $context.data('disabled-time-delay') || 30000;

			if(responseFromServer.result) {
				$mfpContent = createMessage(messages, 'success');
				insertResponseToForm($context, $mfpContent);

				$mobileConfirm.find('input, button').prop('disabled', false);
				$mobileConfirm.find('.js-tel-copy').val( $mobileChange.find('.js-tel-for-copy').val() );

				setTimeout(function(){
					$submitButton.prop('disabled', false);
					$mobileConfirm.find('input, [type=submit]').prop('disabled', true);
				}, desibledTimeDelay);
			} else {
				$mobileChange.find('[type=submit]').prop('disabled', false);
				$mobileConfirm.find('input, [type=submit]').prop('disabled', true);
				$mfpContent = createMessage(messages, 'error');
				insertResponseToForm($context, $mfpContent);
			}
		}

		function ajaxCompleteHandler(jqXHR, textStatus) {
			var $form = this;

    		$form.removeClass('is-submitted');
    	}
	});

	$mobileConfirm.on('submit', function(){
		var $this_form = $(this);
		var req = $this_form.serialize();
		var callbacks = {
			success: ajaxSuccess
		};

		if ( !$this_form.valid() ) {
			return false;
		}

		var ajaxFormInst = new ajaxForm($this_form, callbacks);

		ajaxFormInst.sendAjax($this_form, callbacks);
		return false;

		function ajaxSuccess(data, textStatus, jqXHR) {
			var responseFromServer = ajaxResponseParse(data);
			var messages = makeMsgFromArray(responseFromServer.messages);
			var $mfpContent;
			var $context = this;
			var popupCloseTimeDelay = $context.data('popup-close-time-delay');
			var $submitButton = $context.find('button[type=submit]');
			var $newTel = $context.find('.js-tel-copy');
			var mfp = $.magnificPopup.instance;

			if(responseFromServer.result) {
				$mfpContent = createMessage(messages, 'success');
				insertResponseToForm($context, $mfpContent);
				$submitButton.prop('disabled', false);

				mfp.handleEl.val($newTel.val());

				setTimeout(function(){
					$.magnificPopup.close();
				}, popupCloseTimeDelay);
			} else {
				$mfpContent = createMessage(messages, 'error');
				insertResponseToForm($context, $mfpContent);
			}
		}
	});
}