export default function() {

	var $uScroll = $("#js-uslugi-scroll");
	var $uScItems = $uScroll.find('.js-uslugi-item');
	var $largeTo = $("#js-scroll--dev-large");
	var $smallTo = $('#js-scroll--dev-small');
	var offsetTop = 20;

	if( !$uScroll.length) {
		return;
	}

	$uScItems.on('click', scroll);

	function scroll(evt) {
		var ww = window.innerWidth;
		var breaks = window.breaks;
		var $this = $(this);
		var $scrollTo = (ww <= breaks.xsMin ? $smallTo : $largeTo);
		var posToScroll;

		posToScroll = getPosTop($scrollTo);
		posToScroll = posToScroll - offsetTop;
		$('html, body').animate({'scrollTop': posToScroll}, 300);
	}

	function getPosTop($elem) {
		return $elem.offset().top;
	}
}