export function videoPlayer() {
    $(document).on('dblclick', 'video', toggleFullScreen);
    $(document).on('click', 'video', function (e) {
        const $t = $(this);
        $t.closest('.video-section').removeClass('video-section-play');
        $t.removeClass('playing');
        $t.trigger('pause');
    });
    $(document).on('click', '.video-section__play', function (e) {
        e.preventDefault();
        const $t = $(this);
        const href = $t.attr('href');
        if (href === '#') return;
        const $el = $(document).find('video'+href);
        if ($el.length === 0) return;
        $el.closest('.video-section').addClass('video-section-play');
        $el.addClass('playing');
        $el.trigger('play');
        $el.closest('.video-container').addClass('playing');
    });
}

function toggleFullScreen(e) {
    const video = this;
    const $video = $(video);
    if (!document.fullscreenElement) {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari, Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        $('html, body').animate({
            scrollTop: $video.offset().top
        }, 500);
        $video.closest('.video-section').removeClass('video-section-play');
        $video.removeClass('playing');
        $video.trigger('pause');
    }
}

