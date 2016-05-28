$(document).ready(function () {

    var AOSsettings = AOSsettings || (ProcessWire && ProcessWire.config && ProcessWire.config.AdminOnSteroids) ? JSON.parse(ProcessWire.config.AdminOnSteroids) : null;

    if(AOSsettings == null) {
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

        var renoTweaksSettings = AOSsettings.RenoTweaks,
            htmlClasses = '';

        // enable single clicking on headers in sidebar
        if (renoTweaksSettings.indexOf('singleClickSidebarHeaders') !== -1 && renoTweaksSettings.indexOf('alwaysVisibleSidebarItems') !== -1) {

            $('#sidebar > #main-nav > li > a').on('click', function () {
                window.location.href = $(this).attr('href');
                return false;
            })

        }

        if (renoTweaksSettings.indexOf('stickyHeader') !== -1) {
            htmlClasses += ' aos_stickyHeader';
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

        $('html').addClass(htmlClasses);
    }
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