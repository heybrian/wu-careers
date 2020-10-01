function openJobWindow(e) {
    if (e && e.currentTarget) {
        var url = e.currentTarget.getAttribute('link-href');
    }
    if (url) {
        window.open(
            url,
            '_blank' // <- This is what makes it open in a new window.
        )
    }
}

$(document).ready(function() {
    var wuCareersLinkin = '<script src="//platform.linkedin.com/in.js" type="text/javascript"></script>\n' +
        '        <script type="IN/CompanyInsider" data-id="2019"></script><br>\n' +
        '        <br>'
    $( '#wu-careers-linkin' ).append(wuCareersLinkin);
    // global variable
    var HIGHLIGHTED_ATTR = "highlighted";
    var gtkTargetPic = null;
    var gtkPreviousTarget = null;
    var locationIndexDesk = 1;
    var locationIndexMobile = 1;
    var oldShowHideValue = window.matchMedia('(max-width: 600px)').matches;

    function checkShowHide() {
        var showHideValue = window.matchMedia('(max-width: 600px)').matches;
        if (showHideValue !== oldShowHideValue) {
            oldShowHideValue = showHideValue;
            if (oldShowHideValue === true) {
                document.location = "wu-mobile.html";
            } else {
                document.location = "wu-desktop.html";
            }
        }
    }
    setInterval(function(){ checkShowHide(); }, 1000);

    $('#careers-main').click(function() {
        var url = $(this).attr('link-href');
        window.open(
            url,
            '_blank' // <- This is what makes it open in a new window.
        );
    });

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
        if (src[0] && src[0].getAttribute('src')) {
            gtkTargetPic = src[0].getAttribute('src');
            return src[0].getAttribute('src');
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

    function getOpenRoleUrl() {
        var name = getEmployeeName();
        if (name) {
            if (getToKnowWu_employeeJSON[name] && getToKnowWu_employeeJSON[name].url) {
                return getToKnowWu_employeeJSON[name].url;
            }
        }
    }

    function switchEmployeeBio() {
        var openRoleValue = openRoleButtons();
        var openRoleUrl = getOpenRoleUrl();
        $('#employee-name').html('Meet ' + getEmployeeName());
        $('#employee-title').html(getEmployeeTitle());
        $('#employee-location').html(getEmployeeLocation());
        $('#employee-text').html(getEmployeeText());
        if (typeof(openRoleValue) === 'object' &&
            openRoleValue.length === 2 &&
            typeof(openRoleUrl) === 'object' &&
            openRoleUrl.length === 2) {
            $('#openRole-button-one').html(openRoleValue[0]);
            $('#openRole-button-one').attr('link-href', openRoleUrl[0]);
            $('#openRole-button-two').html(openRoleValue[1]);
            $('#openRole-button-two').attr('link-href', openRoleUrl[1]);
        }
    }
    function switchEmployeeBioMobile(n) {
        var openRoleValue = openRoleButtons();
        var openRoleUrl = getOpenRoleUrl();
        $('#employee-name-mobile' + n).html('Meet ' + getEmployeeName());
        $('#employee-title-mobile' + n).html(getEmployeeTitle());
        $('#employee-location-mobile' + n).html(getEmployeeLocation());
        $('#employee-text-mobile' + n).html(getEmployeeText());
        if (typeof(openRoleValue) === 'object' &&
            openRoleValue.length === 2 &&
            typeof(openRoleUrl) === 'object' &&
            openRoleUrl.length === 2) {
            $('#openRole-a-one-mobile' + n).html(openRoleValue[0]);
            $('#openRole-button-one-mobile' + n).attr('link-href', openRoleUrl[0]);
            $('#openRole-a-two-mobile' + n).html(openRoleValue[1]);
            $('#openRole-button-two-mobile' + n).attr('link-href', openRoleUrl[1]);
        }
    }
    function switchEmployeeBioMobileSmaller(n) {
        var openRoleValue = openRoleButtons();
        var openRoleUrl = getOpenRoleUrl();
        $('#employee-name-mobile-smaller' + n).html('Meet ' + getEmployeeName());
        $('#employee-title-mobile-smaller' + n).html(getEmployeeTitle());
        $('#employee-location-mobile-smaller' + n).html(getEmployeeLocation());
        $('#employee-text-mobile-smaller' + n).html(getEmployeeText());
        if (typeof(openRoleValue) === 'object' &&
            openRoleValue.length === 2 &&
            typeof(openRoleUrl) === 'object' &&
            openRoleUrl.length === 2) {
            $('#openRole-a-one-mobile-smaller' + n).html(openRoleValue[0]);
            $('#openRole-button-one-mobile-smaller' + n).attr('link-href', openRoleUrl[0]);
            $('#openRole-a-two-mobile-smaller' + n).html(openRoleValue[1]);
            $('#openRole-button-two-mobile-smaller' + n).attr('link-href', openRoleUrl[1]);
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
            '<p id="employee-location-mobile-1" style="top: -0.5em;" class="bio-lineheight"></p>' +
            '<p id="employee-text-mobile-1"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<button type="button" id="openRole-button-one-mobile-1" class="openRole-button uppercase gold-box" onclick="openJobWindow(event);">' +
            '<span id="openRole-a-one-mobile-1"></span></button>' +
            '<button id="openRole-button-two-mobile-1" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-two-mobile-1"></span></button>' +
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
            '<p id="employee-location-mobile-2" style="top: -0.5em;" class="bio-lineheight"></p>' +
            '<p id="employee-text-mobile-2"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<button id="openRole-button-one-mobile-2" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-one-mobile-2"></span></button>' +
            '<button id="openRole-button-two-mobile-2" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-two-mobile-2"></span></button>' +
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
            '<p id="employee-location-mobile-3" style="top: -0.5em;" class="bio-lineheight"></p>' +
            '<p id="employee-text-mobile-3"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<button id="openRole-button-one-mobile-3" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-one-mobile-3"></span></button>' +
            '<button id="openRole-button-two-mobile-3" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-two-mobile-3"></span></button>' +
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
            '<p id="employee-location-mobile-4" style="top: -0.5em;" class="bio-lineheight"></p>' +
            '<p id="employee-text-mobile-4"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<button id="openRole-button-one-mobile-4" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-one-mobile-4"></span></button>' +
            '<button id="openRole-button-two-mobile-4" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-two-mobile-4"></span></button>' +
            '</div>' +
            '</div>';
        var n = '-4';
        var element = '.getToKnowWu-employee-mobile-4 img';
        getEmployeeProfileMobile(targetName, employeeBioMobileView, n, element);
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

    // for smaller mobile-view
    $('.getToKnowWu-employeePic-smaller-mobile-1 img').click(function() {
        var targetName = getEmployeeName();
        var employeeBioMobileView = "" +
            '<div class="w3-container getToKnowWu-employeeDetail-bio getToKnowWu-employeeDetail-bio-mobile-smaller-1">' +
            '<p id="employee-name-mobile-smaller-1"></p>' +
            '<p id="employee-title-mobile-smaller-1"></p>' +
            '<img class="locationIcon" src="assets/1024/2-EmployeeSpotlight-LocationIcon.png" style="margin:auto 10px auto 0;">' +
            '<p id="employee-location-mobile-smaller-1" style="top: -0.5em;" class="bio-lineheight"></p>' +
            '<p id="employee-text-mobile-smaller-1"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<button id="openRole-button-one-mobile-smaller-1" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-one-mobile-smaller-1"></span></button>' +
            '<button id="openRole-button-two-mobile-smaller-1" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-two-mobile-smaller-1"></span></button>' +
            '</div>' +
            '</div>';
        var n = '-1';
        gtkPreviousTarget = targetName;
        var element = '.getToKnowWu-employeePic-smaller-mobile-1 img';
        getEmployeeProfileMobileSmaller(targetName, employeeBioMobileView, n, element);
    });
    $('.getToKnowWu-employeePic-smaller-mobile-2 img').click(function() {
        var targetName = getEmployeeName();
        var employeeBioMobileView = "" +
            '<div class="w3-container getToKnowWu-employeeDetail-bio getToKnowWu-employeeDetail-bio-mobile-smaller-2">' +
            '<p id="employee-name-mobile-smaller-2"></p>' +
            '<p id="employee-title-mobile-smaller-2"></p>' +
            '<img class="locationIcon" src="assets/1024/2-EmployeeSpotlight-LocationIcon.png" style="margin:auto 10px auto 0;">' +
            '<p id="employee-location-mobile-smaller-2" style="top: -0.5em;" class="bio-lineheight"></p>' +
            '<p id="employee-text-mobile-smaller-2"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<button id="openRole-button-one-mobile-smaller-2" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-one-mobile-smaller-2"></span></button>' +
            '<button id="openRole-button-two-mobile-smaller-2" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-two-mobile-smaller-2"></span></button>' +
            '</div>' +
            '</div>';
        var n = '-2';
        gtkPreviousTarget = targetName;
        var element = '.getToKnowWu-employeePic-smaller-mobile-2 img';
        getEmployeeProfileMobileSmaller(targetName, employeeBioMobileView, n, element);
    });
    $('.getToKnowWu-employeePic-smaller-mobile-3 img').click(function() {
        var targetName = getEmployeeName();
        var employeeBioMobileView = "" +
            '<div class="w3-container getToKnowWu-employeeDetail-bio getToKnowWu-employeeDetail-bio-mobile-smaller-3">' +
            '<p id="employee-name-mobile-smaller-3"></p>' +
            '<p id="employee-title-mobile-smaller-3"></p>' +
            '<img class="locationIcon" src="assets/1024/2-EmployeeSpotlight-LocationIcon.png" style="margin:auto 10px auto 0;">' +
            '<p id="employee-location-mobile-smaller-3" style="top: -0.5em;" class="bio-lineheight"></p>' +
            '<p id="employee-text-mobile-smaller-3"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<button id="openRole-button-one-mobile-smaller-3" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-one-mobile-smaller-3"></span></button>' +
            '<button id="openRole-button-two-mobile-smaller-3" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-two-mobile-smaller-3"></span></button>' +
            '</div>' +
            '</div>';
        var n = '-3';
        gtkPreviousTarget = targetName;
        var element = '.getToKnowWu-employeePic-smaller-mobile-3 img';
        getEmployeeProfileMobileSmaller(targetName, employeeBioMobileView, n, element);
    });
    $('.getToKnowWu-employeePic-smaller-mobile-4 img').click(function() {
        var targetName = getEmployeeName();
        var employeeBioMobileView = "" +
            '<div class="w3-container getToKnowWu-employeeDetail-bio getToKnowWu-employeeDetail-bio-mobile-smaller-4">' +
            '<p id="employee-name-mobile-smaller-4"></p>' +
            '<p id="employee-title-mobile-smaller-4"></p>' +
            '<img class="locationIcon" src="assets/1024/2-EmployeeSpotlight-LocationIcon.png" style="margin:auto 10px auto 0;">' +
            '<p id="employee-location-mobile-smaller-4" style="top: -0.5em;" class="bio-lineheight"></p>' +
            '<p id="employee-text-mobile-smaller-4"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<button id="openRole-button-one-mobile-smaller-4" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-one-mobile-smaller-4"></span></button>' +
            '<button id="openRole-button-two-mobile-smaller-4" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-two-mobile-smaller-4"></span></button>' +
            '</div>' +
            '</div>';
        var n = '-4';
        gtkPreviousTarget = targetName;
        var element = '.getToKnowWu-employeePic-smaller-mobile-4 img';
        getEmployeeProfileMobileSmaller(targetName, employeeBioMobileView, n, element);
    });
    $('.getToKnowWu-employeePic-smaller-mobile-5 img').click(function() {
        var targetName = getEmployeeName();
        var employeeBioMobileView = "" +
            '<div class="w3-container getToKnowWu-employeeDetail-bio getToKnowWu-employeeDetail-bio-mobile-smaller-5">' +
            '<p id="employee-name-mobile-smaller-5"></p>' +
            '<p id="employee-title-mobile-smaller-5"></p>' +
            '<img class="locationIcon" src="assets/1024/2-EmployeeSpotlight-LocationIcon.png" style="margin:auto 10px auto 0;">' +
            '<p id="employee-location-mobile-smaller-5" style="top: -0.5em;" class="bio-lineheight"></p>' +
            '<p id="employee-text-mobile-smaller-5"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<button id="openRole-button-one-mobile-smaller-5" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-one-mobile-smaller-5"></span></button>' +
            '<button id="openRole-button-two-mobile-smaller-5" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-two-mobile-smaller-5"></span></button>' +
            '</div>' +
            '</div>';
        var n = '-5';
        gtkPreviousTarget = targetName;
        var element = '.getToKnowWu-employeePic-smaller-mobile-5 img';
        getEmployeeProfileMobileSmaller(targetName, employeeBioMobileView, n, element);
    });
    $('.getToKnowWu-employeePic-smaller-mobile-6 img').click(function() {
        var targetName = getEmployeeName();
        var employeeBioMobileView = "" +
            '<div class="w3-container getToKnowWu-employeeDetail-bio getToKnowWu-employeeDetail-bio-mobile-smaller-6">' +
            '<p id="employee-name-mobile-smaller-6"></p>' +
            '<p id="employee-title-mobile-smaller-6"></p>' +
            '<img class="locationIcon" src="assets/1024/2-EmployeeSpotlight-LocationIcon.png" style="margin:auto 10px auto 0;">' +
            '<p id="employee-location-mobile-smaller-6" style="top: -0.5em;" class="bio-lineheight"></p>' +
            '<p id="employee-text-mobile-smaller-6"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<button id="openRole-button-one-mobile-smaller-6" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-one-mobile-smaller-6"></span></button>' +
            '<button id="openRole-button-two-mobile-smaller-6" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-two-mobile-smaller-6"></span></button>' +
            '</div>' +
            '</div>';
        var n = '-6';
        gtkPreviousTarget = targetName;
        var element = '.getToKnowWu-employeePic-smaller-mobile-6 img';
        getEmployeeProfileMobileSmaller(targetName, employeeBioMobileView, n, element);
    });
    $('.getToKnowWu-employeePic-smaller-mobile-7 img').click(function() {
        var targetName = getEmployeeName();
        var employeeBioMobileView = "" +
            '<div class="w3-container getToKnowWu-employeeDetail-bio getToKnowWu-employeeDetail-bio-mobile-smaller-7">' +
            '<p id="employee-name-mobile-smaller-7"></p>' +
            '<p id="employee-title-mobile-smaller-7"></p>' +
            '<img class="locationIcon" src="assets/1024/2-EmployeeSpotlight-LocationIcon.png" style="margin:auto 10px auto 0;">' +
            '<p id="employee-location-mobile-smaller-7" style="top: -0.5em;" class="bio-lineheight"></p>' +
            '<p id="employee-text-mobile-smaller-7"></p>' +
            '<div class="getToKnowWu-openRole">' +
            '<p id="employee-openRole">EXPLORE OPEN ROLES:</p>' +
            '<button id="openRole-button-one-mobile-smaller-7" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-one-mobile-smaller-7"></span></button>' +
            '<button id="openRole-button-two-mobile-smaller-7" class="openRole-button uppercase gold-box" onclick="openJobWindow(event)">' +
            '<span id="openRole-a-two-mobile-smaller-7"></span></button>' +
            '</div>' +
            '</div>';
        var n = '-7';
        gtkPreviousTarget = targetName;
        var element = '.getToKnowWu-employeePic-smaller-mobile-7 img';
        getEmployeeProfileMobileSmaller(targetName, employeeBioMobileView, n, element);
    });

    function getEmployeeProfileMobileSmaller(targetName, employeeBioMobileView, n, element) {
        var preName = $('#employee-name-mobile-smaller' + n).text();
        var name = 'Meet ' + targetName;
        if (name === preName) {
            $('.getToKnowWu-employeeDetail-bio-mobile-smaller' + n).remove();
        } else {
            $('.getToKnowWu-employeeDetail-bio-mobile-smaller' + n).remove();
            $(element).parent().next('.getToKnowWu-employeeDetail-mobile-smaller' + n).html(employeeBioMobileView);
            switchEmployeeBioMobileSmaller(n);
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

    $('.locationsFindJobs').click(function() {
        var location = $('.location-text:visible').text().replace(/\s/g,'');
        openLocationUrlWindow(location)
    });

    $('.locationsFindJobs-mobile').click(function() {
        var location = $('.location-text-mobile:visible').text().replace(/\s/g,'');
        openLocationUrlWindow(location)
    });

    function openLocationUrlWindow(location) {
        var list = [{name: 'Denver', num: '3391969'},
            {name: 'SanJose,CostaRica', num: '3391980'},
            {name: 'Vilnius,Lithuania', num: '3397078'},
            {name:'OtherGlobalLocations', num: ''},
            {name: 'U.S.Veterans', num: ''}];
        var url = '';
        if(location === 'Denver'){
            url = 'https://westernunion.wd5.myworkdayjobs.com/WUjobs';
        } else if(location === 'U.S.Veterans')
        {
            url = 'https://westernunion-veterans.jobs/';
        }else if(location === 'SanJose,CostaRica')
        {
            url = 'https://westernunion.wd5.myworkdayjobs.com/WUjobs';
        }else if(location === 'Vilnius,Lithuania')
        {
            url = 'https://westernunion.wd5.myworkdayjobs.com/WUjobs';

        }else if(location === 'OtherGlobalLocations')
        {
            url = 'https://westernunion.wd5.myworkdayjobs.com/WUjobs';
        }
       
        window.open(
                url,
                '_blank' // <- This is what makes it open in a new window.
            );
            return
    }
    /* location carousel end */

    $('.avoid-download').click(function() {
        var url = $(this).attr('link-href');
        if (url) {
            avoidDownload(url)
        }
    });
    $('footer a').click(function() {
        var url = $(this).attr('link-href');
        if (url) {
            avoidDownload(url)
        }
    });
    function avoidDownload(url) {
        window.open(
            url,
            '_blank' // <- This is what makes it open in a new window.
        )
    }

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
        autoplaySpeed: 8000,
        dots: true,
        pauseOnHover: false,
        pauseOnFocus: false
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
        autoplaySpeed: 10000,
        dots: true,
        pauseOnHover: false,
        pauseOnFocus: false
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
 