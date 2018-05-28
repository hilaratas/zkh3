import {ajaxResponseParse} from '../utils/utils-ajax-form';
import {insertResponseToForm} from '../utils/utils-ajax-form';
import {makeMsgFromArray} from '../utils/utils-ajax-form';
import {createMessage} from '../utils/utils-ajax-form';
import {createAlert} from '../utils/utils-ajax-form';
import {ajaxFormLc} from '../utils/utils-ajax-form-lc';

export default function () {
	var $lcHolder = $('#js-lc-data');
	var $lcAddHolder = $('#js-lc-data__add-holder');
	var $lcAdd = $('#js-lc-data__add');
	var $lcs = $('.js-lc-data__lc');
	var $html = $('html');
	var $hasLc = $('#has_lc');
	var $formCabinet = $('#js-form-cabinet-edit');

	$lcHolder.on('added.newCode', function(){
		$lcHolder.find('.js-mask-lk').mask("?999999999", {placeholder: "_________" });;
	});

	$lcHolder.on('click', '.js-lc-data__modal', function(evt, informationObj){
		var $elem = $(this);
		var $context = $elem.closest('.js-lc-data__context');
		var $els4Reset = $context.find('.js-lc-data__empty-full');
		var result;
		$.magnificPopup.open({
			mainClass: 'mfp-fade-in mfp-modal',
			items: {
				src: "#popup-delete-lc"
			},
			type: 'inline',
			modal: true,
			callbacks: {
				close: function(){
					var mfpInt = $.magnificPopup.instance;
					result = mfpInt.st.answer;
				},
				afterClose: function(){
					var mfpInt = $.magnificPopup.instance;
					delete mfpInt.st.answer;

					if (result) {
						var blCount = $lcHolder.find(".js-lc-data__context").length;

						if (blCount > 1) {
							$elem.prev().trigger('click');
						} else {
							$elem.prev().trigger('click');
							$hasLc.trigger('click');
							$lcAdd.trigger('click');
						}
					}
				}
			}
		});
	});

	$hasLc.on('change', function(){
		var state = $(this).prop('checked');
		$lcHolder.toggle();
		$lcAddHolder.toggle();

		$lcHolder.find('.js-lc-data__lc').prop('disabled', !state);
	});

	
	$lcHolder.on('change', '.js-lc-data__lc', function(evt){
		var $lc = $(this);
		var $this_form = $lc.closest('form');
		var $context = $lc.closest('.js-lc-data__context');
		var action = $context.data('action');
		var method = $context.data('method');
		var req = $context.find('.js-lc-data__lc, .js-lc-data__number').serialize();
		var ajaxFormInst;
		var callbacks = {
			beforeSend: beforeSend,
			success: success,
			complete: complete,
			error: error
		};

		if( $lc.valid() ) {
			if( $lc.val().length === 9 ) {
				ajaxFormInst = new ajaxFormLc({context: $context, callbacks:callbacks, req: req, action: action, method: method});
				ajaxFormInst.sendAjax();
				$this_form.find('input[type=submit], button[type=submit]').prop('disabled', true);
			} else {
				emptyContext($context);
			}
		} else {
			emptyContext($context);
		}
	});

	$lcHolder.on('input', '.js-lc-data__lc', function(evt){
		var $this_lc = $(this);

		if($this_lc.valid()){
			var $formRow = $this_lc.closest('.form__row');
		}
	});

	function beforeSend(jqXHR, settings) {
		$html.addClass('is-en-submitted');
	}

	function success(data, textStatus, jqXHR) {
		var responseFromServer = ajaxResponseParse(data);
		var $context = this;
		var $this_lc = $context.find('.js-lc-data__lc');
		var $formRow = $this_lc.closest('.form__row');
		var joData = responseFromServer.data;
		var number = joData.number;
		var messages = makeMsgFromArray(responseFromServer.messages);
		var $error;

		if(responseFromServer.result) {
			insertData($context, joData);

			$this_lc.removeClass('error--important js-lc-data__lc--not-found');
			$formRow.find('.error--not-found').remove();
		} else {
			$error = $(`<div id="js-lc-data__lc-error" class="error error--not-found" for="js-lc-data__lc">${messages}</div>`);

			emptyContext($context);
			$this_lc.removeClass('valid').addClass('error error--important js-lc-data__lc--not-found');
			$this_lc.attr('aria-invalid', true);
			
			if( !$formRow.find('.error--not-found').length) {
				$formRow.append($error);
			} else {
				$formRow.find('div.error--not-found').text(messages);
			}
        }
	}

	function error(jqXHR, textStatus, errorThrown) {
		var $context = this;
		var $this_lc = $context.find('.js-lc-data__lc');
		var $formRow = $this_lc.closest('.form__row');
		var number = $context.find('.js-lc-data__number').val();
		var messages = "Ошибка сервера. Повторите попытку позднее.";
		var $error = $(`<div id="js-lc-data__lc-error" class="error error--not-found" for="js-lc-data__lc">${messages}</div>`);

		emptyContext($context);
		$this_lc.removeClass('valid').addClass('error error--important js-lc-data__lc--not-found');
		$this_lc.attr('aria-invalid', true);

		if( !$formRow.find('div.error--not-found').length) {
			$formRow.append($error);
		} else {
			$formRow.find('div.error--not-found').text(messages);
		}
	}

	function complete(jqXHR, settings) {
		var $context = this;
		var $form = $context.closest('form');

		$html.removeClass('is-en-submitted');
		$form.find('input[type=submit], button[type=submit]').prop('disabled', false);
	}

	function insertData($context, joData) {
		var number = joData['number'];

		for(var key in joData) {
			if ( key === 'lc') {
				continue;
			}
			$context.find(`#js-lc-data__${key}-${number}`).val(joData[key]);
		}
	}

	function emptyContextFull($context){
		$context.find('.js-lc-data__empty-full').val('');
	}

	function emptyContext($context){
		$context.find('.js-lc-data__empty').val('');
	}

	function emptyElems($elems){
		$elems.val('');
	}

	function markValidForm($form, status) {
		$form.attr('data-valid', status);
	}

	$("#popup-delete-lc__no").on('click', function(){
		var mfpInt = $.magnificPopup.instance;
		mfpInt.st.answer = false;
	});

	$("#popup-delete-lc__yes").on('click', function(){
		var mfpInt = $.magnificPopup.instance;
		mfpInt.st.answer = true;
	});

	$formCabinet.on('submit', function(){
		var $errs = $('.js-lc-data__lc--not-found');
		var errsL = $errs.length;

		if($formCabinet.valid() && !errsL) {
			return true;
		} else {
			$errs.eq(0).trigger('focus');
			return false;
		}

	});

}