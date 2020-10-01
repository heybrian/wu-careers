$(document).ready(function() {
    // global variable
    var HIGHLIGHTED_ATTR = "highlighted";
    var gtkTargetPic = null;
    var gtkPreviousTarget = null;
    var locationIndexDesk = 1;
    var locationIndexMobile = 1;

    $('#playButton, #playButton-mobile').on('mouseover', function() {
        $(this).attr('src', 'assets/1024/1-Video-PlayButton-Normal.png')
    });
    $('#playButton, #playButton-mobile').on('mouseout', function() {
        $(this).attr('src', 'assets/1024/1-Video-PlayButton-Hover.png')
    });

    /* get to know wu carousel start */
    $('#getToKnowWu-employeeDetail-pic').attr('src', getFirstEmployeePic());
    switchEmployeeBio();

    // switch profile related functions start here
    function getFirstEmployeePic() {
        var src = $('.getToKnowWu-employeePic').first();
        if (src[0] && src[0].getAttribute('data-lazy')) {
            gtkTargetPic = src[0].getAttribute('data-lazy');
            return src[0].getAttribute('data-lazy');
        }
    }

    function getEmployeeName() {
        if (gtkTargetPic !== null) {
            var name = pickupEmployeeName(gtkTargetPic);
            return name;
        }
    }

    function pickupEmployeeName(pic) {
        var name = pic.split('-')[2];
        if (name.indexOf('.png') !== -1) {
            name = name.replace('.png', '');
        }
        return name;
    }

    function getEmployeeTitle() {
        var name = getEmployeeName();
        if (name) {
            if (getToKnowWu_employeeJSON[name] && getToKnowWu_employeeJSON[name].title) {
                return getToKnowWu_employeeJSON[name].title;
            }
        }
    }

    function getEmployeeLocation() {
        var name = getEmployeeName();
        if (name) {
            if (getToKnowWu_employeeJSON[name] && getToKnowWu_employeeJSON[name].location) {
                return getToKnowWu_employeeJSON[name].location;
            }
        }
    }

    function getEmployeeText() {
        var name = getEmployeeName();
        if (name) {
            if (getToKnowWu_employeeJSON[name] && getToKnowWu_employeeJSON[name].text) {
                return getToKnowWu_employeeJSON[name].text;
            }
        }
    }

    function openRoleButtons() {
        var name = getEmployeeName();
        if (name) {
            if (getToKnowWu_employeeJSON[name] && getToKnowWu_employeeJSON[name].openRoles) {
                return getToKnowWu_employeeJSON[name].openRoles;
            }
        }
    }

    function switchEmployeeBio() {
        var openRoleValue = openRoleButtons();
        $('#employee-name').html('Meet ' + getEmployeeName());
        $('#employee-title').html(getEmployeeTitle());
        $('#employee-location').html(getEmployeeLocation());
        $('#employee-text').html(getEmployeeText());
        if (typeof(openRoleValue) === 'object' && openRoleValue.length === 2) {
            $('#openRole-button-one a').html(openRoleValue[0]);
            $('#openRole-button-two a').html(openRoleValue[1]);
        }
    }
    function switchEmployeeBioMobile(n) {
        var openRoleValue = openRoleButtons();
        $('#employee-name-mobile' + n).html('Meet ' + getEmployeeName());
        $('#employee-title-mobile' + n).html(getEmployeeTitle());
        $('#employee-location-mobile' + n).html(getEmployeeLocation());
        $('#employee-text-mobile' + n).html(getEmployeeText());
        if (typeof(openRoleValue) === 'object' && openRoleValue.length === 2) {
            $('#openRole-a-one-mobile' + n).html(openRoleValue[0]);
            $('#openRole-a-two-mobile' + n).html(openRoleValue[1]);
        }
    }
    // switch profile related functions end here

    // employee pic mouse over
    $('.getToKnowWu-employeePic, .getToKnowWu-employeePic-mobile, .getToKnowWu-employeePic-smaller-mobile')
        .on('mouseover', function(e) {
        gTKWemployeeMouseover(e);
    });
    function gTKWemployeeMouseover(e) {
        var img = (window.event)? window.event.srcElement: e.target;
        var imgName = 'Can not read img name';
        if (img.hasAttribute('src')) {
            imgName = img.getAttribute('src');
        } else {
            return;
        }
        if (!img.hasAttribute(HIGHLIGHTED_ATTR)) {
            var newImageName = getHighlightName(imgName);
            img.setAttribute('src', newImageName);
        }
    }

    // employee pic mouse out
    $('.getToKnowWu-employeePic, .getToKnowWu-employeePic-mobile, .getToKnowWu-employeePic-smaller-mobile')
        .on('mouseout', function(e) {
        gTKWemployeeMouseout(e);
    });
    function gTKWemployeeMouseout(e) {
        var img = (window.event)? window.event.srcElement: e.target;
        var imgName = 'Can not read img name';
        if (img.hasAttribute('src')) {
            imgName = img.getAttribute('src');
        } else {
            return;
        }
        if (!img.hasAttribute(HIGHLIGHTED_ATTR)) {
            var newImageName = getRegularName(imgName);
            img.setAttribute('src', newImageName);
        }
    }

    // employee pic mouse click
    $('.getToKnowWu-employeePic, .getToKnowWu-employeePic-mobile').click(function(e) {
        gTKWemployeeClick(e);
    });
    $('.getToKnowWu-employeePic-smaller-mobile').click(function(e) {
        gTKWemployeeClickSmaller(e);
    });
    function gTKWemployeeClick(e) {
        if ($(window).width() > 600) {
            var img = (window.event) ? window.event.srcElement : e.target;
            // switch profile pic between highlighted and regular
            if (img.hasAttribute(HIGHLIGHTED_ATTR)) {
                var newImageName = getRegularName(img.getAttribute('src'));
                img.setAttribute('src', newImageName);
                img.removeAttribute(HIGHLIGHTED_ATTR);
            } else {
                $('.getToKnowWu-employeePic').each(function() {
                    $(this).removeAttr(HIGHLIGHTED_ATTR);
                    $(this).attr('src', getRegularName($(this).attr('src')));
                });
                img.setAttribute('src', getHighlightName(img.getAttribute('src')));
                img.setAttribute(HIGHLIGHTED_ATTR, '');
                gtkTargetPic = getHighlightName(img.getAttribute('src'));
            }

            // show and hide employee detail
            var profilePic = document.getElementById('getToKnowWu-employeeDetail-pic');
            if (profilePic.getAttribute('src') === '') {
                profilePic.setAttribute('src', getRegularName(img.getAttribute('src')));
                $('.getToKnowWu-employeeDetail').show();
                switchEmployeeBio();
            } else if (profilePic.getAttribute('src') === img.getAttribute('src')) {
                $('.getToKnowWu-employeeDetail').hide();
                profilePic.setAttribute('src', '');
            } else if (profilePic.getAttribute('src') !== img.getAttribute('src')) {
                profilePic.setAttribute('src', getRegularName(img.getAttribute('src')));
                switchEmployeeBio();
            }
        }else if ($(window).width() <= 600) {
            var img = (window.event) ? window.event.srcElement : e.target;
            // switch profile pic between highlighted and regular
            if (img.hasAttribute(HIGHLIGHTED_ATTR)) {
                var newImageName = getRegularName(img.getAttribute('src'));
                img.setAttribute('src', newImageName);
                img.removeAttribute(HIGHLIGHTED_ATTR);
            } else {
                $('.getToKnowWu-employeePic-mobile').each(function() {
                    $(this).removeAttr(HIGHLIGHTED_ATTR);
                    $(this).attr('src', getRegularName($(this).attr('src')));
                });
                img.setAttribute('src', getHighlightName(img.getAttribute('src')));
                img.setAttribute(HIGHLIGHTED_ATTR, '');
                gtkTargetPic = img.getAttribute('src');
            }
        }
    }
    function gTKWemployeeClickSmaller(e) {
        var img = (window.event) ? window.event.srcElement : e.target;
        // switch profile pic between highlighted and regular
        if (img.hasAttribute(HIGHLIGHTED_ATTR)) {
            var newImageName = getRegularName(img.getAttribute('src'));
            img.setAttribute('src', newImageName);
            img.removeAttribute(HIGHLIGHTED_ATTR);
        } else {
            $('.getToKnowWu-employeePic-smaller-mobile').each(function() {
                $(this).removeAttr(HIGHLIGHTED_ATTR);
                $(this).attr('src', getRegularName($(this).attr('src')));
            });
            img.setAttribute('src', getHighlightName(img.getAttribute('src')));
            img.setAttribute(HIGHLIGHTED_ATTR, '');
            gtkTargetPic = img.getAttribute('src');
        }
    }

    function getHighlightName(imgName) {
        return imgName.replace('.png', '') + '-Highlight.png';
    }

    function getRegularName(imgName) {
        if (!imgName) return '';
        return imgName.replace(new RegExp('-Highlight', 'g'), '');
    }

    // switch employee profile bio mobile view
    $('.getToKnowWu-employee-mobile-1 img').click(function() {
        var targetName = getEmployeeName();
        var employeeBioMobileView = "" +
            '<div class="w3-container getToKnowWu-employeeDetail-bio getToKnowWu-employeeDetail-bio-mobile-1">' +
            '<p id="employee-name-mobile-1"></p>' +
            '<p id="employee-title-mobile-1"></p>' +
            '<img class="locationIcon" src="assets/1024/2-EmployeeSpotlight-LocationIcon.png" style="margin:auto 10px auto 0;">' +
            '<p id="employee-location-mobile-1" style="top: -0.5em;"></p>' +
            '<p id="employee-text-mobile-1"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<h4 id="openRole-button-one-mobile-1" class="openRole-button uppercase gold-box">' +
            '<a id="openRole-a-one-mobile-1" href="https://westernun.referrals.selectminds.com/" target="_blank"></a></h4>' +
            '<h4 id="openRole-button-two-mobile-1" class="openRole-button uppercase gold-box">' +
            '<a id="openRole-a-two-mobile-1" href="https://westernun.referrals.selectminds.com/" target="_blank"></a></h4>' +
            '</div>' +
            '</div>';
        var n = '-1';
        var element = '.getToKnowWu-employee-mobile-1 img';
        getEmployeeProfileMobile(targetName, employeeBioMobileView, n, element);
    });
    $('.getToKnowWu-employee-mobile-2 img').click(function() {
        var targetName = getEmployeeName();
        var employeeBioMobileView = "" +
            '<div class="w3-container getToKnowWu-employeeDetail-bio getToKnowWu-employeeDetail-bio-mobile-2">' +
            '<p id="employee-name-mobile-2"></p>' +
            '<p id="employee-title-mobile-2"></p>' +
            '<img class="locationIcon" src="assets/1024/2-EmployeeSpotlight-LocationIcon.png" style="margin:auto 10px auto 0;">' +
            '<p id="employee-location-mobile-2" style="top: -0.5em;"></p>' +
            '<p id="employee-text-mobile-2"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<h4 id="openRole-button-one-mobile-2" class="openRole-button uppercase gold-box">' +
            '<a id="openRole-a-one-mobile-2" href="https://westernun.referrals.selectminds.com/" target="_blank"></a></h4>' +
            '<h4 id="openRole-button-two-mobile-2" class="openRole-button uppercase gold-box">' +
            '<a id="openRole-a-two-mobile-2" href="https://westernun.referrals.selectminds.com/" target="_blank"></a></h4>' +
            '</div>' +
            '</div>';
        var n = '-2';
        var element = '.getToKnowWu-employee-mobile-2 img';
        getEmployeeProfileMobile(targetName, employeeBioMobileView, n, element);
    });
    $('.getToKnowWu-employee-mobile-3 img').click(function() {
        var targetName = getEmployeeName();
        var employeeBioMobileView = "" +
            '<div class="w3-container getToKnowWu-employeeDetail-bio getToKnowWu-employeeDetail-bio-mobile-3">' +
            '<p id="employee-name-mobile-3"></p>' +
            '<p id="employee-title-mobile-3"></p>' +
            '<img class="locationIcon" src="assets/1024/2-EmployeeSpotlight-LocationIcon.png" style="margin:auto 10px auto 0;">' +
            '<p id="employee-location-mobile-3" style="top: -0.5em;"></p>' +
            '<p id="employee-text-mobile-3"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<h4 id="openRole-button-one-mobile-3" class="openRole-button uppercase gold-box">' +
            '<a id="openRole-a-one-mobile-3" href="https://westernun.referrals.selectminds.com/" target="_blank"></a></h4>' +
            '<h4 id="openRole-button-two-mobile-3" class="openRole-button uppercase gold-box">' +
            '<a id="openRole-a-two-mobile-3" href="https://westernun.referrals.selectminds.com/" target="_blank"></a></h4>' +
            '</div>' +
            '</div>';
        var n = '-3';
        var element = '.getToKnowWu-employee-mobile-3 img';
        getEmployeeProfileMobile(targetName, employeeBioMobileView, n, element);
    });
    $('.getToKnowWu-employee-mobile-4 img').click(function() {
        var targetName = getEmployeeName();
        var employeeBioMobileView = "" +
            '<div class="w3-container getToKnowWu-employeeDetail-bio getToKnowWu-employeeDetail-bio-mobile-4">' +
            '<p id="employee-name-mobile-4"></p>' +
            '<p id="employee-title-mobile-4"></p>' +
            '<img class="locationIcon" src="assets/1024/2-EmployeeSpotlight-LocationIcon.png" style="margin:auto 10px auto 0;">' +
            '<p id="employee-location-mobile-4" style="top: -0.5em;"></p>' +
            '<p id="employee-text-mobile-4"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<h4 id="openRole-button-one-mobile-4" class="openRole-button uppercase gold-box">' +
            '<a id="openRole-a-one-mobile-4" href="https://westernun.referrals.selectminds.com/" target="_blank"></a></h4>' +
            '<h4 id="openRole-button-two-mobile-4" class="openRole-button uppercase gold-box">' +
            '<a id="openRole-a-two-mobile-4" href="https://westernun.referrals.selectminds.com/" target="_blank"></a></h4>' +
            '</div>' +
            '</div>';
        var n = '-4';
        var element = '.getToKnowWu-employee-mobile-4 img';
        getEmployeeProfileMobile(targetName, employeeBioMobileView, n, element);
    });
    // for smaller mobile-view
    $('.getToKnowWu-employee-mobile img').click(function() {
        var targetName = getEmployeeName();
        var employeeBioMobileView = "" +
            '<div class="w3-container getToKnowWu-employeeDetail-bio getToKnowWu-employeeDetail-bio-mobile">' +
            '<p id="employee-name-mobile"></p>' +
            '<p id="employee-title-mobile"></p>' +
            '<img class="locationIcon" src="assets/1024/2-EmployeeSpotlight-LocationIcon.png" style="margin:auto 10px auto 0;">' +
            '<p id="employee-location-mobile" style="top: -0.5em;"</p>' +
            '<p id="employee-text-mobile"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<h4 id="openRole-button-one-mobile" class="openRole-button uppercase gold-box">' +
            '<a id="openRole-a-one-mobile" href="https://westernun.referrals.selectminds.com/" target="_blank"></a></h4>' +
            '<h4 id="openRole-button-two-mobile" class="openRole-button uppercase gold-box">' +
            '<a id="openRole-a-two-mobile" href="https://westernun.referrals.selectminds.com/" target="_blank"></a></h4>' +
            '</div>' +
            '</div>';
        if (targetName === gtkPreviousTarget) {
            $('.getToKnowWu-employeeDetail-bio-mobile').remove();
            gtkPreviousTarget = null;
        }else {
            $('.getToKnowWu-employeeDetail-bio-mobile').remove();
            $(this).parent().next('.getToKnowWu-employeeDetail-mobile').after(employeeBioMobileView);
            var n = '';
            switchEmployeeBioMobile(n);
            gtkPreviousTarget = targetName;
        }
    });
    function getEmployeeProfileMobile(targetName, employeeBioMobileView, n, element) {
        var preName = $('#employee-name-mobile' + n).text();
        var name = 'Meet ' + targetName;
        if (name === preName) {
            $('.getToKnowWu-employeeDetail-bio-mobile' + n).remove();
        }else {
            $('.getToKnowWu-employeeDetail-bio-mobile' + n).remove();
            $(element).parent().next('.getToKnowWu-employeeDetail-mobile' + n).after(employeeBioMobileView);
            switchEmployeeBioMobile(n);
        }
    }
    /* get to know wu carousel end */

    /* location carousel start */
    $('.slides-navigation .prev').click(function(){
        var size = '';
        if($(this).hasClass('location-desktop-prev')) {
            size = 'desktop';
        }else if ($(this).hasClass('location-mobile-prev')) {
            size = 'mobile';
        }
        locationTextCarouselPrev(size);
    });
    $('.slides-navigation .next').click(function(){
        var size = '';
        if($(this).hasClass('location-desktop-next')) {
            size = 'desktop';
        }else if ($(this).hasClass('location-mobile-next')) {
            size = 'mobile';
        }
        locationTextCarouselNext(size);
    });

    function locationTextCarouselPrev(size) {
        var originClass = '';
        var newClass = '';
        if (size === 'desktop') {
            originClass = 'location-text';
            newClass = 'location-text w3-animate-bottom';
            locationTextCarouselPrevDesk(originClass, newClass);
        }else if (size === 'mobile') {
            originClass = 'location-text-mobile';
            newClass = 'location-text-mobile w3-animate-bottom';
            locationTextCarouselPrevMobile(originClass, newClass);
        }
    }
    function locationTextCarouselNext(size) {
        var originClass = '';
        var newClass = '';
        if (size === 'desktop') {
            originClass = 'location-text';
            newClass = 'location-text w3-animate-bottom';
            locationTextCarouselNextDesk(originClass, newClass);
        }else if (size === 'mobile') {
            originClass = 'location-text-mobile';
            newClass = 'location-text-mobile w3-animate-bottom';
            locationTextCarouselNextMobile(originClass, newClass);
        }
    }

    function locationTextCarouselPrevDesk(originClass, newClass) {
        var i;
        var x = document.getElementsByClassName(originClass);
        for (i = 4; i >= 0; i--) {
            x[i].style.display = "none";
        }
        locationIndexDesk--;
        if (locationIndexDesk === 0) {locationIndexDesk = 5}
        x[locationIndexDesk-1].style.display = "block";
        x[locationIndexDesk-1].setAttribute("class", newClass);
    }
    function locationTextCarouselPrevMobile(originClass, newClass) {
        var i;
        var x = document.getElementsByClassName(originClass);
        for (i = 4; i >= 0; i--) {
            x[i].style.display = "none";
        }
        locationIndexMobile--;
        if (locationIndexMobile === 0) {locationIndexMobile = 5}
        x[locationIndexMobile-1].style.display = "block";
        x[locationIndexMobile-1].setAttribute("class", newClass);
    }

    function locationTextCarouselNextDesk(originClass, newClass) {
        var x = document.getElementsByClassName(originClass);
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        locationIndexDesk ++;
        if (locationIndexDesk > x.length) {locationIndexDesk = 1;}
        x[locationIndexDesk-1].style.display = "block";
        x[locationIndexDesk-1].setAttribute("class", newClass);
    }
    function locationTextCarouselNextMobile(originClass, newClass) {
        var x = document.getElementsByClassName(originClass);
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        locationIndexMobile ++;
        if (locationIndexMobile > x.length) {locationIndexMobile = 1;}
        x[locationIndexMobile-1].style.display = "block";
        x[locationIndexMobile-1].setAttribute("class", newClass);
    }
    /* location carousel end */


    $('.getToKnowWu-Carousel').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 4,
        slidesToScroll: 1
    });

    $('.fintech-Carousel-320').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 4,
        slidesToScroll: 1
    });

    $('.fintech-Carousel').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 4,
        slidesToScroll: 1
    });

    $('.location-carousel, .location-carousel-mobile').superslides({
        slide_easing: 'easeInOutCubic',
        slide_speed: 800,
        pagination: true,
        hashchange: false,
        scrollable: true
    });

    $('.awards-carousel').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true
    });

    $('.video-Carousel').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 1
    });

    $('.benefits-carousel').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 1
    });

    $('.fintech-Carousel-mobile').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 2,
        slidesToScroll: 1
    });

    $('.awards-carousel-mobile').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true
    });

    $('.video-Carousel-mobile').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $('.benefits-carousel-mobile').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 2,
        slidesToScroll: 1
    });
});
