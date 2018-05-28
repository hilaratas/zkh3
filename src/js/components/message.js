export default function() {
	$(document).on('click', '.message__close', function(evt){
		var $closeEl = $(evt.currentTarget);
		var $message = $closeEl.parent();

		$message.addClass('message--closing');
		setTimeout(
			function(){
				$message.remove();
			}
			,400);
	});
}