import 'slick-carousel';

export default class Slick {
    constructor() {
        this.init();
    }

    staffSliderInit() {
        $(document).find('.staff-slider').each(function () {
            const $slider = $(this);
            const $section = $slider.closest('section');
            const $prev = $section.find('.slick__prev');
            const $next = $section.find('.slick__next');
            const $dots = $section.find('.slider-dots');
            const slickArgs = {
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: true,
                appendDots: $dots,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 450,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                ]
            };
            $slider.slick(slickArgs);
        });
    }

    init() {
        const _this = this;
        _this.staffSliderInit();
    }
}
