export default function () {
	$('table:not(".no-rotate")').table({copy: 'text', pseudoWrapClass: 'hidden-md hidden-lg'});

	$('table.no-rotate').not('.no-scroll').each(function(index, elem){
		var $table = $(elem);

		$table.wrap('<div class="table-responsive-wrap"><div class="table-responsive"></div></div>');
	});
}