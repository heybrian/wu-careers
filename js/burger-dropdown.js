$(document).ready(function() {
    /* for dynamic drop down purpose */
    // for (var i = 0; i < mobileToggleDataSource.length; i++) {
    //     var listItem = '<a class="dd-btn icon-plus">' +
    //         mobileToggleDataSource[i].name +
    //         '<img class="plusIcon" src="./assets/burger-dropdown/icon-plus.png" />' +
    //         '<img class="foldIcon" src="./assets/burger-dropdown/icon-fold.png" />' +
    //         '</a>' + '<ul class="dd-nav">';
    //     for (var j=0; j < mobileToggleDataSource[i].child.length; j++) {
    //         listItem += '<li><a>' + mobileToggleDataSource[i].child[j].name + '</a></li>'
    //     }
    //     listItem += '</ul>';
    //     listItem = '<li class="dd">' + listItem + '</li>';
    //     $('#nested-mobile-nav').append(listItem);
    // }

    /* burger drop down start */
    $('#nested-mobile-nav li').each(function () {
        $(this).click(function () {
            $('#nested-mobile-nav li').not($(this)).removeClass('open');
            $(this).toggleClass('open');
            $(this).find('.plusIcon').toggle();
            $(this).find('.foldIcon').toggle();
            $('#nested-mobile-nav li').not($(this)).find('.foldIcon').css('display', 'none');
            $('#nested-mobile-nav li').not($(this)).find('.plusIcon').css('display', 'block');
        });
    });

    $('#mobile-nav-btn').click(function() {
        $('#mobile-nav-btn').toggleClass('close');
        $('#mobile-nav').toggle();
    });

    $('.dd-nav a').click(function() {
        var url = $(this).attr('link-href');
        if (url) {
            avoidDownLoadBurger(url)
        }
    });
    $('#top-nav-btns a').click(function() {
        var url = $(this).attr('link-href');
        if (url) {
            avoidDownLoadBurger(url)
        }
    });
    function avoidDownLoadBurger(url) {
        window.open(
            url,
            '_blank' // <- This is what makes it open in a new window.
        );
    }
    /* burger drop down end */

    /* back to top btn start */
    // When the user scrolls down 20px from the top of the document, show the button
    $('.btt-btn').hide();
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            $('.btt-btn').fadeIn();
        } else {
            $('.btt-btn').fadeOut();
        }
    }
    // When the user clicks on the button, scroll to the top of the document
    $('.btt-btn, .icon-chevron-up').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800)
    })
    /* back to top btn end */
});