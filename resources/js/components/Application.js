import {copyToClipboard, detectBrowser, hidePreloader, isJsonString, isMobile, showPreloader} from "./utils/_helpers";
import {burger} from "./ui/_burger";
import {accordion} from "./ui/_accardion";
import {initTelMask, numberInput} from "./forms/_number-input";
import {showPassword} from "./forms/_show-password";
import {fancyboxInit, showMsg, showNotices} from "../plugins/_fancybox-init";
import {selectrickInit} from "../plugins/_selectric-init";
import {tabs} from "./ui/_tabs";
import {sendRequestClickListener} from "./ui/_request-on-click";
import FormHandler from "./forms/FormHandler";
import '../plugins/SVGLoader';
import AOS from "aos";


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
            this.showLoaderOnClick();
            this.linkListener();
            const formHandler = new FormHandler('.form-js');
            $('img.svg').toSVG({
                svgClass: "svg-loaded"
            });
            AOS.init({
                once: true
            });
        });
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