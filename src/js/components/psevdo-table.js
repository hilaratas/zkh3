import {isTouch} from '../utils/utils-common';

export default function() {
	var $names = $('.psevdo-table__td--name');

	if (!$names.length) {
		return;
	}

	if (isTouch()) {
		$names.on('click', '.psevdo-table__title', toggleTipClickTouch);
		$names.on('click', '.psevdo-tip__close', toggleTipClose);
	} else {
		$names.on('mouseenter', '.psevdo-table__title', toggleTipMouse);
		$names.on('click', '.psevdo-table__title', toggleTipClickNoTouch);	
		$names.on('click', '.psevdo-tip__close', toggleTipClose);
		$names.on('click', '.psevdo-table__title, .psevdo-table__tip', stopPropogation);
		$('.button-add').on('click', stopPropogation);
	}

	function toggleTipMouse(evt){
		var $this = $(this);
		var $parent = $this.parent();
		var $tip = $parent.find('.psevdo-table__tip');
		var breaks = window.breaks;
		var ww = window.innerWidth;

		evt.stopPropagation();

		if (ww >= breaks.mdMin) {
			$names.filter('.is-tip-active').removeClass('is-tip-active')
				.find('.psevdo-table__tip').removeClass('is-active');
			$parent.addClass('is-tip-active');
			$tip.addClass('is-active');
			documentHandle();
		}
	}

	function toggleTipClickNoTouch(evt){
		var $this = $(this);
		var $parent = $this.parent();
		var $tip = $parent.find('.psevdo-table__tip');
		var breaks = window.breaks;
		var ww = window.innerWidth;

		evt.stopPropagation();

		if (ww <= breaks.smMax) {
			$parent.toggleClass('is-tip-active');
		}

		// $names.filter('.is-tip-active').removeClass('is-tip-active');
		// $parent.addClass('is-tip-active');
		// documentHandle();
	}

	function toggleTipClickTouch(evt){
		var $this = $(this);
		var $parent = $this.parent();
		var $tip = $parent.find('.psevdo-table__tip');
		var breaks = window.breaks;
		var ww = window.innerWidth;

		evt.stopPropagation();

		$parent.toggleClass('is-tip-active');
	}

	$(document).on('tipOff', function(){
		$(document).off('click.tips');
		delete document.tip;
	});

	function toggleTipClose(){
		var $this = $(this);
		var $parent = $this.closest('.psevdo-table__td--name');
		$parent.removeClass('is-tip-active');
	}

	function documentHandle(){
		if ( document.tip === undefined ) {;
			document.tip = true;
			$(document).on('click.tips', function(){
				var $document = $(this);

				$names.filter('.is-tip-active').removeClass('is-tip-active')
					.find('.psevdo-table__tip').removeClass('is-active');
				$document.trigger('tipOff');
			});
		}
	}

	function stopPropogation(evt) {
		evt.stopPropagation();
	}
}