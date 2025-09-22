(function ($) {
    $.fn.toSVG = function (options) {
        let params = $.extend({
            svgClass: "replaced-svg",
            onComplete: function () {
            },
        }, options);
        this.each(function () {
            let $img = jQuery(this);
            let imgID = $img.attr('id');
            let imgClass = $img.attr('class');
            let imgURL = $img.attr('src');
            if (!(/\.(svg)$/i.test(imgURL))) {
                console.warn("image src='" + imgURL + "' is not a SVG, item remained tag <img/> ");
                return;
            }
            $.get(imgURL, function (data) {
                let $svg = jQuery(data).find('svg');
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' ' + params.svgClass);
                }
                $svg = $svg.removeAttr('xmlns:a');
                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }
                $img.replaceWith($svg);
                typeof params.onComplete == "function" ? params.onComplete.call(this, $svg) : '';
            })
        });
    }
})(jQuery);