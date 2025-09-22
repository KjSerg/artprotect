import 'slick-carousel';

export default class Slick {
    constructor() {
        this.init();
    }

    handleBrandSlider() {
        $('.brands-list').each(function () {
            const $slider = $(this);
            if ($(window).width() <= 768) {
                if (!$slider.hasClass('slick-initialized')) {
                    $slider.slick({
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        arrows: false,
                        dots: true,
                        responsive: [
                            {
                                breakpoint: 450,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            },
                        ]
                    });
                }
            } else {
                setTimeout(function () {
                    if ($slider.hasClass('slick-initialized')) {
                        $slider.slick('unslick');
                    }
                }, 100);

            }
        });
    }
    handleExpertsSlider() {
        $('.experts-list').each(function () {
            const $slider = $(this);
            if ($(window).width() <= 600) {
                if (!$slider.hasClass('slick-initialized')) {
                    $slider.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true,
                        responsive: [

                        ]
                    });
                }
            } else {
                setTimeout(function () {
                    if ($slider.hasClass('slick-initialized')) {
                        $slider.slick('unslick');
                    }
                }, 100);

            }
        });
    }

    teamSliderInit() {
        $(document).find('.team-slider').each(function () {
            const $slider = $(this);
            const $section = $slider.closest('section');
            const $preview = $section.find('.team-slider-preview');
            const slickArgs = {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                responsive: [
                    {
                        breakpoint: 1201,
                        settings: {
                            dots: true,
                        }
                    },
                ]
            };
            if($preview.length > 0){
                slickArgs['asNavFor'] = $preview;
                const slickPrevArgs = {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: false,
                    asNavFor: $slider,
                    focusOnSelect: true
                };
                $preview.slick(slickPrevArgs);
            }
            $slider.slick(slickArgs);
        });
    }
    quotesSliderInit() {
        $(document).find('.quotes-list').each(function () {
            const $slider = $(this);
            const $section = $slider.closest('section');
            const $prev = $section.find('.slick__prev');
            const $next = $section.find('.slick__next');
            const slickArgs = {
                slidesToShow: 1,
                slidesToScroll: 1,

                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: false,
                responsive: [
                    {
                        breakpoint: 451,
                        settings: {
                            dots: true,
                        }
                    },
                ]
            };
            $slider.slick(slickArgs);
        });
    }

    init() {
        const _this = this;
        _this.teamSliderInit();
        _this.handleBrandSlider();
        _this.handleExpertsSlider();
        _this.quotesSliderInit();
        $(window).on('resize', function (){
            _this.handleBrandSlider()
            _this.handleExpertsSlider()
        });
        const custom = new CustomSlider();
    }
}


class CustomSlider {
    constructor() {
        this.init()
    }

    getCurrentIndex($slider) {
        return $slider.find('.custom-slider__item.current').index();
    }

    setCurrentElemByIndex($slider, index = 0) {
        const $dots = $slider.closest('.custom-slider-wrapper').find('.custom-slider__dots');
        $slider.find('.custom-slider__item').removeClass('current');
        $slider.find('.custom-slider__item').eq(index).addClass('current');
        if ($dots.length > 0) {
            $dots.find('.custom-slider__dot').removeClass('active');
            $dots.find('.custom-slider__dot').eq(index).addClass('active');
        }
        return $slider.find('.custom-slider__item').eq(index);
    }

    elementDisplacement($slider, offset) {
        $slider.find('.custom-slider__item').css('transform', `matrix(1, 0, 0, 1, -${offset}, 0)`);
    }

    movement($slider, index = 0, gap = 0) {
        const w = $slider.find('.custom-slider__item').eq(index).outerWidth() + gap;
        const offset = w * index;
        this.elementDisplacement($slider, offset);
        this.setCurrentElemByIndex($slider, index);

    }

    getTransformX($el) {
        const element = $el[0];
        const style = window.getComputedStyle(element);
        const transformValue = style.transform;
        const matrix = transformValue.match(/matrix\(([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^)]+)\)/);
        if (matrix) {
            return parseFloat(matrix[5]);
        }
        return 0;
    }

    cloneElements($slider) {
        let cloneCount = $slider.attr('data-clone') || 0;
        cloneCount = parseInt(cloneCount);
        if (isNaN(cloneCount)) return;
        if (cloneCount <= 0) return;
        let html = $slider.html();
        let newHTML = '';
        for (let a = 1; a <= cloneCount; a++) {
            newHTML += html;
        }
        $slider.html(newHTML);
    }

    addDots($slider) {
        const length = $slider.find('.custom-slider__item').length;
        if (length === 0) return;
        let html = '';
        for (let a = 0; a < length; a++) {
            let cls = a === 0 ? 'active' : '';
            html += '<span class="custom-slider__dot ' + cls + '"></span>';
        }
        html = '<span class="custom-slider__dots">' + html + '</span>';
        let $wrapper = $slider.closest('section').find('.custom-slider-wrapper');
        if ($wrapper.length === 0) {
            $slider.wrap("<div class='custom-slider-wrapper'></div>");
            $wrapper = $slider.closest('section').find('.custom-slider-wrapper');
        }
        $wrapper.append(html);
    }

    init() {
        const _this = this;
        $(document).find('.custom-slider').each(function () {
            const $slider = $(this);
            _this.cloneElements($slider);
            _this.addDots($slider);
            let currentIndex = 0;
            let gap = $slider.css('gap');
            gap = parseInt(gap);
            gap = isNaN(gap) ? 0 : gap;
            const $prev = $slider.closest('section').find('.slick__prev');
            const $next = $slider.closest('section').find('.slick__next');
            _this.setCurrentElemByIndex($slider, 0);
            $prev.on('click', function (e) {
                e.preventDefault();
                currentIndex = _this.getCurrentIndex($slider);
                let index = currentIndex - 1;
                if (currentIndex === 0) {
                    index = $slider.find('.custom-slider__item').length - 1;
                }
                _this.movement($slider, index, gap);
            });
            $next.on('click', function (e) {
                e.preventDefault();
                currentIndex = _this.getCurrentIndex($slider);
                let index = currentIndex + 1;
                if (currentIndex === ($slider.find('.custom-slider__item').length - 1)) {
                    index = 0;
                }

                console.log(currentIndex)
                console.log(index)
                _this.movement($slider, index, gap);
            });
        });
        $(document).on('click', '.custom-slider__dot', function (e) {
            e.preventDefault();
            const $t = $(this);
            const $slider = $t.closest('.section').find('.custom-slider');
            let gap = $slider.css('gap');
            gap = parseInt(gap);
            gap = isNaN(gap) ? 0 : gap;
            let currentIndex = _this.getCurrentIndex($slider);
            let index = $t.index();
            _this.movement($slider, index, gap);
        });
    }
}