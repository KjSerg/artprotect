export const burger = () => {
    const $doc = $(document);
    $doc.on('click', '.close-menu', function (e) {
        e.preventDefault();
        const $t = $(this);
        const $menu = $doc.find('.header-container-mobile');
        $menu.removeClass('active');
    });
    $doc.on('click', '.burger', function (e) {
        e.preventDefault();
        const $t = $(this);
        const $menu = $doc.find('.header-container-mobile');
        $menu.addClass('active');
    })
}