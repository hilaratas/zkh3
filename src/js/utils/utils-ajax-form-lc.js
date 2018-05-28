export const ajaxFormLc = ( options ) => {
	let o_sendAjax = {};
	// $o_context, o_callbacks, req
	// context: $context, callbacks:callbacks, req: req, action: action}
	let method = options.method;
	let action = options.action;
	let req = options.req;
	let $context = options.context;
	let callbacks = options.callbacks;

	o_sendAjax.sendAjax = function() {
		$.ajax({
			type: method,
			url: action,
			data: req,
			dataType: 'text',
			context: $context,
			beforeSend: callbacks.beforeSend || this.beforeSendDef,
			success: callbacks.success || null,
			error: callbacks.error || null,
			complete: callbacks.complete || this.completeDef
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