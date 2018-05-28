export default function () {

	$('[data-mask-tel]').addClass('js-mask-tel');
	$('[data-mask-lk]').addClass('js-mask-lk');
	$('[data-date]').addClass('js-date');
	$('[data-mask-date]').addClass('js-mask-date');
	$('[data-mask-passport]').addClass('js-mask-passport');

    $(".js-mask-tel").mask("?+7 (999) 999-99-99", {placeholder: "+7 (___) ___-__-__" });
	$('.js-mask-lk').mask("?999999999", {placeholder: "_________" });
	$('.js-date').mask("99-99-9999");
	$('.js-mask-date').mask("?99.99.9999", {placeholder: "дд.мм.гггг" });
	$('.js-mask-passport').mask("?99 99 999999", {placeholder: "__ __ ______" });
	$('.js-mask-digits').mask("?99999999999999999999", {placeholder: ""});
	//$('.js-mask-okved').mask("99?.99.99", {placeholder: ""});
}