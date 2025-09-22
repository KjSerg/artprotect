export const tabs = () => {
    $(document).on('click', '.tabs-head__item', function (e) {
        e.preventDefault();
        const $t = $(this);
        const href = $t.attr('href');
        if ($t.hasClass('active')) return;
        if (href === '#') return;
        if (href === undefined) return;
        const $el = $(document).find(href);
        if ($el.length === 0) return;
        $t.closest('section').find('.tabs-head__item').removeClass('active');
        $t.closest('section').find('.tabs-content').slideUp();
        $el.slideDown();
        $t.addClass('active');
    });
}