import {isJsonString, showPreloader} from "./_helpers";
import {showMsg} from "../../plugins/_fancybox-init";

export default function responseHandler(response, $t = false) {
    if ($t) $t.removeClass('not-active');
    $('body').removeClass('loading');
    if (response) {
        const isJson = isJsonString(response);
        if (isJson) {
            const data = JSON.parse(response);
            const message = data.msg || '';
            const url = data.url || '';
            const reload = data.reload || '';
            if (message) {
                showMsg(message, url);
            } else {
                if (url) {
                    showPreloader();
                    window.location.href = url;
                    return;
                }
            }
            if (reload === 'true') {
                if (message) {
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                    return;
                }
                window.location.reload();
            }
        } else {
            showMsg(response);
        }

    }
}