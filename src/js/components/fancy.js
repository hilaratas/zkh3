export default function () {

	$.extend($.fancybox.defaults.btnTpl, {
		close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">&times;</button>',
		smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}">&times;</button>',
	});

	$('.js-fancybox-close').on('click', function(e){
		e.preventDefault();
		$.fancybox.close();
	});
}