export default function () {
    
    $('.js-footer-slider').owlCarousel({
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            1025:{
                items:3
            }
        },
        nav: true,
        navText:  ['<svg class="icon footer-slider__icon" width="13" height="13"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + basePathToSvgSprite + '/svg-store.svg#icon-arrow-back"></use></svg>',
            '<svg class="icon footer-slider__icon" width="13" height="13"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + basePathToSvgSprite + '/svg-store.svg#icon-arrow-next"></use></svg>']
    });

    $('.js-slider').owlCarousel({ 
        nav: true,
        items : 1,
        navText:  [
            '<svg class="icon" width="13" height="13"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + basePathToSvgSprite + '/svg-store.svg#icon-arrow-back"></use></svg>',
            '<svg class="icon" width="13" height="13"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + basePathToSvgSprite + '/svg-store.svg#icon-arrow-next"></use></svg>'
        ]
    });

    $('.js-slider-auto-height').owlCarousel({ 
        nav: true,
        items : 1,
        autoHeight:true,
        navText:  [
            '<svg class="icon" width="13" height="13"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + basePathToSvgSprite + '/svg-store.svg#icon-arrow-back"></use></svg>',
            '<svg class="icon" width="13" height="13"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + basePathToSvgSprite + '/svg-store.svg#icon-arrow-next"></use></svg>'
        ]
    });

    $('.js-slider-auto-width').owlCarousel({ 
        nav: true,
        items : 1,
        autoWidth:true,
        navText:  [
            '<svg class="icon" width="13" height="13"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + basePathToSvgSprite + '/svg-store.svg#icon-arrow-back"></use></svg>',
            '<svg class="icon" width="13" height="13"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + basePathToSvgSprite + '/svg-store.svg#icon-arrow-next"></use></svg>'
        ]
    });

    $('.js-slider__services').owlCarousel({
        loop: true,
        nav: true,
        responsive: {
            0: {
              items: 1,
            },
            768: {
                items: 2,
            },
            1000: {
                items: 3,
            },
            1200: {
                items: 4
            }
        },
      margin: 30,
        navText: [
            '<div class="popular-services__arrow popular-services__arrow--left"><svg class="icon popular-services__icon-left" width="20" height="25"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="sprites/svg-store.svg#icon-arrow-back"></use></svg></div>',
            '<div class="popular-services__arrow popular-services__arrow--right"><svg class="icon popular-services__icon-right" width="20" height="25"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="sprites/svg-store.svg#icon-arrow-next"></use></svg></div>'
        ]
    });

    $('.js-slider__services2').slick({
        infinite: true,
        arrows: true,
        dots: false,
        mobileFirst: false,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.js-slider__services3').slick({
        infinite: true,
        arrows: true,
        dots: false,
        mobileFirst: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev-partners">Предыдущий</button>',
        nextArrow: '<button type="button" class="slick-next-partners">Следующий</button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    $('.js-slider__banner').owlCarousel({
        navigation: true,
        nav:false,
        items : 1,
        loop: true,
        autoplay: true,
        autoplaySpeed: 1000,
        navSpeed: 1000,
        dotsSpeed: 1000,
        smartSpeed: 1000,
        autoplayTimeout: 10000
    })
}