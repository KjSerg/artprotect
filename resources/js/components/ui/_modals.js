export const openModal = ($el) => {
    $el.addClass('active');
    setTimeout(function () {
        $('body').addClass('open-custom-modal');
    }, 100);
    let $closeButton = $el.find('.close-custom-modal');
    if ($closeButton.length > 0) return;
    let id = $el.attr('id');
    $el.append('<a href="#' + id + '" class="modal__close close-custom-modal">&#x2716;</a>');
}
export const closeModal = ($el = false) => {
    if (!$el) $('.modals .modal').removeClass('active');
    if ($el.length === 0) $('.modals .modal').removeClass('active');
    if ($el) $el.removeClass('active');
    if ($(document).find('.modals .modal.active').length > 0) return;
    $('body').removeClass('open-custom-modal');
}

export function initEventsListener() {
    $(document).on('click', '.open-custom-window', function (e) {
        e.preventDefault();
        const $t = $(this);
        const href = $t.attr('href') || '#';
        if (href === '#') return;
        const $el = $(document).find(href);
        if ($el.length === 0) return;
        openModal($el);
    });
    $(document).on('click', '.close-custom-modal', function (e) {
        e.preventDefault();
        const $t = $(this);
        const href = $t.attr('href') || '#';
        let $el = $(document).find(href);
        if ($el.length === 0) $el = false;
        closeModal($el);
    });
    $(document).on('click', '.open-custom-modal .modals', function (e) {
        if (!e.target.classList.contains('modals')) return;
        e.preventDefault();
        closeModal();
    });
}

