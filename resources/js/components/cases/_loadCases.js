import {openFancyModal, showMsg} from "../../plugins/_fancybox-init";
import responseHandler from "../utils/_responser";
import {hidePreloader, isJsonString, showPreloader} from "../utils/_helpers";

const casesDetails = {};

export function readURLSearchParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('open_modal')) {
        const postSlug = urlParams.get('open_modal');
        openModalAndLoadContentByPostSlug(postSlug);
    }
}

export function casesLinkListener() {
    $(document).on('click', '.load-case-data', function (e) {
        e.preventDefault();
        const $t = $(this);
        const url = $t.attr('href');
        if (url === undefined || url === '#') return;
        const type = $t.attr('data-method') || "GET";
        let html = casesDetails[url];
        if (html === undefined) {
            const args = {type, url};
            showPreloader();
            $.ajax(args).done((html) => {
                casesDetails[url] = html;
                innerHTMLadShowModal(html);
                hidePreloader();
            });
        } else {
            innerHTMLadShowModal(html);
        }
    });
}

function openModalAndLoadContentByPostSlug(postSlug) {
    const args = {
        type: 'POST',
        url: AJAX.ajax_url,
        data: {
            action: 'load_single_post_content',
            post_slug: postSlug,
            nonce: AJAX.nonce
        }
    };
    showPreloader();
    $.ajax(args).done((response) => {
        const isJson = isJsonString(response);
        if (isJson) {
            const data = JSON.parse(response);
            const html = data.html;
            const url = data.url;
            casesDetails[url] = html;
            innerHTMLadShowModal(html);
        } else {
            showMsg(response);
        }
        hidePreloader();
    });
}

function innerHTMLadShowModal(html) {
    const $modal = getModal();
    $modal.html(html);
    openFancyModal($modal);
}

function getModal() {
    let $modal = $(document).find('#case-details');
    if ($modal.length === 0) {
        $(document).find('.modals').append('<div class="case-details" id="case-details"></div>');
        $modal = $(document).find('#case-details');
    }
    return $modal;
}