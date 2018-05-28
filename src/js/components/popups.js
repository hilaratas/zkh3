export default function () {

	$.extend(true, $.magnificPopup.defaults, {
		removalDelay: 300,
		mainClass: 'mfp-fade-in'
	});
    
    $('.js-popup-inline').magnificPopup({
    	type:'inline',
    	closeOnBgClick: false
    });

	$('.js-popup-image').magnificPopup({
		type: 'image',
    	image: {
			verticalFit: false
		}
	});

	$('.js-popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
    	image: {
			verticalFit: false
		}
	});

    $('.js-popup-close').on('click', function(evt){
        evt.preventDefault();
        $.magnificPopup.close();
    });

    $('.js-popup-form-ajax').each(function(index, elem){
        var $elem = $(elem);

        formAjaxMfpHandler($elem);  
    });

    $('#js-results-block').on('update', function(){
        var $btn = $(this).find('.js-popup-form-ajax');
        formAjaxMfpHandler($btn);
    });

    function  formAjaxMfpHandler($elem) {
        $elem.magnificPopup({
            callbacks: {
                open: function () {
                    var mfpInt = $.magnificPopup.instance;
                    var $form = mfpInt.content.find('form');
                    var $message = mfpInt.content.find('.message');
                    var $openedElem = mfpInt.st.el;
                    var $lineForUpdate = $openedElem.parent().parent().parent();
                    var agentId = $openedElem.data('agent-id'); 

                    if (agentId) {
                        $form.find('[type="radio"]').each(function() {
                            if ($(this).val() != agentId) {
                                $(this).closest('.form__row2').remove();
                            }
                        });
                    }

                    $lineForUpdate.addClass('is-highlighted');
                    mfpInt.st.$lineForUpdate = $lineForUpdate;
                    removeMessage($message);
                    clearValidate($form);
                    $form.trigger('open.form');

                    if ( $openedElem.hasClass('is-sticky-buttons') ) {
                        var cC = mfpInt.contentContainer;
                        var $styckyBl = cC.find(".is-may-be-sticked");

                        if ( $styckyBl.length ) {
                            stickyButtons($styckyBl, mfpInt);
                        }
                    }
                },
                close: function () {
                    var mfpInt = $.magnificPopup.instance;
                    var $form = mfpInt.content.find('form');
                    var $message = mfpInt.content.find('.message');
                    var $openedElem = mfpInt.st.el;
                    var $lineForUpdate = mfpInt.st.$lineForUpdate;

                    $lineForUpdate.removeClass('is-highlighted');
                    removeMessage($message);

                    if ($form.length) {
                        clearValidate($form);
                        $form.trigger('close.form');
                    }
                },
                resize: function() {
                    var mfpInt = $.magnificPopup.instance;
                    var $openedElem = mfpInt.st.el;

                    if ( $openedElem.hasClass('is-sticky-buttons') ) {
                        var cC = mfpInt.contentContainer;
                        var $styckyBl = cC.find(".is-may-be-sticked");

                        if ( $styckyBl.length ) {
                            stickyButtons($styckyBl, mfpInt);
                        }
                    }
                }
            }
        });
    }

    function removeMessage($message) {
        $message.remove();
    }

    function clearValidate($form) {
        $form.get(0).reset();
        $form.find('input, select').removeClass('valid error');
        $form.find('[type=submit]').prop('disabled', false);
        $form.find('label.error').remove();
    }

    function stickyButtons($styckyBl, mfpInt) {
        var cC = mfpInt.contentContainer;
        var cCH = cC.height();
        var cCW = cC.width();
        var wH = $(window).height();

        if ( cCH > wH) {
            $styckyBl.addClass('is-bottom-sticked').width(cCW);
        } else {
            $styckyBl.removeClass('is-bottom-sticked');
        }
    }
}