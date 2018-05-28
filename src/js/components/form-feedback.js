import {ajaxResponseParse} from '../utils/utils-ajax-form';
import {makeMsgFromArray} from '../utils/utils-ajax-form';
import {createAlert} from '../utils/utils-ajax-form';
import {createMessage} from '../utils/utils-ajax-form';
import {ajaxForm} from '../utils/utils-ajax-form';

export default function() {
	const $fB = $('#feedback-form');
	const $fBResponseHolder = $('#feedback-form__response-holder');

	$fB.on('submit', function(){
		var $this_form = $(this);
		var req = $this_form.serialize();
		var callbacks = {
			success: ajaxSuccess,
			complete: ajaxCompleteHandler,
			error: ajaxError
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
			var $submitButton = $context.find('[type=submit]'); 

			if(responseFromServer.result) {
				$context.find('input, button').prop('disabled', false);
				$mfpContent = createAlert(messages, 'success');
				$fBResponseHolder.show().html($mfpContent);
				$fB.remove();
			} else {
				$context.find('[type=submit]').prop('disabled', false);
				$mfpContent = createMessage(messages, 'error');
				$fBResponseHolder.show().html($mfpContent);
			}
		}

		function ajaxCompleteHandler(jqXHR, textStatus) {
			var $form = this;

    		$form.removeClass('is-submitted');
    	}

    	function ajaxError(data, textStatus, jqXHR) {
			var responseFromServer = ajaxResponseParse(data);
			var messages = makeMsgFromArray(responseFromServer.messages);
			var $mfpContent;
			var $context = this;
			var $submitButton = $context.find('[type=submit]'); 

			$context.find('[type=submit]').prop('disabled', false);
			$mfpContent = createMessage(messages, 'error');
			$fBResponseHolder.show().html($mfpContent);
		}
	});
}