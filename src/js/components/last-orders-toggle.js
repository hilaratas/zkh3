export default function() {
	$('.js-last-orders__table').each(function (index, elem) {
		var $table = $(elem);
		toogleElemsHandler($table);
	});

	$('#js-results-block').on('update', function(){
		var $table = $(this).find('.js-last-orders__table');
		toogleElemsHandler($table);
	});

	function toogleElemsHandler($table) {
		$table.on('click', '.js-last-orders__toggle-all', function(){
			var $toggleAll = $(this);
			var $toggleLine = $table.find('.js-last-orders__toggle');

			if ($table.hasClass('is-active')) {
				$table.removeClass('is-active');
				$table.children().find('tr').removeClass('is-active');
				$toggleAll.removeClass('is-active');
				$toggleLine.removeClass('is-active');
			} else {
				$table.addClass('is-active');
				$table.find('tr').addClass('is-active');
				$toggleAll.addClass('is-active');
				$toggleLine.addClass('is-active');
			}
		});

		$table.on('click', '.js-order-block', function(){
			var $elem = $(this);
			var $arrowElem = $(this).find('.js-last-orders__toggle');

			$arrowElem.toggleClass('is-active');
			$arrowElem.closest('tr').next().toggleClass('is-active');
		});
	}
}