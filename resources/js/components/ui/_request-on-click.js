import responseHandler from "../utils/_responser";

export function sendRequestClickListener() {
    $(document).on('click', '.send-request-on-click', function (e) {
        e.preventDefault();
        const $t = $(this);
        const action = $t.attr('data-action');
        const type = $t.attr('data-method') || "GET";
        if (action === undefined) return;
        const url = $t.attr('href') === '#' ? adminAjax : $t.attr('href');
        $t.addClass('not-active');
        $('body').addClass('loading');
        let data = getData($t);
        const args = {type, url, data};
        $.ajax(args).done((response) => {
            responseHandler(response, $t);
        });
    });
}

function getData($element) {
    const dataAttr = $element.data();
    let data = {};
    Object.keys(dataAttr).forEach(key => {
        data[key] = $element.attr('data-' + key);
    });
    return data;
}
