import {declOfNum} from '../utils/utils-common';
import {createMessage} from '../utils/utils-ajax-form';
import {ajaxResponseParse} from '../utils/utils-ajax-form';
import {reloadPage} from '../utils/utils-ajax-form';
import {insertResponseToForm} from '../utils/utils-ajax-form';
import {makeMsgFromArray} from '../utils/utils-ajax-form';
import {ajaxForm} from '../utils/utils-ajax-form';

export default function() {
	const $addMember = $('.js-form-add-member');

	$addMember.each(function(){
		var $form = $(this);

		$form.on('submit', function(evt){
			var $this_form = $(this);
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
				var tmpMessages;
				var messages;
				var $mfpContent;
				var $context = this;
				var reloadTimeDelay =  $this_form.data('reload-time-delay') || 2000;

				if(responseFromServer.result) {
					tmpMessages = responseFromServer.messages;
					if (reloadTimeDelay) {
						var reloadSec = (reloadTimeDelay/1000).toFixed(0);
						let secsName = declOfNum(reloadSec, ['секунду', 'секунды', 'секунд']);
						tmpMessages.push(`Страница перезагрузится через ${reloadSec} ${secsName}`);
					}
					messages = makeMsgFromArray(tmpMessages);
					$mfpContent = createMessage(messages, 'success');
					insertResponseToForm($context, $mfpContent);
					reloadPage(reloadTimeDelay);
				} else {
					messages = makeMsgFromArray(responseFromServer.messages);
					$mfpContent = createMessage(messages, 'error');
					insertResponseToForm($context, $mfpContent);
				}
			}
		});
	});	
}