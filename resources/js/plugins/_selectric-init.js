import 'selectric';

export const selectrickInit = () => {
    const $select = $(document).find('.select').not('.selectric-init');
    $select.selectric().on('change', function () {
        const $s = $(this);
        const val = $s.val();
        if (val === '') {
            $s.closest('.selectric-select').removeClass('selectric-selected');
        }else {
            $s.closest('.selectric-select').addClass('selectric-selected');
            $s.closest('.form-label').removeClass('error');
        }
    });
    $select.addClass('selectric-init');
}