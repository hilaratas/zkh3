export default function() {
	$('.js-select-open-new-tab').on('change', function(evt){
		var newWin = window.open(this.value, '_blank');
		if(newWin !== null) {
			newWin.focus();
		}
        $('.js-select-open-new-tab option:first').prop('selected', true);
	})
}