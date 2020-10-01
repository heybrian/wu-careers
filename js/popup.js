$(document).ready(function() {
    $('#my_popup').popup({
        escape: true,
        blur: true,
        onclose: function() {
            removeVideoSrc();
        }
    });
    $('#video_popup').popup({
        escape: true,
        blur: true,
        openelement: '.videopop_open',
        closeelement: '.video_popup_close',
        onclose: function() {
            removeVideoSrc();
        }
    });
    $('#video_popup_mobile').popup({
        escape: true,
        blur: true,
        openelement: '.videopop_open_mobile',
        onclose: function() {
            removeVideoSrc();
        }
    });

    $('.my_popup_open').on('click', function() {
        document.getElementById('first-div-video').src = 'https://www.youtube.com/embed/nhrcxyQ74dk';
    });
    $('.videopop_open').on('click', function(e) {
        var img = (window.event)? window.event.srcElement: e.target;
        if (img.hasAttribute('video-src')) {
            document.getElementById('target_video').src = img.getAttribute('video-src');
        }
    });
    $('.videopop_open_mobile').on('click', function(e) {
        var img = (window.event)? window.event.srcElement: e.target;
        if (img.hasAttribute('video-src')) {
            document.getElementById('target_video_mobile').src = img.getAttribute('video-src');
        }
    });

    function removeVideoSrc() {
        if (document.getElementById('first-div-video')) {
            document.getElementById('first-div-video').src = '';
        }
        if (document.getElementById('target_video')) {
            document.getElementById('target_video').src = '';
        }
        if (document.getElementById('target_video_mobile')) {
            document.getElementById('target_video_mobile').src = '';
        }
    }

    $('[description]').each(function(){
        var text = $(this).attr('description');
        $(this).after('<figcaption class="figcaption-desktop">' + text + '</figcaption>');
    });
    $('[description-mobile]').each(function(){
        var text = $(this).attr('description-mobile');
        $(this).after('<figcaption class="figcaption-mobile">' + text + '</figcaption>');
    });
}); 