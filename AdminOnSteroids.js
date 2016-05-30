function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


$(document).ready(function () {

    var AOSsettings = AOSsettings || (ProcessWire && ProcessWire.config && ProcessWire.config.AdminOnSteroids) ? JSON.parse(ProcessWire.config.AdminOnSteroids) : null,
        htmlClasses = "";


    // HoverSaveDropdown
    // note: copies do not need to modify
    if (AOSsettings.enabledSubmodules.indexOf('HoverSaveDropdown') !== -1) {
        $('#pw-dropdown-toggle-submit_save, ' +
            '#pw-dropdown-toggle-submit_publish, ' +
            '#pw-dropdown-toggle-submit_save_unpublished, ' +
            '#pw-dropdown-toggle-Inputfield_submit_save_module')
            .removeClass('dropdown-toggle-click');
    }

    if (AOSsettings == null) {
        return false;
    }

    // AutoCollapseModuleInfo
    if (AOSsettings.enabledSubmodules.indexOf('LoadCollapsedModuleInfos') !== -1) {
        if ($('#ModuleInfo').length) {
            $('#ModuleInfo').addClass('InputfieldStateCollapsed');
        }
    }

    // LongClickDuration
    if (AOSsettings.enabledSubmodules.indexOf('LongClickDuration') !== -1) {
        // set custom long click duration
        if (jQuery && jQuery.longclick) {
            if (AOSsettings.LongClickDuration) {
                jQuery.longclick.duration = parseInt(AOSsettings.LongClickDuration);
            }
        }
    }

    // fixScrollbarJump
    if (AOSsettings.enabledSubmodules.indexOf('fixScrollbarJump') !== -1) {
        $('html').addClass('aos_fixScrollbarJump');
    }


    // Default admin theme tweaks
    if (AOSsettings.enabledSubmodules.indexOf('AdminTweaks') !== -1 && $('body').hasClass('AdminThemeDefault')) {

        var adminTweaksSettings = AOSsettings.AdminTweaks,
            htmlClasses = '';

        if (adminTweaksSettings.indexOf('stickyHeader') !== -1) {
            htmlClasses += ' aos_stickyHeader';
        }

        $('body').addClass(htmlClasses);
    }


    // RenoTWeaks
    if (AOSsettings.enabledSubmodules.indexOf('RenoTweaks') !== -1 && $('body').hasClass('AdminThemeReno')) {

        var renoTweaksSettings = AOSsettings.RenoTweaks;

        function setupCheckbox(currentCheckbox) {

            var nextCheckbox = currentCheckbox.parents('li').next('li').find('input');

            if (window.getComputedStyle(nextCheckbox.get(0), null).getPropertyValue('margin-left') !== '0px') {
                var isChecked = currentCheckbox.is(':checked');
                nextCheckbox.parents('li').toggleClass('disabled', !isChecked);
                // setting to disabled won't save value
                //nextCheckbox.attr('disabled', !isChecked);

                setupCheckbox(nextCheckbox);
            }
        }


        // js tweaks to form configuration page
        if ($('form[action$="AdminOnSteroids"]').length) {

            var RenoTweaksSelector = '#wrap_Inputfield_RenoTweaks';

            $(RenoTweaksSelector + ' input[type="checkbox"]').on('change', function () {
                setupCheckbox($(this));
            });

            // do not allow checking checkboxes if it's parent is set to disabled
            $(RenoTweaksSelector).on('click', 'li.disabled input[type="checkbox"]', function (e) {
                e.preventDefault();
                return false;
            });

            setupCheckbox($(RenoTweaksSelector + ' li:eq(0) input[type="checkbox"]'));
        }


        // enable single clicking on headers in sidebar
        if (renoTweaksSettings.indexOf('singleClickSidebarHeaders') !== -1 && renoTweaksSettings.indexOf('alwaysVisibleSidebarItems') !== -1) {

            $('#sidebar > #main-nav > li > a').on('click', function () {
                window.location.href = $(this).attr('href');
                return false;
            })
        }

        if (renoTweaksSettings.indexOf('AlwaysShowSearch') !== -1) {
            htmlClasses += ' aos_AlwaysShowSearch';
        }


        if (renoTweaksSettings.indexOf('stickyHeader') !== -1) {
            htmlClasses += ' aos_stickyHeader';
            if (renoTweaksSettings.indexOf('stickyHeaderCompact') !== -1) {
                htmlClasses += ' aos_stickyHeaderCompact';
            }
        }

        if (renoTweaksSettings.indexOf('stickySidebar') !== -1) {
            htmlClasses += ' aos_stickySidebar';
        }

        if (renoTweaksSettings.indexOf('autoHideSidebar') !== -1) {
            htmlClasses += ' aos_autoHideSidebar';
        }

        if (renoTweaksSettings.indexOf('alwaysVisibleSidebarItems') !== -1) {
            htmlClasses += ' aos_alwaysVisibleSidebarItems';
        }

        if (renoTweaksSettings.indexOf('hideSidebarQuickLinks') !== -1) {
            htmlClasses += ' aos_hideSidebarQuickLinks';
        }

        if (renoTweaksSettings.indexOf('oneLineSidebarSubmenus') !== -1) {
            htmlClasses += ' aos_oneLineSidebarSubmenus';
        }

        if (renoTweaksSettings.indexOf('headButtonNextToTitle') !== -1) {
            htmlClasses += ' aos_headButtonNextToTitle';
        }

        if (renoTweaksSettings.indexOf('closeNoticeButtonToLeft') !== -1) {
            htmlClasses += ' aos_closeNoticeButtonToLeft';
        }
    }


    if (AOSsettings.enabledSubmodules.indexOf('DeselectRadios') !== -1) {
        htmlClasses += ' aos_DeselectRadios';
    }

    $('html').addClass(htmlClasses);


    // if ($('.aos_DeselectRadios').length && getParameterByName('open')) {
    //
    //     setTimeout(function() {
    //
    //         var jumpTarget = document.querySelector('.PageListItem.PageListID' + getParameterByName('open'));
    //
    //         if (jumpTarget) {
    //             // console.log(window.innerHeight);
    //             // console.log(jumpTarget.offsetTop);
    //             // console.log(jumpTarget.offsetTop - 120);
    //             // window.scrollTo(window.innerHeight - jumpTarget.offsetTop, jumpTarget.offsetLeft);
    //             // console.log(jumpTarget.offsetTop + window.pageYOffset);
    //             // window.scrollTo(jumpTarget.offsetLeft, jumpTarget.offsetTop + window.pageYOffset);
    //             window.scrollTo(0, jumpTarget.offsetTop - 0);
    //             // jumpTarget.scrollIntoView(true);
    //         }
    //     }, 1600);
    // }

});


// add "scrolled" body class

['scroll', 'resize', 'load'].forEach(function (e) {
    window.addEventListener(e, addScrolledBodyClass, false);
});

function posTop() {
    return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
}

function addScrolledBodyClass() {
    var el = document.querySelector('body');
    posTop() > 20 ? el.classList.add('scrolled') : el.classList.remove('scrolled');
}