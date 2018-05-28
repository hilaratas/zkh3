const badResponseJSON = {
	"result": false,
	"messages": ["Неизвестная ошибка сервера. Попробуйте повторить попытку позднее."]
}

export const createMessage = (messages, type) => {
	var ttype = type || 'error';
	var $message = $(`
		<div class='message message--${ttype}'>
			<div class='message__content'>
				<div class='message__content-inner'>
					${messages}
				</div>
			</div>
			<div class='message__close'>
				<div class='message__close-inner'>
					&times;
				</div>
			</div>
		</div>`
	);

	return $message;
}

export const createAlert = (messages, type) => {
	var ttype = type || 'error';
	var $message = $(`
		<div class='message message--${ttype}'>
			<div class='message__content'>
				<div class='message__content-inner'>
					${messages}
				</div>
			</div>
		</div>`
	);

	return $message;
}

export const ajaxResponseParse = (response) => {
	var responseJSON = {};
	try {
		responseJSON = JSON.parse(response);
	} catch (err) {
		responseJSON = badResponseJSON;
	}
	return responseJSON;
}

export const reloadPage = (timeDelay) => {
	setTimeout(
		function(){
			document.location.href = document.location.href;
		},
		timeDelay
	);
}

export const reloadHref = (timeDelay, href) => {
	
	setTimeout(
		function(){
			document.location.href = href;
		},
		timeDelay
	);
}

export const insertResponseToForm = ($form, $response) => {
	$form
		.find('.popup__response-holder')
		.show()
		.html($response);
}

export const makeMsgFromArray = (array) => {
	var msg = '';

	for ( var i = 0; i <array.length; i++) {
		msg += array[i];
		if ( i !== (array.length - 1)) {
			msg += '<br/>';
		}
	}

	return msg;
}

export const ajaxForm = ($form, o_callbacks, $o_context) => {
	let o_sendAjax = {};
	let $context = $o_context || $form;

	o_sendAjax.sendAjax = function($form, o_callbacks) {
		$.ajax({
			type: $form.attr('method'),
			url: $form.attr('action'),
			data: $form.serialize(),
			dataType: 'text',
			context: $o_context || $form,
			beforeSend: o_callbacks.beforeSend || this.beforeSendDef,
			success: o_callbacks.success || null,
			error: o_callbacks.error || this.errorDef,
			complete: o_callbacks.complete || this.completeDef
		});
	};

	o_sendAjax.beforeSendDef = function(jqXHR, settings) {
		var $form = $context;

    	$form
    		.addClass('is-submitted')
			.find('input[type=submit], button[type=submit]').prop('disabled', true);
	}

	o_sendAjax.errorDef = function(jqXHR, textStatus, errorThrown) {
		var $form = $context;
		var responseFromServer = badResponseJSON;
		var messages = makeMsgFromArray(responseFromServer.messages);
		var $mfpContent = createMessage(messages, 'error');

		insertResponseToForm($form, $mfpContent);
	}

	o_sendAjax.completeDef = function(jqXHR, textStatus) {
		var $form = $context;

    	$form
    		.removeClass('is-submitted')
			.find('input[type=submit], button[type=submit]').prop('disabled', false);
	}

	return o_sendAjax;

}

export const clearValidate = ($form) => {
    $form.get(0).reset();
    $form.find('input, select').removeClass('valid error');
    $form.find('[type=submit]').prop('disabled', false);
    $form.find('label.error').remove();
}