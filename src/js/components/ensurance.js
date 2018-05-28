import {ajaxResponseParse} from '../utils/utils-ajax-form';
import {insertResponseToForm} from '../utils/utils-ajax-form';
import {makeMsgFromArray} from '../utils/utils-ajax-form';
import {createMessage} from '../utils/utils-ajax-form';
import {createAlert} from '../utils/utils-ajax-form';
import {ajaxForm} from '../utils/utils-ajax-form';
import {devider} from '../utils/utils-common';

export default function() {

	var $addToEnsurance = $('.js-en');
	var $ensurance = $('[data-block="ensurance"]');
	var $ensuranceList = $ensurance.find('[data-role="list"]');

	var $whats = $addToEnsurance.find('[data-role=what]');
	var $sums = $addToEnsurance.find('[data-role=sum]');
	var $time = $addToEnsurance.find('[data-role=time]');
	var $agreement = $addToEnsurance.find('#UF_AGREEMENT');

	if ( !$ensurance ) {
		return;
	}

	$whats.on('change', whatsChange);
	$sums.on('update', sumsUpdate);
	$agreement.on('change', agreeChange);
	$addToEnsurance.on('change', addToEnChange);
	$addToEnsurance.on('submit', addToEnSubmit);

	function agreeChange(evt) {
		evt.stopPropagation();
	}

	function sumsUpdate() {
		$addToEnsurance.trigger('change');
	}

	function whatsChange() {
		var $what = $(this);
		var value = $what.val();
		var htoddler = document.getElementById(`js-en__toddler-${value}`);
		var htoddlerSlider = document.getElementById(`js-en__toddler-slider-${value}`);
		var htoddlerValue = document.getElementById(`js-en__toddler-value-${value}`);

		if( $what.prop('checked')) {
			htoddlerSlider.removeAttribute('disabled');
			htoddlerValue.removeAttribute('disabled');
		} else {
			htoddlerSlider.setAttribute('disabled', true);
			htoddlerValue.setAttribute('disabled', true);
		}
	}

	function addToEnChange() {
		enAsideFill();
		addToEnAjax();
	}

	function addToEnSubmit() {
		var $this_form = $(this);
		var $html = $('html');
		var formAction = $this_form.data('action');

		if ( !$this_form.valid() ) {
			return false;
		}

		$this_form.attr('action', formAction);
		$html.removeClass('is-en-submitted');	
	}

	function enAsideFill() {
		var html = '';
		var $whatsChecked = $whats.filter(":checked");
		var hSumSelected = $.map($whatsChecked, function(elem, index) { return $sums.filter('#js-en__toddler-value-' + elem.value) || null; });

		$whatsChecked.each(function(index, elem){
			var name = elem.getAttribute('data-name');
			var price = devider(hSumSelected[index][0].value);

			html += `<tr class="aside-en__row">
                    <td class="aside-en__name">${name}</td>
                    <td class="aside-en__price">${price} <i class="aside-en__rub">P</i> 
                    </td>
                </tr>`;
		});

		var $timeSelected = $time.filter(':checked');
		var timeVal = devider($timeSelected.val());

		html += `<tr class="aside-en__row">
                <td class="aside-en__name">Срок действия полиса</td>
                <td class="aside-en__price">${timeVal} мес.
                </td>
        	</tr>`;

		$ensuranceList.html(html);
	}

	function addToEnAjax() {
		var $this_form = $addToEnsurance;
		var $valInst = $this_form.validate();
		var callbacks = {
			beforeSend: beforeSend,
			success: ajaxSuccess,
			complete: ajaxComplete,
			error: null
		};
		var ajaxFormInst = new ajaxForm($this_form, callbacks);

		if ( !$this_form.valid() ) {
			if ( !($valInst.numberOfInvalids() === 1 && !$agreement.valid()) ) {
				return false;
			}
		}

		ajaxFormInst.sendAjax($this_form, callbacks);
		return false;

		function beforeSend (jqXHR, settings) {
			var $html = $('html');
			var $context = this;

			$html.addClass('is-en-submitted');
			$context.find('[type=submit]').prop('disabled', true);
		}

		function ajaxSuccess(data, textStatus, jqXHR) {
			var responseFromServer = ajaxResponseParse(data);
			var messages = makeMsgFromArray(responseFromServer.messages);
			var $mfpContent;
			var $context = this;
			var $submitButton = $context.find('button[type=submit]');
			var $addToEnItogo = $("#js-en__itogo");
			var $asideEnItogo = $("#js-aside-en__itogo");
			var price; 

			if(responseFromServer.result) {
				price = devider(responseFromServer.price.toString());
				$addToEnItogo.text(price);
				$asideEnItogo.text(price);
			} else {
				$mfpContent = createAlert(messages, 'error');
				$.magnificPopup.open({ 
					type: 'inline',
			    	items: {
		            	src: $mfpContent
		            },
		            closeBtnInside: false
				});
			}
		}

		function ajaxComplete(jqXHR, textStatus) {
			var $html = $('html');
			var $context = this;

			$html.removeClass('is-en-submitted');
	    	$context.find('[type=submit]').prop('disabled', false);
		}
	}

}