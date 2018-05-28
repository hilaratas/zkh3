//noinspection JSAnnotator
export default function () {
    
    $('.js-accordion').on('click', '.js-accordion__click', function(){
    	var $this = $(this);

    	$this.closest('.js-accordion__item').toggleClass('active');
    });

    $('.js-accordion1').each(function(index, elem){
        var $accor = $(elem);

        $accor.on('click', '.js-accordion__click1', function(){
            var $this = $(this);

            $this.closest('.js-accordion__item1').toggleClass('active');
        });
    });


    $('.js-accordion2').each(function(index, elem){
        var $accor = $(elem);

        $accor.on('click', '.js-accordion__click2', function(){
            var $this = $(this);

            $this.closest('.js-accordion__item2').toggleClass('active');
        });
    });

    $('.js-accordion3').each(function(index, elem){
        var $accor = $(elem);

        $accor.on('click', '.js-accordion__click3', function(){
            var $this = $(this);

            $this.closest('.js-accordion__item3').toggleClass('active');
        });
    });

}