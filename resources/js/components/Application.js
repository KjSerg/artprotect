import {copyToClipboard, detectBrowser, hidePreloader, isJsonString, isMobile, showPreloader} from "./utils/_helpers";
import {burger} from "./ui/_burger";
import {accordion} from "./ui/_accardion";
import {initTelMask, numberInput} from "./forms/_number-input";
import {showPassword} from "./forms/_show-password";
import {fancyboxInit, showMsg, showNotices} from "../plugins/_fancybox-init";
import {selectrickInit} from "../plugins/_selectric-init";
import Slick from "../plugins/Slick";
import {tabs} from "./ui/_tabs";
import {sendRequestClickListener} from "./ui/_request-on-click";
import {initEventsListener} from "./ui/_modals";
import FormHandler from "./forms/FormHandler";
import {videoPlayer} from "./ui/_videoPlayer";
import '../plugins/SVGLoader';


export default class Application {
    constructor() {
        this.$doc = $(document);
        this.$body = $("body");
        this.parser = new DOMParser();
        this.init();
    }

    init() {
        this.initBrowserAttributes();
        this.initComponents();
    }

    showLoaderOnClick() {
        this.$doc.on('click', 'a.show-load, .header a, .footer a', function (e) {
            let test = $(this).attr('href').includes('#') || $(this).attr('href').includes('tel') || $(this).attr('href').includes('mailto');
            if (!test) showPreloader();
        });
    }

    initBrowserAttributes() {
        const browserName = detectBrowser();
        this.$body.attr("data-browser", browserName).addClass(browserName);

        if (isMobile) {
            this.$body.attr("data-mobile", "mobile");
        }
    }

    initComponents() {
        this.$doc.ready(() => {
            burger();
            accordion();
            numberInput();
            showPassword();
            selectrickInit();
            fancyboxInit();
            initEventsListener();
            videoPlayer();
            this.showLoaderOnClick();
            this.deliverablesInit();
            this.linkListener();
            const slider = new Slick();
            const formHandler = new FormHandler('.form-js');
            $('img.svg').toSVG({
                svgClass: "svg-loaded"
            });
        });
    }

    deliverablesInit(){
        const t = this;
        const $doc = this.$doc;
        $doc.on('click', '.deliverables-menu__item', function (e) {
            e.preventDefault();
            const $t = $(this);
            const isActive = $t.hasClass('active');
            const href = $t.attr('href');
            if (href === undefined) return;
            const $elem = $doc.find(href);
            if ($elem.length === 0) return;
            if (isActive) {
                return;
            }
            const $container = $t.closest('.deliverables-container');
            const $arrow = $container.find('.deliverables-menu__icon');
            $container.find('.deliverables-menu__item').removeClass('active');
            $container.find('.deliverables-content__item').slideUp();
            $t.addClass('active');
            $elem.slideDown();
            if ($arrow.length === 0) return;
            let $containerTopPosition = $container.offset().top;
            let $linkTopPosition = $t.offset().top;
            let $linkH = $t.outerHeight();
            let pos = $linkTopPosition - $containerTopPosition;
            pos = pos + 16;
            let rem = parseInt($doc.find('html').css('font-size'));
            if (isNaN(rem)) {
                $arrow.css('top', pos + 'px');
            } else {
                pos = pos / rem;
                $arrow.css('top', pos + 'rem');
            }

        });


        function myResizeFunction() {
            if($(window).width() <= 1023){
                return;
            }
            $doc.find('.deliverables-container').each(function () {
                const $container = $(this);
                const $t = $container.find('.deliverables-menu__item.active');
                const $arrow = $container.find('.deliverables-menu__icon');
                if ($arrow.length === 0) return;
                let $containerTopPosition = $container.offset().top;
                let $linkTopPosition = $t.offset().top;
                let $linkH = $t.outerHeight();
                let pos = $linkTopPosition - $containerTopPosition;
                pos = pos + 12;
                let rem = parseInt($doc.find('html').css('font-size'));
                if (isNaN(rem)) {
                    $arrow.css('top', pos + 'px');
                } else {
                    pos = pos / rem;
                    $arrow.css('top', pos + 'rem');
                }
            });
        }

        const debouncedResizeHandler = debounce(myResizeFunction, 200);
        window.addEventListener('resize', debouncedResizeHandler);

        function debounce(func, delay) {
            let timeoutId;
            return function(...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                }, delay);
            };
        }
    }

    linkListener() {
        const t = this;
        const $doc = this.$doc;
        sendRequestClickListener();
        tabs();
        $doc.on('click', '[data-link]', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('data-link');
            if (href === '#') return;
            const hashValue = href.split('#')[1];
            if (hashValue !== undefined) {
                const $el = t.$doc.find('#' + hashValue);
                if ($el.length > 0) {
                    $('html, body').animate({
                        scrollTop: $el.offset().top
                    });
                    return;
                }
            }
            window.location.href = href;
        });
        $doc.on('click', '.applications-head__item', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if ($(window).width() <= 450) {
                if ($t.hasClass('active')) {
                    $t.closest('.applications-head').find('.applications-head__item').slideDown();
                    return;
                }
            }
            if (href === '#') return;
            window.location.href = href;
        });
        $doc.on('click', '.copy-link-js', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (href === '#') return;
            copyToClipboard(href);
            showMsg(copiedString);
        });
        $doc.on('click', '.pagination-js a', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (href === undefined || href === '') return;
            $t.addClass('not-active');
            showPreloader();
            $.ajax({
                type: 'GET',
                url: href,

            }).done(function (r) {
                hidePreloader();
                $t.removeClass('not-active');
                if (!r) return;
                const parser = new DOMParser();
                const $r = $(parser.parseFromString(r, "text/html"));
                const $pagination = $r.find('.pagination-js');
                const $catalog = $r.find('.container-js');
                $(document).find('.pagination-js').html($pagination.html());
                $(document).find('.container-js').append($catalog.html());
            });
        });
        $doc.on('click', '.header-container-mobile .menu-item-has-children', function (e) {
            e.preventDefault();
            const $t = $(this);
            const $wrapper = $t;
            let $container = $('.header-container-mobile .sub-container');
            if ($container.length === 0) {
                $('.header-container-mobile').append('<div class="sub-container"></div>');
                $container = $(document).find('.header-container-mobile .sub-container');
            }
            $container.html($wrapper.html());
            $container.closest('.sub-container-wrapper').addClass('active');
            $('body').addClass('open-sub-container-wrapper');
        });
        $doc.on('click', '.close-sub-container', function (e) {
            e.preventDefault();
            $(document).find('.sub-container-wrapper').removeClass('active');
            $('body').removeClass('open-sub-container-wrapper');
        });
        $doc.on('click', 'a[href*="#"]:not(.fancybox, .tabs-head__item, .deliverables-menu__item, .not-custom-listener-js)', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (href === '#') return;
            const hashValue = href.split('#')[1];
            if (hashValue !== undefined) {
                const $el = t.$doc.find('#' + hashValue);
                if ($el.length > 0) {
                    $('html, body').animate({
                        scrollTop: $el.offset().top
                    });
                    return;
                }
            }
            window.location.href = href;
        });

    }
}