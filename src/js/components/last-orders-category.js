export default function() {
	let $catSel = $('#js-category-filter');
	let $subCatSels = $('.js-subcategory-filter');

	$catSel.on('change', function(){
		let subId = $catSel.find('option:selected').data('subcat-id');
		let $subCatSel = $(`#js-subcategory-filter__${subId}`);

		$subCatSels.removeClass('is-active').prop('disabled', true);
		$subCatSel.addClass('is-active').prop('disabled', false);
	});
}